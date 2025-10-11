import { useUserData } from '../hooks/userData';
import { useUserMutate } from '../hooks/useUserMutate';
import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';

const ProfilePage = () => {
  const { data: usuario, isLoading: isLoadingUser } = useUserData();
  const { updateUser, isUpdating } = useUserMutate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ nome, email });
  };

  if (isLoadingUser) return <Spinner />;

  return (
    <Container>
      <h1>Meu Perfil</h1>
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;