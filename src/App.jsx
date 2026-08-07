import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlanSelection from './pages/PlanSelection';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const userRes = await fetch(`${API_URL}/api/auth/me`, {
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData.user);
            setSubscription(userData.subscription);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (e) {
          console.error('Auth check failed:', e);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* HomePage - Sempre acessível */}
        <Route path="/" element={<HomePage />} />

        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} setSubscription={setSubscription} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : !subscription || !subscription.plan ? (
          <>
            <Route path="/plans" element={<PlanSelection user={user} setSubscription={setSubscription} />} />
            <Route path="*" element={<Navigate to="/plans" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<Dashboard user={user} subscription={subscription} setSubscription={setSubscription} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlanSelection from './pages/PlanSelection';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userRes = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData.user);
            setSubscription(userData.subscription);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (e) {
          console.error('Auth check failed:', e);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* HomePage - Sempre acessível */}
        <Route path="/" element={<HomePage />} />

        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} setSubscription={setSubscription} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : !subscription || !subscription.plan ? (
          <>
            <Route path="/plans" element={<PlanSelection user={user} setSubscription={setSubscription} />} />
            <Route path="*" element={<Navigate to="/plans" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<Dashboard user={user} subscription={subscription} setSubscription={setSubscription} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
