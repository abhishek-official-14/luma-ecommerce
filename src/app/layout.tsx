import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { StoreProvider } from "@/components/providers/store-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PwaRegister } from "@/components/providers/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Luma — Remarkable finds for modern life", template: "%s | Luma" },
  description: "Shop curated fashion, electronics, beauty and home essentials from trusted brands and verified sellers. Fast delivery, easy returns and secure payments.",
  keywords: ["online shopping", "fashion", "electronics", "beauty", "marketplace", "India"],
  openGraph: { title: "Luma — Remarkable finds for modern life", description: "A smarter, more beautiful way to shop.", type: "website", siteName: "Luma" },
  twitter: { card: "summary_large_image", title: "Luma Commerce" },
  alternates: { canonical: "/" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Luma" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { themeColor: "#1d2420", width: "device-width", initialScale: 1, maximumScale: 5 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <PwaRegister />
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
