import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const EditSiteModal = ({ site, show, onHide, onSubmit, isLoading }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    if (site) {
      setNome(site.nome);
      setEndereco(site.endereco || '');
    }
  }, [site]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, endereco }); 
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Rack</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Rack/Cliente</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditSiteModal;