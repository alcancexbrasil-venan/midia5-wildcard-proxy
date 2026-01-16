export default function handler(req, res) {
  const host = req.headers.host || '';
  const subdomain = host.split('.')[0];

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${subdomain} | Midia5</title>
      </head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Site ativo: ${subdomain}.midia5.com.br</h1>
        <p>Wildcard funcionando corretamente.</p>
      </body>
    </html>
  `);
}
