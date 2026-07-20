import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return <main className="error-state shell"><SearchX /><p className="eyebrow">404 · Page not found</p><h1>We couldn&apos;t find that.</h1><p>The page may have moved, or the product is no longer available.</p><div><Link className="primary-button" href="/">Return home</Link><Link className="secondary-button" href="/shop">Explore products <ArrowRight /></Link></div></main>;
}
