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
    <article className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
      <Link
        href="/"
        className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
      >
        Home
      </Link>
      <h1 className="mt-8 font-display text-4xl tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
        {children}
      </div>
    </article>
  );
}
