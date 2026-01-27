export default async function handler(req, res) {
  try {
    const host = (req.headers.host || "").split(":")[0];
    const subdomain = host.replace(".metabusy.com.br", "").split(".")[0];

    if (!subdomain || subdomain === "www" || subdomain === "metabusy") {
      return res.status(200).send("OK - domínio raiz");
    }

    // CHAMA A EDGE FUNCTION QUE BUSCA OS DADOS REAIS
    const url = `https://rhniytwnpmdytftyoyiq.supabase.co/functions/v1/site-render?subdomain=${encodeURIComponent(subdomain)}`;

    const response = await fetch(url);
    const body = await response.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.status(response.status).send(body);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).send("Erro no proxy");
  }
}
