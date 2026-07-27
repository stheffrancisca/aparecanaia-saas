import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check } from 'lucide-react';

const PLANS = {
  starter: { name: 'Starter', price: 29, features: ['1 site', 'GEO Score', '7 dias'] },
  pro: { name: 'Pro', price: 79, features: ['5 sites', 'Social Score', 'Histórico 90d', 'Relatórios'] },
  agencia: { name: 'Agência', price: 199, features: ['Ilimitado', 'Tudo', 'Concorrentes', 'Monitoramento', 'API'] }
};

export default function PlanSelection({ user, setSubscription }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const choose = async (plan) => {
    setSelected(plan);
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/create-subscription`,
        { plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscription(res.data.subscription);
      navigate('/dashboard');
    } catch (e) {
      alert('Erro');
      setSelected(null);
    }
    setLoading(false);
  };

  return (
    <div className="plan-selection">
      <div className="plan-header">
        <h1>Escolha seu plano</h1>
        <p>Selecione o melhor para você</p>
      </div>
      <div className="plans-grid">
        {Object.entries(PLANS).map(([k, p]) => (
          <div key={k} className={`plan-card ${selected === k ? 'selected' : ''}`}>
            <h2>{p.name}</h2>
            <div className="price">R$ {p.price}</div>
            <ul className="features">
              {p.features.map((f, i) => (
                <li key={i}><Check size={16} /> {f}</li>
              ))}
            </ul>
            <button onClick={() => choose(k)} disabled={loading && selected === k}>
              {loading && selected === k ? 'Ativando...' : 'Escolher'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}