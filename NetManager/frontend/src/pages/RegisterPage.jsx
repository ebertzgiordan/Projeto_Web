import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    try {

      await axios.post('/auth/register', { nome, email, senha, papel: 0 });

      alert('Cadastro realizado com sucesso! Faça o login para continuar.');
      navigate('/login');

    } catch (err) {
      setError('Falha no cadastro. O email já pode estar em uso.');
      console.error('Erro de cadastro:', err);
    }
  };

  return (
     <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '24rem' }} className="p-4 shadow">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-4">Criar Conta</Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Cadastrar
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/login">Já tem uma conta? Faça login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;