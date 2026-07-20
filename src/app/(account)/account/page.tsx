import type { Metadata } from "next";
import { AccountPage } from "@/components/account/account-page";

export const metadata: Metadata = { title: "My account", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <AccountPage initialTab={typeof params.tab === "string" ? params.tab : "overview"} />;
}
