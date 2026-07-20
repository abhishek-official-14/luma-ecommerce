"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="error-state shell"><AlertTriangle /><p className="eyebrow">Something went wrong</p><h1>That wasn&apos;t meant to happen.</h1><p>Our team has been notified. You can safely try again.</p><button className="primary-button" onClick={reset}>Try again</button></main>;
}
