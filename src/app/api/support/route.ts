const requests = new Map<string, number>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const lastRequest = requests.get(ip) || 0;
  if (Date.now() - lastRequest < 10_000) return Response.json({ error: "Please wait before submitting another request." }, { status: 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body" }, { status: 400 }); }
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request" }, { status: 400 });
  const values = body as Record<string, unknown>;
  if (typeof values.email !== "string" || !/^\S+@\S+\.\S+$/.test(values.email) || typeof values.message !== "string" || values.message.trim().length < 10) return Response.json({ error: "A valid email and message are required." }, { status: 422 });
  requests.set(ip, Date.now());
  const ticket = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
  return Response.json({ ok: true, ticket, message: "Your support request has been received." }, { status: 201 });
}
