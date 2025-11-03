import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PontoDeRedeModal = ({ show, onHide, onSubmit, ponto, isLoading }) => {
  const [formData, setFormData] = useState({
    patchPanelPorta: '',
    tipoUso: '',
    localizacao: '',
    vlan: '',
    ipAddress: '',
    notas: ''
  });

  useEffect(() => {
    if (ponto) {
      setFormData({
        patchPanelPorta: ponto.patchPanelPorta || '',
        tipoUso: ponto.tipoUso || '',
        localizacao: ponto.localizacao || '',
        vlan: ponto.vlan || '',
        ipAddress: ponto.ipAddress || '',
        notas: ponto.notas || ''
      });
    } else {
      setFormData({ patchPanelPorta: '', tipoUso: '', localizacao: '', vlan: '', ipAddress: '', notas: '' });
    }
  }, [ponto, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ponto ? `Editar Porta: ${ponto.nomeCompletoDaPorta}` : 'Adicionar Novo Ponto de Rede'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Uso</Form.Label>
            <Form.Control name="tipoUso" value={formData.tipoUso} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Localização</Form.Label>
            <Form.Control name="localizacao" value={formData.localizacao} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>VLAN</Form.Label>
            <Form.Control type="number" name="vlan" value={formData.vlan} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço IP</Form.Label>
            <Form.Control name="ipAddress" value={formData.ipAddress} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control as="textarea" rows={3} name="notas" value={formData.notas} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PontoDeRedeModal;