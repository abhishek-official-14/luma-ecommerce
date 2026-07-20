import type { Metadata } from "next";
import { ShopPage } from "@/components/shop-page";

export const metadata: Metadata = { title: "Shop all", description: "Browse fashion, electronics, beauty, home and more from trusted brands and verified sellers." };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  return <ShopPage initialQuery={value("q")} initialCategory={value("category")} initialBrand={value("brand")} deal={value("deal") === "true"} />;
}
