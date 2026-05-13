export default async function handler(req, res) {
  const incomingHostRaw =
    req.headers["x-forwarded-host"] ||
    req.headers["x-vercel-forwarded-host"] ||
    req.headers["host"] ||
    "";

  const incomingHost = String(incomingHostRaw)
    .split(",")[0]
    .toLowerCase();

  const subdomain = incomingHost.endsWith(".metabusy.com.br")
    ? incomingHost.split(".")[0]
    : "";

  const url = new URL(
    "https://rhnijvtmpmdyftfyoyiq.supabase.co/functions/v1/site-render"
  );

  if (subdomain) {
    url.searchParams.set("subdomain", subdomain);
  }

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        "x-forwarded-host": incomingHost,
        "x-original-host": incomingHost,
      },
    });

    const contentType =
      response.headers.get("content-type") || "text/plain";

    const body = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "no-cache");

    res.status(response.status).send(Buffer.from(body));
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error");
  }
}
