import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default async function DesignSystemPage() {
  const t = await getTranslations("designSystem");

  return (
    <div className="bg-card/30 py-20">
      <div className="mx-auto max-w-4xl px-4 text-foreground md:px-8">
        <h1 className="font-display text-4xl text-foreground">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("intro")}</p>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Type
          </h2>
          <p className="font-display text-5xl tracking-tight">
            Display · Elements
          </p>
          <p className="max-w-prose font-body text-base leading-relaxed text-muted-foreground">
            Body copy uses relaxed leading for editorial rhythm. Muted tone for
            secondary sentences.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="border border-primary bg-primary px-6 py-3 text-xs uppercase tracking-[0.14em] text-primary-foreground"
            >
              Primary
            </button>
            <button
              type="button"
              className="border border-border px-6 py-3 text-xs uppercase tracking-[0.14em] text-foreground"
            >
              Outline
            </button>
            <span className="border-b-2 border-primary pb-1 text-sm uppercase tracking-[0.14em]">
              Underline CTA
            </span>
          </div>
        </section>

        <section className="mt-12 border border-border/50 bg-background p-8 elements-grain">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Grain panel
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            `.elements-grain` overlay at 4% noise on backgrounds.
          </p>
        </section>
      </div>
    </div>
  );
}
