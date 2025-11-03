import { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import * as XLSX from 'xlsx';

/**
 * @param {Array<Array<any>>} rows 
 */
const parseExcelFile = (rows) => {
    if (!rows || rows.length === 0) {
        return { portUpdates: [], notasAdicionais: "" };
    }

    const portUpdates = [];
    let notasAdicionais = [];
    
    const header = rows[0].map(h => String(h).toLowerCase().trim());

    const portaIndex = header.findIndex(h => h.includes("patch panel"));
    const localIndex = header.findIndex(h => h.includes("local"));
    const usoIndex = header.findIndex(h => h.includes("uso"));
    const vlanIndex = header.findIndex(h => h.includes("vlan")); 

    const isCleanFile = portaIndex > -1 && localIndex > -1 && usoIndex > -1;

    const dirtyPortRegex = /\b([A-Z\.-]+\.\d+)\.(\d+)\b/g;
    const cleanPortRegex = /(.*)\.(\d+)$/;

    if (isCleanFile) {
        for (let i = 1; i < rows.length; i++) { 
            const row = rows[i];
            const portaStr = row[portaIndex];
            
            if (!portaStr) continue; 

            const match = String(portaStr).match(cleanPortRegex);
            if (!match) continue; 

            const panelNome = match[1]; 
            const numeroPorta = parseInt(match[2], 10);
            const tipoUso = row[usoIndex] || 'Vaga'; 
            const localizacao = row[localIndex] || '';
            const vlan = vlanIndex > -1 ? (parseInt(row[vlanIndex], 10) || null) : null;

            portUpdates.push({ panelNome, numeroPorta, tipoUso, localizacao, vlan });
        }
    } else {
        for (const row of rows) {
            const line = row.join(' '); 
            let match;
            let hasPort = false;

            while ((match = dirtyPortRegex.exec(line)) !== null) {
                hasPort = true;
                const panelNome = match[1];
                const numeroPorta = parseInt(match[2], 10);
                const localizacao = line.replace(dirtyPortRegex, '').trim(); 
                
                portUpdates.push({
                    panelNome,
                    numeroPorta,
                    tipoUso: "Importado (Conflito?)", 
                    localizacao: localizacao || "Importado",
                    vlan: null
                });
            }
            
            if (!hasPort && line.trim().length > 0 && line.trim() !== "0") {
                notasAdicionais.push(line);
            }
        }
    }

    return {
        portUpdates: portUpdates,
        notasAdicionais: notasAdicionais.join('\n')
    };
};

const ImportDataModal = ({ show, onHide, onSubmit, isImporting, siteId }) => {
  const [file, setFile] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setError('');
    const f = e.target.files[0];
    if (f && (f.name.endsWith('.xlsx') || f.name.endsWith('.xls'))) {
      setFile(f);
    } else {
      setError('Por favor, envie apenas arquivos Excel (.xlsx ou .xls)');
      setFile(null);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Por favor, selecione um arquivo Excel.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; 
            const worksheet = workbook.Sheets[sheetName];
            
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" }); 

            const parsedData = parseExcelFile(rows);
            
            const finalPayload = {
                ...parsedData,
                notasAdicionais: `${additionalNotes}\n${parsedData.notasAdicionais}`.trim()
            };

            onSubmit({ siteId, data: finalPayload }, {
                onSuccess: () => {
                    setFile(null);
                    setAdditionalNotes('');
                    onHide(); 
                }
            });

        } catch (err) {
            console.error("Erro ao ler o arquivo Excel:", err);
            setError("Erro ao processar o arquivo. Ele está corrompido ou em um formato inválido?");
        }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Importar Dados do Rack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="info">
          Selecione um arquivo Excel (`.xls` ou `.xlsx`). O sistema tentará detectar
          automaticamente se é um relatório "Limpo" (com colunas `Local`, `Uso`, `Patch Panel`)
          ou "Sujo" (sem cabeçalhos).
        </Alert>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Arquivo Excel</Form.Label>
            <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notas Adicionais (Opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Adicione IPs de switches, senhas ou outras notas que não estão no arquivo."
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isImporting}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isImporting || !file}>
          {isImporting ? <Spinner size="sm" /> : 'Importar e Salvar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportDataModal;