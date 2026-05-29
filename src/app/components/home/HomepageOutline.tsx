"use client";

import { cn } from "@/lib/utils";

type OutlineSection = {
  id: string;
  index: number;
  label: string;
  eyebrow?: string;
  layout: string;
  height: "screen" | "lg" | "md" | "sm";
  variant?: "default" | "strip" | "card" | "split" | "grid";
};

const sections: OutlineSection[] = [
  {
    id: "hero",
    index: 1,
    label: "Hero",
    eyebrow: "Handpan & sound healing",
    layout: "Full-viewport image · header overlay · headline · dual CTA · link",
    height: "screen",
    variant: "default",
  },
  {
    id: "strip",
    index: 2,
    label: "Info strip",
    layout: "Shipping / guarantee message · browse link",
    height: "sm",
    variant: "strip",
  },
  {
    id: "categories",
    index: 3,
    label: "Category tiles",
    eyebrow: "Explore by craft",
    layout: "4-column image tiles · Handpans · Extended · Cases · Rarities",
    height: "lg",
    variant: "grid",
  },
  {
    id: "find-sound",
    index: 4,
    label: "Find your sound",
    eyebrow: "Curated for first listens",
    layout: "3-column product cards · quick buy",
    height: "lg",
    variant: "grid",
  },
  {
    id: "beginner",
    index: 5,
    label: "Beginner collection",
    eyebrow: "Our handpicked instruments",
    layout: "Section blurb · 3-column product grid · element lines",
    height: "lg",
    variant: "grid",
  },
  {
    id: "why",
    index: 6,
    label: "Why choose Elements",
    layout: "4 value props · left border accent",
    height: "md",
    variant: "default",
  },
  {
    id: "trust",
    index: 7,
    label: "Trust strip",
    layout: "4 columns · returns · shipping · tuning · support",
    height: "sm",
    variant: "strip",
  },
  {
    id: "warranty",
    index: 8,
    label: "Warranty",
    eyebrow: "Care after delivery",
    layout: "Centered CTA block",
    height: "lg",
    variant: "card",
  },
  {
    id: "iotm",
    index: 9,
    label: "Instrument of the month",
    layout: "50/50 split · large photo · copy · details link",
    height: "lg",
    variant: "split",
  },
  {
    id: "voices",
    index: 10,
    label: "Customer voices",
    layout: "2 blockquotes · optional marquee ticker",
    height: "md",
    variant: "default",
  },
  {
    id: "rarities",
    index: 11,
    label: "Rarities",
    eyebrow: "One-off builds",
    layout: "2-column wide 21:9 product cards",
    height: "md",
    variant: "grid",
  },
  {
    id: "bundles",
    index: 12,
    label: "Bundle offers",
    eyebrow: "Hand-paired kits",
    layout: "2 bordered offer cards · quick buy",
    height: "lg",
    variant: "card",
  },
  {
    id: "cases",
    index: 13,
    label: "Cases & bags",
    layout: "Color swatches · 2-column product grid",
    height: "lg",
    variant: "grid",
  },
  {
    id: "newsletter",
    index: 14,
    label: "Journal dispatch",
    layout: "Bordered panel · email form · journal link",
    height: "lg",
    variant: "card",
  },
  {
    id: "buying-guide",
    index: 15,
    label: "Buying guide",
    eyebrow: "No rush tactics",
    layout: "Essay + 3-step columns",
    height: "lg",
    variant: "split",
  },
  {
    id: "showrooms",
    index: 16,
    label: "Showrooms",
    layout: "Centered copy · detail link",
    height: "lg",
    variant: "card",
  },
  {
    id: "footer",
    index: 17,
    label: "Footer",
    layout: "Logo · 4 columns · shop · read · legal · copyright",
    height: "md",
    variant: "default",
  },
];

const heightClass: Record<OutlineSection["height"], string> = {
  screen: "min-h-[100svh]",
  lg: "min-h-[280px] md:min-h-[320px]",
  md: "min-h-[200px] md:min-h-[240px]",
  sm: "min-h-[72px] md:min-h-[80px]",
};

function PlaceholderBlocks({
  variant,
  className,
}: {
  variant: OutlineSection["variant"];
  className?: string;
}) {
  if (variant === "strip") {
    return (
      <div className={cn("flex items-center justify-between gap-4", className)}>
        <div className="h-3 w-2/3 max-w-md rounded-full bg-[color-mix(in_oklab,var(--sandstone)_25%,transparent)]" />
        <div className="h-3 w-24 rounded-full bg-[color-mix(in_oklab,var(--accent-c)_40%,transparent)]" />
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        <div className="aspect-[4/5] rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--sandstone)_22%,transparent)] bg-[color-mix(in_oklab,var(--forest-moss)_60%,transparent)]" />
        <div className="flex flex-col justify-center gap-3">
          <div className="h-2 w-16 rounded-full bg-[color-mix(in_oklab,var(--accent-c)_50%,transparent)]" />
          <div className="h-6 w-4/5 rounded-full bg-[color-mix(in_oklab,var(--sandstone)_20%,transparent)]" />
          <div className="h-3 w-full rounded-full bg-[color-mix(in_oklab,var(--sandstone)_12%,transparent)]" />
          <div className="h-3 w-5/6 rounded-full bg-[color-mix(in_oklab,var(--sandstone)_12%,transparent)]" />
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--sandstone)_18%,transparent)] bg-[color-mix(in_oklab,var(--forest-moss)_50%,transparent)] lg:aspect-[4/5]"
          />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "mx-auto max-w-2xl rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--accent-c)_35%,transparent)] bg-[color-mix(in_oklab,var(--forest-moss)_45%,transparent)] p-8 md:p-12",
          className,
        )}
      >
        <div className="mx-auto h-2 w-20 rounded-full bg-[color-mix(in_oklab,var(--accent-c)_45%,transparent)]" />
        <div className="mx-auto mt-6 h-7 w-3/4 rounded-full bg-[color-mix(in_oklab,var(--sandstone)_18%,transparent)]" />
        <div className="mx-auto mt-4 h-3 w-full max-w-md rounded-full bg-[color-mix(in_oklab,var(--sandstone)_10%,transparent)]" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="h-2 w-24 rounded-full bg-[color-mix(in_oklab,var(--accent-c)_45%,transparent)]" />
      <div className="h-8 w-4/5 max-w-lg rounded-full bg-[color-mix(in_oklab,var(--sandstone)_16%,transparent)]" />
      <div className="h-3 w-full max-w-md rounded-full bg-[color-mix(in_oklab,var(--sandstone)_10%,transparent)]" />
    </div>
  );
}

export function HomepageOutline() {
  return (
    <div className="relative bg-background text-foreground">
      <div className="grain-fixed opacity-[0.04]" aria-hidden />

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-x flex flex-col gap-2 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[color:var(--accent-c)]">21st.dev · planning wireframe</p>
            <h1 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              Elements homepage outline
            </h1>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Scroll map of <code className="text-foreground/80">ElementsHomeView</code>. Matches
            production section order; swap blocks before implementing layout changes.
          </p>
        </div>
      </header>

      <div className="container-x py-10">
        <ol className="space-y-4">
          {sections.map((section) => (
            <li
              key={section.id}
              id={section.id}
              className={cn(
                "scroll-mt-24 overflow-hidden rounded-2xl border border-border",
                heightClass[section.height],
              )}
            >
              <div className="flex items-stretch border-b border-border bg-secondary/40">
                <span className="flex w-12 shrink-0 items-center justify-center border-r border-border font-display text-lg text-[color:var(--accent-c)]">
                  {section.index}
                </span>
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-2 px-4 py-3">
                  <div>
                    <p className="font-display text-lg md:text-xl">{section.label}</p>
                    {section.eyebrow ? (
                      <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {section.eyebrow}
                      </p>
                    ) : null}
                  </div>
                  <p className="max-w-md text-right text-xs text-muted-foreground md:text-sm">
                    {section.layout}
                  </p>
                </div>
              </div>

              <div className="p-4 md:p-6">
                {section.id === "hero" ? (
                  <div className="relative min-h-[50vh] overflow-hidden rounded-xl border border-dashed border-[color-mix(in_oklab,var(--sandstone)_20%,transparent)]">
                    <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--pine-grove)_80%,#0a0f0a)]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--moss-mid)_30%,transparent)] to-transparent" />
                    <div className="relative flex h-10 items-center justify-between px-4 pt-4">
                      <div className="h-4 w-24 rounded bg-[color-mix(in_oklab,var(--sandstone)_25%,transparent)]" />
                      <div className="flex gap-2">
                        <div className="h-8 w-16 rounded-full border border-[color-mix(in_oklab,var(--sandstone)_20%,transparent)]" />
                        <div className="h-8 w-8 rounded-full border border-[color-mix(in_oklab,var(--sandstone)_20%,transparent)]" />
                      </div>
                    </div>
                    <div className="relative px-4 pb-8 pt-16 md:px-8">
                      <PlaceholderBlocks variant="default" />
                      <div className="mt-8 flex flex-wrap gap-2">
                        <div className="h-11 w-36 rounded-full bg-[color-mix(in_oklab,var(--sandstone)_35%,transparent)]" />
                        <div className="h-11 w-32 rounded-full border border-[color-mix(in_oklab,var(--sandstone)_25%,transparent)]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <PlaceholderBlocks variant={section.variant} />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
