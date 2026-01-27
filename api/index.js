export default async function handler(req, res) {
  // Captura o host original (cjc.metabusy.com.br)
  const originalHost = req.headers['host'] || req.headers['x-forwarded-host'] || '';
  
  try {
    const response = await fetch('https://rhniytwnpmdytftyoyiq.supabase.co/functions/v1/site-render', {
      method: req.method,
      headers: {
        'Content-Type': 'text/html',
        'x-forwarded-host': originalHost,  // CRÍTICO: passar o host original
      },
    });
    
    const html = await response.text();
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(response.status).send(html);
  } catch (error) {
    res.status(500).send('Erro no proxy');
  }
}
