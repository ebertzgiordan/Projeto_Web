import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const EditUserModal = ({ user, show, onHide, onSubmit, isLoading }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [papel, setPapel] = useState(0);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setPapel(user.papel);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, email, papel });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuário</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Papel</Form.Label>
            <Form.Select value={papel} onChange={(e) => setPapel(Number(e.target.value))}>
              <option value={0}>Técnico</option>
              <option value={1}>Admin</option>
            </Form.Select>
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

export default EditUserModal;