import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Lock, Zap, TrendingUp, Users, BarChart3, Code, Settings } from 'lucide-react';
import '../styles/Dashboard.css';

// Feature access by plan
const FEATURE_ACCESS = {
  starter: ['geo-score'],
  pro: ['geo-score', 'social-score', 'history', 'reports'],
  agencia: ['geo-score', 'social-score', 'history', 'reports', 'competitors', 'monitoring', 'api']
};

const PLAN_PRICES = {
  starter: 29,
  pro: 79,
  agencia: 199
};

export default function Dashboard({ user, subscription, setSubscription }) {
  const [activeTab, setActiveTab] = useState('geo-score');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [nextPlan, setNextPlan] = useState(null);
  const navigate = useNavigate();

  const hasAccess = (feature) => FEATURE_ACCESS[subscription.plan]?.includes(feature);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setSubscription(null);
    navigate('/login');
  };

  const handleFeatureClick = (feature) => {
    if (!hasAccess(feature)) {
      const plans = { starter: 'pro', pro: 'agencia' };
      setNextPlan(plans[subscription.plan] || 'agencia');
      setShowUpgradeModal(true);
    } else {
      setActiveTab(feature);
    }
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    alert('Redirecionando para upgrade...');
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Apareça na IA</h1>
          <div className="user-info">
            <span>{user.name} ({user.email})</span>
            <div className="plan-badge">{subscription.plan.toUpperCase()}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Sair
        </button>
      </header>

      <div className="dashboard-content">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <nav className="nav-tabs">
            <div
              className={`nav-item ${activeTab === 'geo-score' ? 'active' : ''}`}
              onClick={() => setActiveTab('geo-score')}
            >
              <Zap size={20} /> GEO Score
            </div>
            <div
              className={`nav-item ${activeTab === 'social-score' ? 'active' : ''} ${!hasAccess('social-score') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('social-score')}
            >
              {!hasAccess('social-score') && <Lock size={16} />}
              <TrendingUp size={20} /> Social Score
            </div>
            <div
              className={`nav-item ${activeTab === 'history' ? 'active' : ''} ${!hasAccess('history') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('history')}
            >
              {!hasAccess('history') && <Lock size={16} />}
              <BarChart3 size={20} /> Histórico
            </div>
            <div
              className={`nav-item ${activeTab === 'competitors' ? 'active' : ''} ${!hasAccess('competitors') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('competitors')}
            >
              {!hasAccess('competitors') && <Lock size={16} />}
              <Users size={20} /> Concorrentes
            </div>
            <div
              className={`nav-item ${activeTab === 'monitoring' ? 'active' : ''} ${!hasAccess('monitoring') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('monitoring')}
            >
              {!hasAccess('monitoring') && <Lock size={16} />}
              <TrendingUp size={20} /> Monitoramento 24/7
            </div>
            <div
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''} ${!hasAccess('reports') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('reports')}
            >
              {!hasAccess('reports') && <Lock size={16} />}
              <BarChart3 size={20} /> Relatórios
            </div>
            <div
              className={`nav-item ${activeTab === 'api' ? 'active' : ''} ${!hasAccess('api') ? 'locked' : ''}`}
              onClick={() => handleFeatureClick('api')}
            >
              {!hasAccess('api') && <Lock size={16} />}
              <Code size={20} /> API/Webhooks
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* GEO Score Tab */}
          {activeTab === 'geo-score' && (
            <div className="tab-content">
              <h2>GEO Score Analysis</h2>
              <p>Analise a visibilidade do seu site nas IAs generativas.</p>
              <div className="add-site">
                <input type="url" placeholder="Adicionar novo site..." />
                <button>Analisar</button>
              </div>
              <div className="results-grid">
                <div className="score-card">
                  <h3>seu-site.com.br</h3>
                  <div className="score">93/100</div>
                  <p className="headline">Ótima visibilidade nas IAs</p>
                  <div className="details">
                    <p><strong>Pontos fortes:</strong></p>
                    <ul>
                      <li>Schema Markup bem implementado</li>
                      <li>Meta tags otimizadas</li>
                      <li>Conteúdo de qualidade</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Score Tab */}
          {activeTab === 'social-score' && (
            <div className="tab-content">
              {hasAccess('social-score') ? (
                <>
                  <h2>GEO Social Score</h2>
                  <p>Analise sua visibilidade em Instagram e TikTok.</p>
                  <div className="social-scores">
                    <div className="social-card">
                      <h3>Instagram</h3>
                      <div className="score">78/100</div>
                    </div>
                    <div className="social-card">
                      <h3>TikTok</h3>
                      <div className="score">65/100</div>
                    </div>
                  </div>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="tab-content">
              {hasAccess('history') ? (
                <>
                  <h2>Histórico de Evolução</h2>
                  <p>Acompanhe como sua visibilidade evoluiu ao longo do tempo.</p>
                  <div className="history-chart">
                    <p>Gráfico de evolução (90 dias de histórico)</p>
                  </div>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}

          {/* Competitors Tab */}
          {activeTab === 'competitors' && (
            <div className="tab-content">
              {hasAccess('competitors') ? (
                <>
                  <h2>Comparação com Concorrentes</h2>
                  <p>Veja como você se compara com seus concorrentes.</p>
                  <div className="competitors-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Site</th>
                          <th>GEO Score</th>
                          <th>Social Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="yours">
                          <td>Seu site</td>
                          <td>93</td>
                          <td>78</td>
                        </tr>
                        <tr>
                          <td>Concorrente 1</td>
                          <td>85</td>
                          <td>72</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}

          {/* Monitoring Tab */}
          {activeTab === 'monitoring' && (
            <div className="tab-content">
              {hasAccess('monitoring') ? (
                <>
                  <h2>Monitoramento Contínuo 24/7</h2>
                  <p>Monitore sua visibilidade em tempo real.</p>
                  <div className="monitoring-status">
                    <div className="status-item">
                      <div className="status-light online"></div>
                      <span>Monitoramento ativo</span>
                    </div>
                    <p className="last-update">Última análise: há 5 minutos</p>
                  </div>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="tab-content">
              {hasAccess('reports') ? (
                <>
                  <h2>Relatórios em PDF</h2>
                  <p>Gere relatórios profissionais em PDF.</p>
                  <button className="download-btn">Gerar Relatório</button>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="tab-content">
              {hasAccess('api') ? (
                <>
                  <h2>API / Webhooks</h2>
                  <p>Integre a Apareça na IA nos seus sistemas.</p>
                  <div className="api-keys">
                    <input type="text" value="sk_live_xxx..." readOnly />
                    <button>Copiar</button>
                  </div>
                </>
              ) : (
                <LockedFeature plan={nextPlan} onUpgrade={handleUpgrade} />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Recurso Bloqueado</h3>
            <p>Esta feature está disponível apenas no plano <strong>{nextPlan?.toUpperCase()}</strong>.</p>
            <p className="modal-price">R$ {PLAN_PRICES[nextPlan]}/mês</p>
            <button className="upgrade-btn" onClick={handleUpgrade}>
              Fazer Upgrade
            </button>
            <button className="close-btn" onClick={() => setShowUpgradeModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LockedFeature({ plan, onUpgrade }) {
  return (
    <div className="locked-feature">
      <Lock size={48} />
      <h3>Recurso Bloqueado</h3>
      <p>Faça upgrade para o plano <strong>{plan?.toUpperCase()}</strong> para acessar esta feature.</p>
      <button onClick={onUpgrade} className="upgrade-btn">
        Fazer Upgrade para R$ {PLAN_PRICES[plan]}/mês
      </button>
    </div>
  );
}