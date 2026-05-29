"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
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
]);

/** Routes whose page components render their own footer. */
const ROUTES_WITH_OWN_FOOTER = new Set(["/", "", "/homepage-outline"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasOwnHeader = ROUTES_WITH_OWN_HEADER.has(pathname);
  const hasOwnFooter = ROUTES_WITH_OWN_FOOTER.has(pathname);

  return (
    <>
      {!hasOwnHeader ? <SiteHeader /> : null}
      <main className={hasOwnHeader ? undefined : "min-h-screen"}>{children}</main>
      {!hasOwnFooter ? <SiteFooter /> : null}
    </>
  );
}
