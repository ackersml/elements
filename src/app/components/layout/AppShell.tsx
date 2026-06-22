"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { PageTransition } from "./PageTransition";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { usePathname } from "@/i18n/navigation";

/** Routes whose page components render their own overlay header (via InfoPage or ElementsHomeView). */
const ROUTES_WITH_OWN_HEADER = new Set([
  "/",
  "",
  "/homepage-outline",
  "/journal",
  "/contact",
  "/showrooms",
  "/shipping",
  "/returns",
  "/privacy",
  "/products",
  "/services",
  "/about",
  "/shop",
]);

/** Routes whose page components render their own footer. */
const ROUTES_WITH_OWN_FOOTER = new Set([
  "/",
  "",
  "/homepage-outline",
  "/contact",
  "/products",
  "/services",
  "/about",
  "/showrooms",
  "/shop",
]);

/** Path prefixes whose page components render their own header and footer. */
const PREFIXES_WITH_OWN_CHROME = ["/collections/"];

function rendersOwnChrome(pathname: string): boolean {
  return PREFIXES_WITH_OWN_CHROME.some((prefix) => pathname.startsWith(prefix));
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ownChrome = rendersOwnChrome(pathname);
  const hasOwnHeader = ownChrome || ROUTES_WITH_OWN_HEADER.has(pathname);
  const hasOwnFooter = ownChrome || ROUTES_WITH_OWN_FOOTER.has(pathname);

  return (
    <SmoothScrollProvider>
      {!hasOwnHeader ? <SiteHeader /> : null}
      <main className={hasOwnHeader ? undefined : "min-h-screen"}>
        <PageTransition>{children}</PageTransition>
      </main>
      {!hasOwnFooter ? <SiteFooter /> : null}
    </SmoothScrollProvider>
  );
}
