import { useState, useRef } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { useImportPortsMutate } from '../hooks/useImportPortsMutate'; 
import * as XLSX from 'xlsx';

// ===================================================================
// IMPORTANTE: CONFIGURE ESTE MAPEAMENTO!
// ===================================================================
// Coloque aqui o NOME EXATO da coluna do seu Excel (à esquerda)
// e o campo do sistema (à direita).
// Eu já tentei adivinhar com base no seu arquivo "Relatório-Urupema.xls"
const COLUMN_MAPPING = {
  'PONTO': 'nomeDaPorta',  // Coluna que tem "01", "02", etc.
  'LOCAL': 'localizacao',  // Coluna que tem "Mesa 01"
  'VLAN': 'vlan',          // Coluna da VLAN
  'ENDEREÇO IP': 'ipAddress' // Coluna do IP
};
// ===================================================================

const ImportPortsButton = ({ panelId }) => {
  const { mutate: importPorts, isPending } = useImportPortsMutate();
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsPending(true);
    setError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const buffer = event.target.result;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // NOVO: Chama a nova função de processamento
        processAndSendData(jsonData);

      } catch (err) {
        console.error("Erro ao processar a planilha:", err);
        setError("O arquivo parece estar corrompido ou em um formato inválido.");
        setIsPending(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
    e.target.value = null;
  };

  // ===================================================================
  // FUNÇÃO DE PROCESSAMENTO ATUALIZADA
  // ===================================================================
  const processAndSendData = (data) => {
    
    // Pega os nomes das colunas do Excel que são "padrão"
    const standardExcelColumns = Object.keys(COLUMN_MAPPING);

    const formattedPorts = data.map(row => {
      const portData = {};
      let notasString = ''; // String para acumular as notas

      // Itera sobre todas as colunas da linha do Excel
      for (const excelColumnName in row) {
        const cellValue = row[excelColumnName];

        if (COLUMN_MAPPING[excelColumnName]) {
          // 1. É uma coluna PADRÃO (ex: 'PONTO' ou 'LOCAL')
          const systemFieldName = COLUMN_MAPPING[excelColumnName]; // ex: 'nomeDaPorta'
          portData[systemFieldName] = cellValue || null;
        } 
        else if (cellValue) {
          // 2. É uma coluna ADICIONAL (ex: 'Equipamento') e tem valor
          // Concatena no campo de notas
          notasString += `${excelColumnName}: ${cellValue}\n`;
        }
      }

      // Converte a porta para String, se existir
      if (portData.nomeDaPorta) {
        portData.nomeDaPorta = String(portData.nomeDaPorta);
      }

      // Define o tipo de uso
      portData.tipoUso = portData.localizacao ? 'Ocupado' : 'Vago';
      
      // Adiciona as notas acumuladas
      portData.notas = notasString.trim() || null;

      return portData;
    });

    // Filtra linhas que podem ter vindo sem o número da porta
    const validPorts = formattedPorts.filter(p => p.nomeDaPorta);

    console.log('Dados formatados (com notas) para enviar à API:', validPorts);
    
    // ... (simulação de envio, como antes) ...
    setTimeout(() => {
      alert("Planilha lida! Verifique o console (F12) para ver os dados formatados.");
      setIsPending(false);
    }, 1000);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept=".xlsx, .xls, .csv"
      />
      
      <Button 
        variant="outline-success" 
        onClick={handleButtonClick} 
        disabled={isPending || !panelId}
        className="ms-2"
      >
        {isPending ? <Spinner size="sm" /> : 'Importar Planilha'}
      </Button>
      
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </>
  );
};

export default ImportPortsButton;