"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { ProductCard } from "@/app/components/shop/ProductCard";
import {
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";
import {
  getCollectionShowcaseProducts,
  getProductsByCollection,
  getProductsByTag,
} from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";
import { PageHero } from "./PageHero";

export function ProductsView() {
  const beginners = getCollectionShowcaseProducts();
  const extended = getProductsByCollection("extended");
  const rare = getProductsByCollection("rare");
  const bundles = getProductsByCollection("bundles");
  const accessories = getProductsByTag("accessory");

  const groups = [
    {
      key: "beginner",
      eyebrow: "Approachable scales, honest builds",
      title: "Beginner handpans",
      blurb:
        "Balanced, forgiving instruments for first listens and daily practice.",
      products: beginners,
      aspect: "square" as const,
      collectionScene: true,
    },
    {
      key: "extended",
      eyebrow: "More range, more voice",
      title: "Extended scales",
      blurb:
        "Additional bottom and top notes for players ready to expand their phrasing.",
      products: extended,
      aspect: "4/3" as const,
    },
    {
      key: "rare",
      eyebrow: "One-off builds & double-stacks",
      title: "Rarities",
      blurb: "Limited voicings and special builds, allocated as they leave the bench.",
      products: rare,
      aspect: "21/9" as const,
    },
    {
      key: "accessories",
      eyebrow: "Travel-ready, built to last",
      title: "Cases & accessories",
      blurb: "Protection and care gear matched to each instrument.",
      products: accessories,
      aspect: "video" as const,
    },
  ].filter((g) => g.products.length > 0);

  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      <PageHero
        eyebrow="The instruments"
        title="Handpans crafted for"
        titleAccent="sound & vibration"
        sub="Each instrument is hand-allocated by our luthiers: rich, resonant tones with balanced playability for meditative flow and musical depth."
        kicker={"Hand-allocated \u00B7 Insured worldwide"}
        primaryCta={{ label: "Shop all instruments", href: "/shop" }}
        secondaryCta={{ label: "Find your sound", href: "/contact" }}
        backgroundImage="/images/handpan-lifestyle-13.jpg"
        floatImage="/images/collection/handpan-fire.png"
        floatAlt="Elements handpan"
      />

      {groups.map((group, index) => {
        const tinted = index % 2 === 1;
        return (
          <section
            key={group.key}
            className={
              tinted
                ? "section-band-accent section-padding md:py-32"
                : "relative overflow-hidden bg-white section-padding md:py-32"
            }
          >
            {!tinted && (
              <SectionBackdrop src="/images/handpan-lifestyle-11.jpg" opacity={0.05} />
            )}
            <div className="relative container-x">
              <MotionReveal className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
                <div className="max-w-2xl">
                  <p className="eyebrow eyebrow-rule">{group.eyebrow}</p>
                  <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    {group.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground">{group.blurb}</p>
                </div>
                <Link href={shopCollectionHref(group.key)} className="link-arrow">
                  View collection <ArrowRight size={14} aria-hidden />
                </Link>
              </MotionReveal>

              <MotionStagger
                className={
                  group.aspect === "21/9"
                    ? "grid grid-cols-1 gap-4 lg:grid-cols-2"
                    : group.aspect === "video"
                      ? "grid grid-cols-1 gap-6 md:grid-cols-2"
                      : "product-grid"
                }
                staggerDelay={0.08}
              >
                {group.products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    aspect={group.aspect}
                    showElement={group.key === "beginner"}
                    collectionScene={group.collectionScene}
                  />
                ))}
              </MotionStagger>
            </div>
          </section>
        );
      })}

      {bundles.length > 0 && (
        <section className="border-y border-border bg-white section-padding md:py-32">
          <div className="container-x">
            <MotionReveal className="mb-10 max-w-2xl md:mb-14">
              <p className="eyebrow eyebrow-rule">Hand-paired kits</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Bundle offers
              </h2>
            </MotionReveal>
            <MotionStagger
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              staggerDelay={0.14}
            >
              {bundles.map((b) => (
                <div
                  key={b.id}
                  className="rounded-lg border border-border bg-[color:var(--surface-muted)] p-8 md:p-10"
                >
                  <h3 className="font-display text-2xl md:text-3xl">{b.title}</h3>
                  <p className="mt-4 text-foreground/80">{b.description}</p>
                  <Link
                    href={`/shop/${b.slug}`}
                    className="link-arrow mt-8 inline-flex"
                  >
                    View bundle <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              ))}
            </MotionStagger>
          </div>
        </section>
      )}

      <section className="section-band-dark section-padding md:py-36">
        <MotionReveal className="container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]">
            Not sure where to start?
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
            Let us help you find your sound
          </h2>
          <p className="mt-6 text-[color:var(--sandstone)]/75">
            Tell us the rooms you play in and the music you love. We&apos;ll point
            you to the scale that fits.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-pill btn-primary">
              Shop all <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/contact" className="btn-pill btn-ghost-on-dark">
              Ask a luthier
            </Link>
          </div>
        </MotionReveal>
      </section>

      <SiteFooter />
    </div>
  );
}
