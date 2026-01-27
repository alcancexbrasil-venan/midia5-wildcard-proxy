export default async function handler(req, res) {
  // IMPORTANTE: Vercel coloca o host original em x-forwarded-host primeiro
  const originalHost = 
    req.headers['x-forwarded-host'] || 
    req.headers['x-vercel-forwarded-host'] || 
    req.headers['host'] || 
    '';
  
  console.log('Proxy - Host capturado:', originalHost);
  
  try {
    const response = await fetch('https://rhniytwnpmdytftyoyiq.supabase.co/functions/v1/site-render', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
        'x-forwarded-host': originalHost,
        'x-original-host': originalHost,  // Header backup
      },
    });
    
    const html = await response.text();
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(response.status).send(html);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Erro no proxy: ' + error.message);
  }
}
