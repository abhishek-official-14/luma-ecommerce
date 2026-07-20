import { products } from "@/lib/catalog";

const requests = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const entry = requests.get(ip);
  if (entry && entry.resetAt > now && entry.count >= 60) return Response.json({ error: "Too many requests" }, { status: 429 });
  requests.set(ip, entry && entry.resetAt > now ? { ...entry, count: entry.count + 1 } : { count: 1, resetAt: now + 60_000 });
  const query = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() || "";
  if (query.length > 100) return Response.json({ error: "Query is too long" }, { status: 400 });
  const terms = query.split(/\s+/).filter(Boolean);
  const results = products.map((product) => {
    const text = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
    const score = terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
    return { product, score };
  }).filter((item) => !query || item.score > 0).sort((a, b) => b.score - a.score || b.product.rating - a.product.rating).slice(0, 12).map((item) => item.product);
  return Response.json({ data: results, meta: { query, total: results.length, mode: "semantic-ready" } });
}
