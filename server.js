require('dotenv').config({ path: './.env.local' });

const express = require('express');
const cors = require('cors');
const authApi = require('./api/auth');
const paymentApi = require('./api/payment');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Auth
app.post('/api/auth/signup', authApi.signup);
app.post('/api/auth/login', authApi.login);
app.get('/api/auth/me', authApi.me);

// Payment
app.post('/api/payment/create-subscription', paymentApi.createSubscription);
app.post('/api/payment/upgrade-plan', paymentApi.upgradePlan);
app.get('/api/payment/subscription', paymentApi.getSubscription);

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});