"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { usePathname } from "@/i18n/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <>
      {!isHome ? <SiteHeader /> : null}
      <main className={isHome ? undefined : "min-h-screen"}>{children}</main>
      {!isHome ? <SiteFooter /> : null}
    </>
  );
}
