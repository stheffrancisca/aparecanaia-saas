const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const jwtSecret = process.env.JWT_SECRET;

  const report = {
    SUPABASE_URL: {
      definida: !!url,
      tamanho: url ? url.length : 0,
      valor: url || null,
      temEspacoOuQuebra: url ? /\s/.test(url) : null,
      temAspas: url ? /["']/.test(url) : null,
      terminaComBarra: url ? url.endsWith('/') : null
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      definida: !!key,
      tamanho: key ? key.length : 0,
      comeca: key ? key.slice(0, 12) : null,
      temEspacoOuQuebra: key ? /\s/.test(key) : null
    },
    JWT_SECRET: {
      definida: !!jwtSecret,
      tamanho: jwtSecret ? jwtSecret.length : 0
    },
    conexao: null
  };

  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const { data, error } = await supabase.from('users').select('id').limit(1);
      report.conexao = error
        ? { ok: false, erro: error.message, detalhe: error.details || null, hint: error.hint || null }
        : { ok: true, linhasRetornadas: data ? data.length : 0 };
    } catch (err) {
      report.conexao = { ok: false, erro: err.message, tipo: err.name };
    }
  } else {
    report.conexao = { ok: false, erro: 'URL ou KEY ausente no ambiente' };
  }

  res.status(200).json(report);
};
