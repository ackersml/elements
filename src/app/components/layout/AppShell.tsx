"use client";

import type { ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { PageTransition } from "./PageTransition";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <PageTransition>
        <main className="min-h-screen">{children}</main>
      </PageTransition>
      <SiteFooter />
    </>
  );
}
