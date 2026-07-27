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

function verifyToken(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token inválido' });
    return null;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Token inválido' });
    return null;
  }
}

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

exports.createSubscription = async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const { plan } = req.body;
    if (!plan || !PLAN_PRICES[plan]) return res.status(400).json({ error: 'Plano inválido' });

    const today = new Date();
    const nextMonth = addMonths(today, 1);

    const { data: subscription } = await supabase.from('subscriptions').insert({
      user_id: decoded.userId,
      plan,
      status: 'active',
      current_period_start: today.toISOString().split('T')[0],
      current_period_end: nextMonth.toISOString().split('T')[0]
    }).select().single();

    await supabase.from('payments').insert({
      user_id: decoded.userId,
      subscription_id: subscription.id,
      amount: PLAN_PRICES[plan],
      plan,
      status: 'completed',
      payment_date: today.toISOString(),
      next_billing_date: nextMonth.toISOString().split('T')[0]
    });

    res.status(201).json({ success: true, subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.upgradePlan = async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const { newPlan } = req.body;
    if (!newPlan || !PLAN_PRICES[newPlan]) return res.status(400).json({ error: 'Plano inválido' });

    const { data: currentSub } = await supabase.from('subscriptions').select('*').eq('user_id', decoded.userId).single();
    if (!currentSub) return res.status(404).json({ error: 'Assinatura não encontrada' });

    const { data: updated } = await supabase.from('subscriptions').update({ plan: newPlan }).eq('id', currentSub.id).select().single();

    await supabase.from('payments').insert({
      user_id: decoded.userId,
      subscription_id: currentSub.id,
      amount: PLAN_PRICES[newPlan],
      plan: newPlan,
      status: 'completed',
      payment_date: new Date().toISOString(),
      next_billing_date: currentSub.current_period_end
    });

    res.json({ success: true, subscription: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubscription = async (req, res) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return;

  try {
    const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', decoded.userId).single();
    res.json({ subscription });
  } catch (err) {
    res.status(500).json({ subscription: null });
  }
};