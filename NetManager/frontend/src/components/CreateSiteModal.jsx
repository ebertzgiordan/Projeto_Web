import { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const CreateSiteModal = ({ show, onHide, onSubmit, isLoading }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [notas, setNotas] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ nome, endereco, notas });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Rack</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Rack/Cliente</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Ex: Agência Central"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Ex: Rua Principal, 123"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notas Iniciais (Opcional)</Form.Label>
            <Form.Control as="textarea" rows={3} value={notas} onChange={(e) => setNotas(e.target.value)} />
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

export default CreateSiteModal;