export default function handler(req, res) {
  const host = req.headers.host || '';
  const subdomain = host.split('.')[0];

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>${subdomain} | Media5</title>
      </head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Site ativo: ${host}</h1>
        <p>Rota API funcionando corretamente.</p>
      </body>
    </html>
  `);
}
