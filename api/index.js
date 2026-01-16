export default async function handler(req, res) {
  try {
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];

    if (!subdomain || subdomain === 'www' || subdomain === 'midia5') {
      return res.status(400).send('Subdomain inválido');
    }

    const url = `https://rhniytwnpmdytftyoyiq.supabase.co/functions/v1/site-render?subdomain=${subdomain}`;

    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || 'text/html';
    const body = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).send('Erro no proxy');
  }
}
