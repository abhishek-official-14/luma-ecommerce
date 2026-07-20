import { products } from "@/lib/catalog";

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category")?.toLowerCase();
  const brand = searchParams.get("brand")?.toLowerCase();
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
  const result = products.filter((product) => (!category || product.category.toLowerCase() === category) && (!brand || product.brand.toLowerCase() === brand)).slice(0, limit);
  return Response.json({ data: result, meta: { total: result.length, limit } }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
