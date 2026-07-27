const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Dados incompletos' });

    const { data: existing } = await supabase.from('users').select('id').eq('email', email).single();
    if (existing) return res.status(400).json({ error: 'E-mail já cadastrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: user, error: insertError } = await supabase.from('users').insert({
      email, name, password_hash: hashedPassword
    }).select().single();

    if (insertError || !user) return res.status(400).json({ error: insertError?.message || 'Erro ao criar usuário' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'E-mail e senha obrigatórios' });

    const { data: user, error: userError } = await supabase.from('users').select('*').eq('email', email).single();
    if (userError || !user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single();
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email }, subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token obrigatório' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const { data: user } = await supabase.from('users').select('*').eq('id', decoded.userId).single();
    const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', decoded.userId).single();

    res.json({ user: { id: user.id, name: user.name, email: user.email }, subscription });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};