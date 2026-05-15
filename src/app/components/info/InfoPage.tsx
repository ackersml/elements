import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

export function InfoPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="container-x max-w-3xl py-20 md:py-28">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
      >
        Home
      </Link>
      <h1 className="mt-8 font-display text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
        {children}
      </div>
    </main>
  );
}
