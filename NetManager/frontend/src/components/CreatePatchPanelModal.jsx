import { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const CreatePatchPanelModal = ({ show, onHide, onSubmit, isLoading }) => {
  const [nome, setNome] = useState('');
  const [totalPortas, setTotalPortas] = useState(24);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, totalPortas });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Patch Panel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Painel (Ex: LG.01)</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total de Portas</Form.Label>
            <Form.Control type="number" value={totalPortas} onChange={(e) => setTotalPortas(Number(e.target.value))} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreatePatchPanelModal;