export default function handler(req, res) {
  const host = req.headers.host || "";
  const subdomain = host.split(".")[0];

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${subdomain} | Midia5</title>
      </head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Site ativo: ${subdomain}.midia5.com.br</h1>
        <p>Este domínio está funcionando corretamente.</p>
      </body>
    </html>
  `);
}
