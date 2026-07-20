import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = { title: "Secure account access", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = await params;
  return <AuthPage mode={mode} />;
}
