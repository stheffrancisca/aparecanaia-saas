import { SearchResultsModal } from './components/SearchResultsModal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // ESTADOS PARA BUSCA E RESULTADOS
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [domain, setDomain] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // FUNÇÃO DE BUSCA
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch('/api/geo-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() })
      });
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
      setDomain('');
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
      answer: 'GEO (Generative Engine Optimization) é a prática de otimizar seu site para aparecer nas respostas de IAs generativas como ChatGPT, Gemini e Claude. Com o crescimento dessas ferramentas como motor de busca, aparecer nas respostas delas se tornou tão importante quanto ranquear no Google.'
    },
    {
      id: 2,
      question: 'Quanto custa para corrigir meu GEO Score?',
      answer: 'Depende do que precisa corrigir. A maioria resolve em 1-4 semanas. Se contratar agência, custa entre R$500-2k. Se fizer por conta própria (seguindo nosso checklist), é grátis. O Apareça na IA gera um plano de ação personalizado.'
    },
    {
      id: 3,
      question: 'Funciona para meu setor específico?',
      answer: 'Sim. Já testamos com: E-commerce, Consultoria, RH, Imobiliário, Saúde, Advocacia, Tech, Educação e mais. Se tiver dúvida sobre seu setor específico, rode o teste grátis e veja.'
    },
    {
      id: 4,
      question: 'E se já fiz SEO tradicional?',
      answer: 'Ótimo! SEO + GEO juntos é imbatível. Mas uma coisa não substitui a outra. SEO é para Google. GEO é para ChatGPT/Gemini. Muitas das correções GEO melhoram seu SEO também.'
    },
    {
      id: 5,
      question: 'Quanto tempo leva para ver resultado?',
      answer: 'Primeiro resultado em 3-7 dias (após implementar as correções). Resultado completo e estável em 30-60 dias. As IAs levam tempo para reindexar e reconhecer as mudanças.'
    },
    {
      id: 6,
      question: 'Preciso de programador?',
      answer: 'Nem sempre. Muitas correções você faz sozinho (conteúdo, FAQ, títulos). Algumas precisam de dev (Schema Markup, performance). Nosso checklist deixa claro qual é qual.'
    },
    {
      id: 7,
      question: 'Como vocês sabem se minha marca foi mencionada?',
      answer: 'Enviamos automaticamente dezenas de perguntas às APIs do ChatGPT, Gemini e Claude simulando buscas reais de consumidores no seu nicho. Analisamos cada resposta em busca do nome da sua marca e reportamos frequência, posição e contexto das menções.'
    },
    {
      id: 8,
      question: 'Posso cancelar a qualquer hora?',
      answer: 'Sim. Sem fidelidade. Cancele em 1 clique direto no dashboard. Nenhuma pergunta. Nenhuma burocracia.'
    },
    {
      id: 9,
      question: 'Vocês vendem meus dados?',
      answer: 'Não. Seus dados são 100% privados. Cada análise é acessível apenas por você. Nunca compartilhamos com terceiros. Veja nossa política de privacidade completa.'
    }
  ];

  return (
    <div className="homepage">
      {/* HEADER */}
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

      {/* HERO - COM FORMULÁRIO DE BUSCA */}
      <section className="hero">
        <div className="container">
          <h1>Seus Clientes Já Mudaram.<br />Você Percebeu?</h1>
          <p className="subtitle">
            67% das buscas pelo seu setor já acontecem direto no ChatGPT, Gemini e Claude.<br />
            Você está na resposta ou é invisível?
          </p>
          <div className="hero-example">
            <h3>Imagine essa situação:</h3>
            <div className="step">
              <div className="step-icon">👤</div>
              <div className="step-text"><strong>Cliente procura:</strong> "Qual a melhor [seu segmento] aqui?"</div>
            </div>
            <div className="step">
              <div className="step-icon">💬</div>
              <div className="step-text"><strong>Ele pergunta pro ChatGPT</strong> (não googla)</div>
            </div>
            <div className="step">
              <div className="step-icon">🤖</div>
              <div className="step-text"><strong>O ChatGPT lista:</strong> Empresa A, Empresa B, Empresa C</div>
            </div>
            <div className="step">
              <div className="step-icon">❌</div>
              <div className="step-text"><strong>Você:</strong> Invisível</div>
            </div>
            <div className="step" style={{ marginTop: '20px' }}>
              <div className="step-icon">💥</div>
              <div className="step-text"><strong>Resultado:</strong> Seu cliente virou cliente deles. Você nunca soube por quê.</div>
            </div>
          </div>
          <p className="subtitle" style={{ marginTop: '30px' }}>
            Toda semana, clientes seus fazem essa pergunta.<br />
            <strong>Quantos você está perdendo?</strong>
          </p>

          {/* FORMULÁRIO DE BUSCA */}
          <form onSubmit={handleSearch} className="search-form" style={{ marginBottom: '30px' }}>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Digite seu domínio (ex: meusite.com.br)"
              disabled={isSearching}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px 0 0 8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
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
          </form>
          <p className="sub-text">Resultado em 30 segundos · Sem cadastro · Sem cartão de crédito</p>
          <div className="secondary-links">
            ou <a href="#precos">conhecer os planos</a> ·
            <a href="#sobre">quem somos</a>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social-proof">
        <div className="container">
          <div className="proof-header">
            <h2>Confiado por empresas brasileiras</h2>
            <div className="proof-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-text">Empresas testaram</div>
              </div>
              <div className="stat">
                <div className="stat-number">4.8⭐</div>
                <div className="stat-text">Satisfação média</div>
              </div>
              <div className="stat">
                <div className="stat-number">R$50M+</div>
                <div className="stat-text">Em oportunidades<br />identificadas</div>
              </div>
            </div>
          </div>
          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <div className="testimonial-text">"Em uma hora descobri que estava invisível no ChatGPT. Em 60 dias, estava #2 na resposta. Simples demais."</div>
              <div className="testimonial-author">Mariana S.</div>
              <div className="testimonial-role">CEO, E-commerce de Artesanato (São Paulo)</div>
            </div>
            <div className="testimonial">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <div className="testimonial-text">"Ofereci como novo serviço pros meus clientes. Cada um pagando R$397/mês. Fácil R$10k de receita nova."</div>
              <div className="testimonial-author">Fernando T.</div>
              <div className="testimonial-role">Diretor, Agência Digital (Belo Horizonte)</div>
            </div>
            <div className="testimonial">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <div className="testimonial-text">"Pensava que era mais complicado. O checklist do Apareça na IA foi tão claro que eu mesmo implementei em 2 semanas."</div>
              <div className="testimonial-author">Lucas M.</div>
              <div className="testimonial-role">Founder, Startup B2B (Rio de Janeiro)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="case-study" id="caso">
        <div className="container">
          <h2>De Invisível a #2 em 60 Dias</h2>
          <div className="case-study-grid">
            <div>
              <div className="case-column">
                <h3>📊 SITUAÇÃO INICIAL</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                  <strong>Consultoria de RH — São Paulo</strong><br />
                  Problema: Perdia licitações porque concorrência aparecia no ChatGPT. Ela não.
                </p>
                <h3 style={{ marginTop: '20px' }}>❌ ANTES (Dia 1)</h3>
                <div className="case-metric">
                  <span className="case-metric-label">GEO Score</span>
                  <span className="case-metric-value">28/100</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção ChatGPT</span>
                  <span className="case-metric-value">Não citada</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção Gemini</span>
                  <span className="case-metric-value">Não citada</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção Claude</span>
                  <span className="case-metric-value">Não citada</span>
                </div>
                <div className="case-metric highlight">
                  <span className="case-metric-label">Leads perdidos/mês</span>
                  <span className="case-metric-value">~15</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Receita perdida/mês</span>
                  <span className="case-metric-value">R$45.000</span>
                </div>
              </div>
            </div>
            <div>
              <div className="case-column">
                <h3>🔧 SOLUÇÃO IMPLEMENTADA</h3>
                <div className="case-solution">
                  <div className="case-item">
                    <div className="case-item-icon">✓</div>
                    <div className="case-item-text"><strong>FAQ estruturada</strong> — Perguntas que o ChatGPT faz</div>
                  </div>
                  <div className="case-item">
                    <div className="case-item-icon">✓</div>
                    <div className="case-item-text"><strong>Schema Markup</strong> — Linguagem que IA entende</div>
                  </div>
                  <div className="case-item">
                    <div className="case-item-icon">✓</div>
                    <div className="case-item-text"><strong>3 artigos de autoridade</strong> — Sobre tendências de RH</div>
                  </div>
                  <div className="case-item">
                    <div className="case-item-icon">✓</div>
                    <div className="case-item-text"><strong>Core Web Vitals</strong> — Otimizou velocidade</div>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                  <strong>Tempo:</strong> 3 semanas | <strong>Custo:</strong> R$254 (Starter)
                </p>
                <h3 style={{ marginTop: '25px' }}>✅ DEPOIS (Dia 60)</h3>
                <div className="case-metric">
                  <span className="case-metric-label">GEO Score</span>
                  <span className="case-metric-value">76/100 <span style={{ color: '#10b981', fontSize: '12px' }}>(+170%)</span></span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção ChatGPT</span>
                  <span className="case-metric-value">#2 ✅</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção Gemini</span>
                  <span className="case-metric-value">#3 ✅</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-label">Menção Claude</span>
                  <span className="case-metric-value">#1 ✅</span>
                </div>
                <div className="case-metric highlight">
                  <span className="case-metric-label">Leads novos/mês</span>
                  <span className="case-metric-value">+12</span>
                </div>
                <div className="case-metric highlight">
                  <span className="case-metric-label">Receita nova/mês</span>
                  <span className="case-metric-value">+R$36.000</span>
                </div>
                <div className="case-metric roi">
                  <span className="case-metric-label">ROI</span>
                  <span className="case-metric-value">141x 🚀</span>
                </div>
                <div className="case-quote">
                  <div className="case-quote-text">"R$254 de investimento virando R$36k/mês é praticamente magia. Já contratei o plano Pro pra otimizar os outros 4 clientes também."</div>
                  <div className="case-quote-author">Diretora de Marketing</div>
                  <div className="case-quote-role">Consultoria de RH, São Paulo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="precos">
        <div className="container">
          <h2>Escolha o Plano Ideal para Seu Tipo de Negócio</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-name">STARTER</div>
              <div className="price-amount">R$127</div>
              <div className="price-period">/mês (sem fidelidade)</div>
              <div className="price-for">✓ Ideal para:</div>
              <div className="price-examples">
                • Freelancer<br />
                • Pequena empresa<br />
                • Começar a testar GEO
              </div>
              <div className="price-result">
                <div className="price-result-title">Resultado esperado:</div>
                <div className="price-result-text">Ganhar 3-5 clientes por mês (+R$3k)</div>
              </div>
              <ul className="price-features">
                <li>1 site monitorado</li>
                <li>GEO Score completo</li>
                <li>Auditorias ilimitadas</li>
                <li>30 dias de histórico</li>
                <li>Export CSV</li>
              </ul>
              <div className="price-payback">Payback: 30 dias | ROI: 12x</div>
              <Link to="/signup" className="price-cta primary">Começar Grátis</Link>
            </div>
            <div className="price-card popular">
              <div className="price-badge">⭐ MAIS POPULAR</div>
              <div className="price-name">PRO</div>
              <div className="price-amount">R$397</div>
              <div className="price-period">/mês (sem fidelidade)</div>
              <div className="price-for">✓ Ideal para:</div>
              <div className="price-examples">
                • Agência digital<br />
                • Startup B2B<br />
                • Consultoria
              </div>
              <div className="price-result">
                <div className="price-result-title">Resultado esperado:</div>
                <div className="price-result-text">Ganhar 15-30 clientes/mês (+R$20k)</div>
              </div>
              <ul className="price-features">
                <li>Tudo do Starter</li>
                <li>Até 5 sites</li>
                <li>Comparação com 3 concorrentes</li>
                <li>90 dias de histórico</li>
                <li>Suporte prioritário</li>
              </ul>
              <div className="price-payback">Payback: 30 dias | ROI: 50-100x</div>
              <Link to="/signup" className="price-cta primary">Começar Grátis</Link>
            </div>
            <div className="price-card">
              <div className="price-name">AGÊNCIA</div>
              <div className="price-amount">R$997</div>
              <div className="price-period">/mês (sem fidelidade)</div>
              <div className="price-for">✓ Ideal para:</div>
              <div className="price-examples">
                • Agência grande<br />
                • Consultoria<br />
                • 30+ clientes
              </div>
              <div className="price-result">
                <div className="price-result-title">Resultado esperado:</div>
                <div className="price-result-text">Gerar R$200k+/mês em projetos novos</div>
              </div>
              <ul className="price-features">
                <li>Tudo do Pro</li>
                <li>Até 25 sites</li>
                <li>Keywords ilimitadas</li>
                <li>12 meses de histórico</li>
                <li>White-label (seu logo)</li>
                <li>Gerente dedicado</li>
              </ul>
              <div className="price-payback">Payback: 30 dias | ROI: 200x+</div>
              <Link to="#contato" className="price-cta secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>Solicitar Demo</Link>
            </div>
          </div>
          <div className="guarantee">
            <h3>✅ GARANTIA 100%</h3>
            <p>Se você não ver <strong>melhoria no GEO Score em 30 dias</strong>,<br />devolvemos 100% da sua assinatura.</p>
            <p>Sem perguntas. Sem complicação.</p>
            <p><strong>Porque a gente só ganha quando você ganha. 🎯</strong></p>
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '40px' }}>
            <p><strong>Teste 14 dias grátis em qualquer plano</strong></p>
            <p>Sem cartão · Sem fidelidade · Cancele em 1 clique</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <div key={item.id} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <span>{expandedFaq === item.id ? '−' : '+'}</span>
                </div>
                {expandedFaq === item.id && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="about" id="sobre">
        <div className="container">
          <h2>Quem Somos</h2>
          <div className="about-content">
            <p>
              <strong>Desenvolvemos o Apareça na IA porque percebemos um problema gigante que ninguém resolve.</strong>
            </p>
            <p style={{ marginTop: '20px' }}>
              Em 2024, auditamos 500+ sites brasileiros e descobrimos algo chocante: <strong>82% eram completamente invisíveis quando alguém perguntava ao ChatGPT qual empresa contratar</strong>.
            </p>
            <p style={{ marginTop: '20px' }}>
              Mas aqui está o problema maior: <strong>ninguém media isso</strong>. Não existia ferramenta. E a maioria perdia clientes sem saber por quê.
            </p>
            <p style={{ marginTop: '20px' }}>
              Então decidimos resolver isso. Criamos o Apareça na IA com uma missão clara:
            </p>
            <p style={{ marginTop: '20px', padding: '20px', background: '#f0fdf4', borderLeft: '4px solid #10b981', borderRadius: '6px' }}>
              <strong>"Dar a todo negócio brasileiro a capacidade de aparecer quando seus clientes o procuram no ChatGPT, Gemini ou Claude."</strong>
            </p>
            <div className="about-team">
              <h3>Nosso Time</h3>
              <div className="team-member">
                <div className="member-name">👩‍💼 Sthefani Francisca</div>
                <div className="member-role">Fundadora · Analista de FP&A · Especialista em IA</div>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '10px', lineHeight: '1.6' }}>
                  Especialista em planejamento financeiro, análise de rentabilidade e business intelligence. Combina expertise em Excel avançado, SQL, Power BI, Python e IA para transformar dados em decisões estratégicas. Com experiência em previsão financeira e automação de processos em startups e grandes empresas.
                </p>
                <div className="member-links">
                  <a href="https://www.linkedin.com/in/sthefani-francisca/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="contact" id="contato">
        <div className="container">
          <h2>Quer Conversar Sobre GEO?</h2>
          <p style={{ fontSize: '16px', color: '#666', marginTop: '10px', marginBottom: '30px' }}>
            Dúvidas, sugestões ou quer uma demo personalizada? Envie uma mensagem para a gente.
          </p>
          <form style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a' }}>
                Seu Nome *
              </label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a' }}>
                Seu E-mail *
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a' }}>
                Empresa/Nicho
              </label>
              <input
                type="text"
                placeholder="Ex: Consultoria de RH"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1a1a1a' }}>
                Mensagem *
              </label>
              <textarea
                placeholder="Como podemos ajudar?"
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Enviar Mensagem
            </button>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '15px', textAlign: 'center' }}>
              Responderemos em até 24 horas · aparecanaia@gmail.com
            </p>
          </form>
        </div>
      </section>

      {/* MODAL DE RESULTADOS - COMPONENTE IMPORTADO */}
      <SearchResultsModal
        showResults={showResults}
        searchResults={searchResults}
        setShowResults={setShowResults}
      />

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Apareça na IA · Plataforma de Visibilidade nas IAs</p>
          <p>
            Contato: <a href="mailto:aparecanaia@gmail.com">aparecanaia@gmail.com</a> |
            <a href="#">Política de Privacidade</a> |
            <a href="#">Termos de Serviço</a>
          </p>
          <p style={{ color: '#999' }}>
            Desenvolvido com as APIs oficiais: ChatGPT (OpenAI) · Gemini (Google) · Claude (Anthropic)
          </p>
        </div>
      </footer>
    </div>
  );
}
