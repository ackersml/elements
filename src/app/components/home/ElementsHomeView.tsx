"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/cart-store";
import {
  formatProductDisplay,
  getProductBySlug,
  getProducts,
  getProductsByCollection,
  getProductsByTag,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { HeroAudioGate } from "./HeroAudioGate";

function QuickBuy({ slug }: { slug: string }) {
  const add = useCartStore((s) => s.add);
  const currency = useCartStore((s) => s.currency);
  const p = getProductBySlug(slug);
  if (!p) return null;
  return (
    <button
      type="button"
      onClick={() => add(slug, 1)}
      className="mt-3 border border-primary/50 px-4 py-2 text-xs uppercase tracking-[0.14em] text-primary transition hover:bg-primary hover:text-primary-foreground"
    >
      Quick buy · {formatProductDisplay(p.priceCents, currency)}
    </button>
  );
}

export function ElementsHomeView() {
  const t = useTranslations("hero");
  const tm = useTranslations("mag");
  const id = useId();
  const beginners = getProductsByTag("beginner");
  const rarities = getProductsByCollection("rare");
  const bundles = getProductsByCollection("bundles");
  const cases = getProductsByTag("accessory");
  const findYourSound = getProducts().slice(0, 3);
  const instrumentMonth = getProducts().find(
    (p) => p.slug === "copper-veil-d-kurd-12"
  );

  const catHandpan = beginners[0] ?? getProducts()[0];
  const catTongue = getProductsByCollection("tongue-drums")[0];
  const catCase = cases[0];
  const catSound = getProductsByCollection("sound-healing")[0];

  const categoryTiles = [
    {
      key: "handpans",
      title: tm("catHandpans"),
      href: "/shop?collection=beginner",
      image: catHandpan?.heroImageUrl,
    },
    {
      key: "tongue",
      title: tm("catTongue"),
      href: "/shop?collection=tongue-drums",
      image: catTongue?.heroImageUrl,
    },
    {
      key: "cases",
      title: tm("catCases"),
      href: "/shop?collection=accessories",
      image: catCase?.heroImageUrl,
    },
    {
      key: "sound",
      title: tm("catSound"),
      href: "/shop?collection=sound-healing",
      image: catSound?.heroImageUrl,
    },
  ].filter((c): c is typeof c & { image: string } => Boolean(c.image));

  return (
    <div className="bg-background text-foreground">
      {/* 2 — Hero (photo lower half + tint, no 3D column) */}
      <section className="relative elements-grain overflow-hidden border-b border-border/50">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[200%] bg-cover bg-bottom bg-no-repeat opacity-[0.38] mix-blend-soft-light md:opacity-[0.44]"
            style={{
              backgroundImage: "url(/images/handpan-lifestyle-field.png)",
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] elements-brushed-dark opacity-[0.28] md:opacity-[0.22]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-background from-40% via-background/88 to-background/25 md:from-35% md:via-background/70 md:to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
          <div className="max-w-xl md:max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-primary" />
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 max-w-[14ch] font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-[5.5rem]">
              {t("titleLine1")}
              <br />
              <span className="text-gradient-bronze italic">{t("titleItalic")}</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("sub")}
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {tm("heroKicker")}
            </p>
            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/shop"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-primary bg-primary px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition motion-hover hover:bg-primary/90"
              >
                {tm("ctaJourney")}
              </Link>
              <Link
                href="/shop?collection=beginner"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border/90 bg-transparent px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition motion-hover hover:bg-secondary/45"
              >
                {tm("ctaInStock")}
              </Link>
              <Link
                href="/shop"
                className="inline-flex min-h-[48px] items-center justify-center border-b-2 border-transparent pb-1 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition motion-hover hover:border-primary hover:text-foreground sm:px-2"
              >
                {t("ctaShop")}
              </Link>
              <a
                href="#how-order"
                className="inline-flex min-h-[48px] items-center justify-center text-center text-xs uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline sm:ml-1"
              >
                {t("ctaLearn")}
              </a>
            </div>
            <HeroAudioGate />
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-secondary/20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {tm("stripLabel")}
          </p>
          <Link
            href="/shop?collection=beginner"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground underline-offset-4 transition hover:text-primary hover:underline"
          >
            {tm("stripCta")}
          </Link>
        </div>
      </section>

      <section
        className="border-b border-border/50 bg-secondary/15"
        aria-labelledby={`${id}-lifestyle`}
      >
        <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-primary" />
            {tm("lifestyleEyebrow")}
          </p>
          <h2
            id={`${id}-lifestyle`}
            className="mt-4 max-w-2xl font-display text-3xl tracking-tight text-foreground md:text-4xl"
          >
            {tm("lifestyleTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {tm("lifestyleBody")}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5">
            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="m-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border/40 bg-card/20">
                <Image
                  src="/images/handpan-lifestyle-field.png"
                  alt={tm("lifestyleAltField")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-background/10"
                  aria-hidden
                />
              </div>
            </motion.figure>
            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="m-0 sm:mt-0 md:mt-12"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border/40 bg-card/20">
                <Image
                  src="/images/handpan-lifestyle-playing.png"
                  alt={tm("lifestyleAltPlaying")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-background/10"
                  aria-hidden
                />
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 py-24 md:py-32" aria-labelledby={`${id}-mag-cat`}>
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-primary" />
            {tm("categoriesEyebrow")}
          </p>
          <h2
            id={`${id}-mag-cat`}
            className="mt-4 max-w-3xl font-display text-3xl tracking-tight text-foreground md:text-5xl"
          >
            {tm("categoriesTitle")}
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {categoryTiles.map((tile, i) => (
              <motion.div
                key={tile.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={tile.href}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-border/45 bg-card/30 md:aspect-[4/5]"
                >
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    className="object-cover transition duration-[650ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-95 md:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 md:p-6">
                    <span className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                      {tile.title}
                    </span>
                    <span className="mt-3 inline-flex w-max border-b border-primary/70 pb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary transition group-hover:border-primary group-hover:text-foreground">
                      {tm("seeMore")}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Find your sound */}
      <section className="border-b border-border/40 py-24 md:py-32" aria-labelledby={`${id}-fys`}>
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2
            id={`${id}-fys`}
            className="font-display text-3xl tracking-tight text-foreground md:text-4xl"
          >
            Find your sound
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {findYourSound.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "group border border-border/60 bg-card/30",
                  i === 1 && "lg:mt-8"
                )}
              >
                <Link href={`/shop/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.heroImageUrl}
                      alt=""
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-xl text-foreground">{p.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{p.scale}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Beginner grid */}
      <section className="border-b border-border/40 py-24 md:py-28" id="beginner">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl tracking-tight md:max-w-md md:text-4xl">
            Beginner handpans
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {beginners.map((p, i) => (
              <div
                key={p.id}
                className={cn("border border-border/50", i % 3 === 2 && "lg:translate-y-6")}
              >
                <div className="group relative aspect-square overflow-hidden">
                  <Image
                    src={p.images[0] ?? p.heroImageUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Image
                    src={p.images[1] ?? p.images[0] ?? p.heroImageUrl}
                    alt=""
                    fill
                    className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-1 p-4">
                  <Link
                    href={`/shop/${p.slug}`}
                    className="font-display text-lg text-foreground hover:text-primary"
                  >
                    {p.title}
                  </Link>
                  <QuickBuy slug={p.slug} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Trust row (hairline, not badge circles) */}
      <section className="border-b border-border/40 py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          {[
            "30-day return window",
            "Insured worldwide shipping",
            "Tuning guarantee & voice check",
            "Dedicated human support",
          ].map((line) => (
            <p
              key={line}
              className="border-l border-primary/30 pl-4 font-medium tracking-tight text-foreground/90"
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-border/40 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">{tm("warrantyEyebrow")}</p>
          <h2 className="mt-5 font-display text-3xl tracking-tight text-foreground md:text-5xl">
            {tm("warrantyTitle")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {tm("warrantyBody")}
          </p>
          <Link
            href="#how-order"
            className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full border border-primary bg-primary px-10 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition motion-hover hover:bg-primary/90"
          >
            {tm("warrantyCta")}
          </Link>
        </div>
      </section>

      {/* 6 — Instrument of the month */}
      {instrumentMonth && (
        <section className="border-b border-border/40 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:grid-cols-2 md:items-center md:px-8">
            <div className="relative aspect-square w-full overflow-hidden md:aspect-[4/5]">
              <Image
                src={instrumentMonth.heroImageUrl}
                alt={instrumentMonth.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Instrument of the month</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground">
                {instrumentMonth.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {instrumentMonth.description}
              </p>
              <Link
                href={`/shop/${instrumentMonth.slug}`}
                className="mt-6 inline-block border-b border-foreground/50 pb-0.5 text-sm uppercase tracking-[0.12em] text-foreground"
              >
                Open details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7 — Customer voices (pull quotes) */}
      <section className="border-b border-border/40 py-16 overflow-hidden" id="journal">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Customer voices · aggregate 4.9 / 5
          </p>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-16">
            <blockquote className="max-w-xl font-display text-2xl italic leading-snug text-foreground md:text-4xl">
              “Finally a buying path that respects how fragile these decisions feel.”
            </blockquote>
            <blockquote className="max-w-xl font-display text-xl italic leading-snug text-muted-foreground md:text-3xl">
              “Shipping updates matched what happened at the carrier.”
            </blockquote>
          </div>
          <div className="mt-8 hidden overflow-hidden md:block">
            <div className="flex w-max gap-16 animate-marquee whitespace-nowrap">
              <span className="font-display text-2xl italic text-foreground/90">
                Presence over persuasion · tuning notes over upsell · slow commerce
              </span>
              <span className="font-display text-2xl italic text-foreground/90" aria-hidden>
                Presence over persuasion · tuning notes over upsell · slow commerce
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Rarities */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Rarities</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {rarities.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="group block border border-border/40">
                <div className="relative aspect-[21/9]">
                  <Image src={p.heroImageUrl} alt={p.title} fill className="object-cover" />
                </div>
                <div className="flex justify-between p-4">
                  <span className="font-display text-xl">{p.title}</span>
                  <span className="text-sm text-muted-foreground">{p.scale}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Bundles */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Bundle offers</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {bundles.map((p) => (
              <div key={p.id} className="border border-border/50 p-6">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <QuickBuy slug={p.slug} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Cases & bags */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Cases & bags</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Graphite", "Ochre", "Slate", "Umber"].map((c) => (
              <span
                key={c}
                className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {cases.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="block border border-border/40">
                <div className="relative aspect-video">
                  <Image src={p.heroImageUrl} alt={p.title} fill className="object-cover" />
                </div>
                <p className="p-4 font-display text-lg">{p.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Newsletter inline */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="border border-border/50 bg-secondary/20 p-8 md:p-12">
            <h2 className="font-display text-3xl text-foreground">Journal dispatch</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Scale guides, recording notes, and builder interviews — inline signup only (no modal).
            </p>
            <form className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="news-email" className="sr-only">
                Email
              </label>
              <input
                id="news-email"
                type="email"
                placeholder="you@studio.com"
                className="flex-1 border border-border bg-background px-4 py-3 text-sm text-foreground"
              />
              <button
                type="submit"
                className="border border-primary bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 13 — Buying guide */}
      <section className="border-b border-border/40 py-20" id="how-order">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Buying guide</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Long-form guide lives as a journal route later — here is the essence: choose scale by voice you already hum,
            confirm logistics tier, then lock build slot. No rush tactics.
          </p>
          <Link href="/handpan-scales" className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-primary">
            Explore scales interactively →
          </Link>
        </div>
      </section>

      {/* 14 — Music block */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Listening room</h2>
          <p className="mt-4 text-muted-foreground">
            Album placeholder — embed Bandcamp or Spotify when rights allow.
          </p>
        </div>
      </section>

      {/* 15 — Showrooms anchor */}
      <section className="py-20" id="showrooms">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="font-display text-3xl">Showrooms</h2>
          <p className="mt-4 text-muted-foreground">
            Berlin · Bali · Portland — request an audition slot via contact once calendar opens.
          </p>
        </div>
      </section>

    </div>
  );
}
