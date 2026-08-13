import { SearchResultsModal } from '../components/SearchResultsModal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/SearchResultsModal.css';

export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [domain, setDomain] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch('/api/geo-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domain.trim() })
      });
      const data = await res.json();
      
      if (data.success && data.result) {
        setSearchResults(data.result);
        setShowResults(true);
        setDomain('');
      } else {
        alert(data.error || 'Erro ao buscar');
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const faqItems = [
    {
      id: 1,
      question: 'O que é GEO?',
      answer: 'GEO (Generative Engine Optimization) é a prática de otimizar seu site para aparecer nas respostas de IAs generativas como ChatGPT, Gemini e Claude.'
    },
    {
      id: 2,
      question: 'Quanto custa para corrigir meu GEO Score?',
      answer: 'Depende do que precisa corrigir. A maioria resolve em 1-4 semanas.'
    }
  ];

  return (
    <div className="homepage">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">🚀 Apareça na IA</div>
            <nav>
              <a href="#caso">Caso de Sucesso</a>
              <a href="#precos">Preços</a>
              <a href="#faq">FAQ</a>
              <a href="#sobre">Sobre</a>
              <a href="#contato">Contato</a>
            </nav>
            <Link to="/login" className="btn-primary">Entrar</Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Seus Clientes Já Mudaram.<br />Você Percebeu?</h1>
          <p className="subtitle">
            67% das buscas pelo seu setor já acontecem direto no ChatGPT, Gemini e Claude.<br />
            Você está na resposta ou é invisível?
          </p>

          {/* FORMULÁRIO DE BUSCA */}
          <form onSubmit={handleSearch} style={{ marginBottom: '30px', marginTop: '40px' }}>
            <div style={{ display: 'flex', gap: '0', marginBottom: '20px' }}>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Digite seu domínio (ex: meusite.com.br)"
                disabled={isSearching}
                required
                style={{
                  flex: 1,
                  padding: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px 0 0 8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                disabled={isSearching}
                style={{
                  padding: '14px 30px',
                  background: isSearching ? '#dc2626cc' : '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 8px 8px 0',
                  fontWeight: '600',
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                {isSearching ? 'Analisando...' : 'DESCOBRIR MEU GEO SCORE'}
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
            Resultado em 30 segundos · Sem cadastro · Sem cartão de crédito
          </p>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <div key={item.id} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  style={{ cursor: 'pointer', padding: '15px', background: '#f9fafb', borderRadius: '6px', marginBottom: '10px' }}
                >
                  <span>{item.question}</span>
                  <span>{expandedFaq === item.id ? '−' : '+'}</span>
                </div>
                {expandedFaq === item.id && (
                  <div style={{ padding: '15px', background: '#f0f9ff', borderRadius: '6px' }}>{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2025 Apareça na IA · Plataforma de Visibilidade nas IAs</p>
        </div>
      </footer>

      {/* MODAL DE RESULTADOS */}
      <SearchResultsModal
        showResults={showResults}
        searchResults={searchResults}
        setShowResults={setShowResults}
      />
    </div>
  );
}
