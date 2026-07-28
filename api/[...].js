require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const authApi = require('./auth');
const paymentApi = require('./payment');

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Auth
app.post('/api/auth/signup', authApi.signup);
app.post('/api/auth/login', authApi.login);
app.get('/api/auth/me', authApi.me);

// Payment
app.post('/api/payment/create-subscription', paymentApi.createSubscription);
app.post('/api/payment/upgrade-plan', paymentApi.upgradePlan);
app.get('/api/payment/subscription', paymentApi.getSubscription);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
