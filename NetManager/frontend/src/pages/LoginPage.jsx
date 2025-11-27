import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, senha });

      const token = response.data;

      console.log("RESPOSTA DO SERVIDOR:", token);

      if (typeof token === 'string' && token.startsWith("ERRO NO BACKEND")) {
        alert(token);
        return;
      }

      if (!token) {
        alert("Token veio vazio!");
        return;
      }

      localStorage.setItem('jwt_token', token);
      queryClient.clear();
      navigate('/');

    } catch (err) {
      if (err.response && err.response.data) {
        console.error("ERRO DETALHADO:", err.response.data);
        const msgErro = typeof err.response.data === 'string'
          ? err.response.data
          : JSON.stringify(err.response.data);
        alert("Erro do Servidor: " + msgErro);
      } else {
        console.error(err);
        setError('Falha no login. Verifique o console.');
      }
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ width: '24rem' }} className="p-4 shadow">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-4">NetManager Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Entrar
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register">Não tem uma conta? Cadastre-se</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;