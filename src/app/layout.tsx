import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_INDEXABLE } from "@/lib/site-visibility";
import "./globals.css";

// Pre-launch, emit `noindex, nofollow` on every page. Nested layouts don't set
// `robots`, so this is inherited site-wide. Flip SITE_INDEXABLE to go live.
export const metadata: Metadata = SITE_INDEXABLE
  ? {}
  : { robots: { index: false, follow: false } };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
