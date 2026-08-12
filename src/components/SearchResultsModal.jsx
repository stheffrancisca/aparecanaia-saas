import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function SearchResultsModal({ showResults, searchResults, setShowResults }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // Verifica autenticação quando o modal abre
  useEffect(() => {
    if (!showResults) {
      setIsLoadingAuth(true);
      return;
    }

    setIsLoadingAuth(true);

    // Pegar token do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Sem token = não autenticado
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
      return;
    }

    // Verificar token chamando /api/auth/me
    fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setUser(data);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      })
      .finally(() => setIsLoadingAuth(false));
  }, [showResults]);

  if (!showResults) return null;
  if (!searchResults) return null;

  // Enquanto carrega autenticação
  if (isLoadingAuth) {
    return (
      <div className="modal-overlay" onClick={() => setShowResults(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Verificando acesso...</p>
          </div>
        </div>
      </div>
    );
  }

  // NÃO AUTENTICADO - Mostrar preview + solicitar signup
  if (!isAuthenticated) {
    return (
      <div className="modal-overlay" onClick={() => setShowResults(false)}>
        <div className="modal-content preview-modal" onClick={e => e.stopPropagation()}>
          <button
            className="modal-close"
            onClick={() => setShowResults(false)}
          >
            ✕
          </button>

          <div className="preview-results">
            <h2>✨ Veja seu resultado</h2>

            <div className="score-preview">
              <div className="score-big">{searchResults.score || '---'}/100</div>
              <p className="score-label">GEO Score para: <strong>{searchResults.domain}</strong></p>
            </div>

            <div className="preview-message">
              <p className="teaser">📊 Análise completa liberada apenas para clientes</p>
              <p className="teaser-small">Veja recomendações detalhadas, posição em cada IA e plano de ação personalizado</p>
            </div>

            <div className="signup-section">
              <h3>Desbloqueie seus resultados</h3>

              <Link to="/signup" className="btn-signup-primary">
                CRIAR CONTA GRÁTIS
              </Link>

              <p className="signup-note">
                Já tem conta? <Link to="/login" className="link-login">Faça login</Link>
              </p>

              <p className="guarantee-text">
                ✅ 14 dias grátis · Sem cartão de crédito · Cancele quando quiser
              </p>
            </div>
          </div>

          <button
            className="btn-close-preview"
            onClick={() => setShowResults(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  // AUTENTICADO - Mostrar resultado completo
  return (
    <div className="modal-overlay" onClick={() => setShowResults(false)}>
      <div className="modal-content full-results-modal" onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => setShowResults(false)}
        >
          ✕
        </button>

        <div className="full-results">
          <h2>📊 Seu GEO Score Completo</h2>

          <div className="score-display">
            <div className="score-big">{searchResults.score || '---'}/100</div>
            <p className="domain-display">{searchResults.domain}</p>
            <p className="user-logged-in">Logado como: <strong>{user?.name}</strong></p>
          </div>

          {searchResults.analysis && (
            <div className="analysis-section">
              <h3>Análise Detalhada</h3>
              <p>{searchResults.analysis}</p>
            </div>
          )}

          {searchResults.recommendations && (
            <div className="recommendations-section">
              <h3>Recomendações</h3>
              <ul>
                {searchResults.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="action-buttons">
            <Link to="/dashboard" className="btn-primary">
              Ver Dashboard Completo
            </Link>
            <button
              onClick={() => setShowResults(false)}
              className="btn-secondary"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
