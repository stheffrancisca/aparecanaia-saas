import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações locais
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta');
        return;
      }

      // Salvar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao conectar ao servidor');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>🚀 Apareça na IA</h1>
          <p>Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-signup"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'CRIAR CONTA'}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Já tem conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
