import { useUserData } from '../hooks/userData';
import { useProfileMutate } from '../hooks/useProfileMutate'; 
import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

const ProfilePage = () => {
  const { data: usuario, isLoading: isLoadingUser } = useUserData();
  const { updateProfile, isUpdating, deleteProfile, isDeleting } = useProfileMutate(); 
  
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
    const dataPayload = {
        nome: nome,
        email: email,
        papel: usuario.papel 
    };
    updateProfile(dataPayload); 
  };

  const handleDeleteAccount = () => {
    if (window.confirm("TEM CERTEZA ABSOLUTA? 😱\n\nIsso excluirá sua conta permanentemente. Seus Racks ficarão sem dono.")) {
        deleteProfile();
    }
  };

  if (isLoadingUser) return <div className="text-center mt-5"><Spinner /></div>;

  return (
    <Container className="py-4">
      <h1 className="mb-4">Meu Perfil</h1>
      
      <Card className="shadow-sm mb-5">
        <Card.Body>
          <Card.Title className="mb-4">Dados Pessoais</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card border="danger" className="shadow-sm">
        <Card.Header className="bg-danger text-white fw-bold">Zona de Perigo</Card.Header>
        <Card.Body>
            <Card.Text>
                Uma vez que você excluir sua conta, não há volta. Por favor, tenha certeza.
            </Card.Text>
            <Button 
                variant="outline-danger" 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
            >
                {isDeleting ? "Excluindo..." : "Excluir minha conta"}
            </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;