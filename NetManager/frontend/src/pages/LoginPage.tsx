import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Vamos criar um CSS básico

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // Faz a requisição POST para o seu backend
      const response = await axios.post('http://localhost:8081/auth/login', {
        email,
        senha,
      });

      // Se o login for bem-sucedido, salva o token
      const { token } = response.data;
      localStorage.setItem('jwt_token', token);

      // Redireciona o usuário para o dashboard
      navigate('/');
      window.location.reload(); // Força o recarregamento para atualizar o estado da aplicação

    } catch (err) {
      setError('Falha no login. Verifique seu email e senha.');
      console.error('Erro de login:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login - NetManager</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;