import {
  brandColors,
  brandElements,
  brandLockup,
  brandMission,
  brandTaglines,
  brandVision,
} from "@/lib/brand/elements-brand";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "Pine Grove", hex: brandColors.pineGrove },
  { name: "Forest Moss", hex: brandColors.forestMoss },
  { name: "Cedar Bark", hex: brandColors.cedarBark },
  { name: "Sandstone", hex: brandColors.sandstone },
  { name: "Deep Soil", hex: brandColors.deepSoil },
  { name: "Moss mid", hex: brandColors.mossMid },
] as const;

export default async function DesignSystemPage() {
  const t = await getTranslations("designSystem");

  return (
    <div className="bg-card/30 py-20">
      <div className="container-x max-w-4xl text-foreground">
        <h1 className="font-display text-4xl text-foreground">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("intro")}</p>
        <p className="mt-2 smallcaps text-[color:var(--accent-c)]">
          {brandLockup.wordmark} · {brandLockup.subtitle}
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("colors")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {swatches.map((s) => (
              <div
                key={s.name}
                className="overflow-hidden rounded-xl border border-border"
              >
                <div className="h-20" style={{ background: s.hex }} />
                <div className="bg-background/40 px-3 py-2 text-xs">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-muted-foreground">{s.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("type")}
          </h2>
          <p className="font-display text-5xl tracking-tight">Display · Cinzel</p>
          <p className="max-w-prose font-body text-base leading-relaxed text-muted-foreground">
            Body · DM Sans — {brandVision}
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("taglines")}
          </h2>
          <p className="font-display text-xl">{brandTaglines.category}</p>
          <p className="smallcaps text-[color:var(--accent-c)]">
            {brandTaglines.primary}
          </p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            {brandMission.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("elements")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {brandElements.map((el) => (
              <div
                key={el.id}
                className="rounded-xl border border-border bg-background/30 p-4"
              >
                <p className="font-display text-lg">{el.name}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {el.keywords.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="btn-pill btn-primary text-xs uppercase tracking-[0.14em]"
            >
              Primary
            </button>
            <button
              type="button"
              className="btn-pill btn-ghost text-xs uppercase tracking-[0.14em]"
            >
              Outline
            </button>
            <span className="link-arrow border-b-2 border-[color:var(--accent-c)] pb-1 text-sm">
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
