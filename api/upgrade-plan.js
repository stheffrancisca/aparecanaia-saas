require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-super-segura';

const PLAN_PRICES = {
  starter: 29,
  pro: 79,
  agencia: 199
};

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const { plan } = req.body;

    if (!plan || !PLAN_PRICES[plan]) {
      return res.status(400).json({ error: 'Plano inválido' });
    }

    const { data: subscription, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        plan,
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .eq('user_id', decoded.userId)
      .select()
      .single();

    if (updateError) return res.status(400).json({ error: updateError.message });

    const amount = PLAN_PRICES[plan];
    const { data: payment } = await supabase
      .from('payments')
      .insert({
        user_id: decoded.userId,
        subscription_id: subscription.id,
        amount,
        status: 'completed',
        payment_method: 'fake_payment',
        transaction_id: `fake_${Date.now()}`
      })
      .select()
      .single();

    res.status(200).json({
      success: true,
      subscription,
      payment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
