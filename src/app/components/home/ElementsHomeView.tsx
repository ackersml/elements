"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
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
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { HeroAudioGate } from "./HeroAudioGate";
import { useFadeUp } from "./useFadeUp";

function QuickBuy({ slug }: { slug: string }) {
  const add = useCartStore((s) => s.add);
  const currency = useCartStore((s) => s.currency);
  const p = getProductBySlug(slug);
  if (!p) return null;
  return (
    <button
      type="button"
      onClick={() => add(slug, 1)}
      className="btn-pill btn-ghost !min-h-10 whitespace-nowrap !px-4 text-xs"
    >
      Quick buy · {formatProductDisplay(p.priceCents, currency)}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  rule = true,
  center = false,
  eyebrowAccent = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  rule?: boolean;
  center?: boolean;
  eyebrowAccent?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow",
            rule && "eyebrow-rule",
            eyebrowAccent && "!text-[color:var(--accent-c)]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function HomePageFooter() {
  const t = useTranslations("mag");
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const shopLinks: { label: string; href: string }[] = [
    { label: tn("shopBeginner"), href: "/shop?collection=beginner" },
    { label: tn("shopExtended"), href: "/shop?collection=extended" },
    { label: tn("shopRare"), href: "/shop?collection=rare" },
    { label: tn("shopBundles"), href: "/shop?collection=bundles" },
    { label: tn("shopAccessories"), href: "/shop?collection=accessories" },
  ];

  const readLinks: { label: string; href: string }[] = [
    { label: tn("journal"), href: "/journal" },
    { label: tn("aboutHandpans"), href: "/journal" },
    { label: tn("learn"), href: "/handpan-scales" },
    { label: tn("showrooms"), href: "/showrooms" },
  ];

  const legalLinks: { label: string; href: string | null }[] = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: null },
    { label: tf("shipping"), href: "/shipping" },
    { label: tf("returns"), href: "/returns" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container-x grid grid-cols-2 gap-10 py-14 text-sm md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-lg tracking-[0.3em]">ELEMENTS</p>
          <p className="mt-3 max-w-xs text-muted-foreground">
            {t("footerBrandLine")}
          </p>
        </div>
        <div>
          <p className="smallcaps text-muted-foreground">{t("footerColShop")}</p>
          <ul className="mt-4 space-y-2">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[color:var(--accent-c)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="smallcaps text-muted-foreground">{t("footerColRead")}</p>
          <ul className="mt-4 space-y-2">
            {readLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-[color:var(--accent-c)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="smallcaps text-muted-foreground">{t("footerColLegal")}</p>
          <ul className="mt-4 space-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                {l.href == null ? (
                  <span className="text-muted-foreground">{l.label}</span>
                ) : (
                  <Link href={l.href} className="hover:text-[color:var(--accent-c)]">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} Elements. {t("footerSlow")}
        </p>
        <p>{t("footerCities")}</p>
      </div>
    </footer>
  );
}

export function ElementsHomeView() {
  useFadeUp();
  const t = useTranslations("hero");
  const tm = useTranslations("mag");
  const currency = useCartStore((s) => s.currency);
  const id = useId();
  const beginners = getProductsByTag("beginner");
  const rarities = getProductsByCollection("rare");
  const bundles = getProductsByCollection("bundles");
  const cases = getProductsByTag("accessory");
  const findYourSound = getProducts().slice(0, 3);
  const instrumentMonth = getProducts().find((p) => p.slug === "copper-veil-d-kurd-12");

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

  const [newsEmail, setNewsEmail] = useState("");
  const [newsDone, setNewsDone] = useState(false);

  return (
    <div className="relative bg-background text-foreground">
      <div className="grain-fixed" aria-hidden />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/images/handpan-lifestyle-field.png"
          alt=""
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 hero-fade" aria-hidden />
        <div className="grain" aria-hidden />
        <SiteHeader variant="overlay" />
        <div className="relative container-x pb-20 pt-40 md:pb-32">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-rule">{t("eyebrow")}</p>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[5.25rem]">
              {t("titleLine1")}
              <br />
              <span className="bronze-text">{t("titleItalic")}</span>
            </h1>
            <p className="mt-7 max-w-xl text-base text-foreground/85 md:text-lg">{t("sub")}</p>
            <p className="mt-4 max-w-lg text-sm italic text-muted-foreground md:text-base">
              {tm("heroKicker")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn-pill btn-primary">
                {tm("ctaJourney")} <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/shop?collection=beginner" className="btn-pill btn-ghost">
                {tm("ctaInStock")}
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/shop" className="link-arrow">
                {t("ctaShop")} <ArrowRight size={14} aria-hidden />
              </Link>
              <a href="#how-order" className="link-arrow">
                {t("ctaLearn")} <ArrowRight size={14} aria-hidden />
              </a>
            </div>
            <HeroAudioGate />
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-secondary/60">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground">{tm("stripLabel")}.</span>
            &nbsp;{tm("stripDetail")}
          </p>
          <Link href="/shop?collection=beginner" className="link-arrow">
            {tm("stripCta")} <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>

      <section className="py-24 md:py-32" aria-labelledby={`${id}-mag-cat`}>
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("categoriesEyebrow")}
            title={<span id={`${id}-mag-cat`}>{tm("categoriesTitle")}</span>}
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                className="fade-up group relative block overflow-hidden rounded-2xl border border-border bg-transparent"
              >
                <ProductPhoto
                  src={tile.image}
                  alt=""
                  aspect="3/4"
                  variant="tile"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  frameClassName="!rounded-none !border-0 aspect-[3/4] lg:aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-display text-lg md:text-2xl">{tile.title}</h3>
                  <span className="smallcaps mt-2 inline-flex items-center gap-2 text-[color:var(--accent-c)]">
                    {tm("seeMore")} <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby={`${id}-fys`}
        className="border-y border-border bg-card/40 py-24 md:py-32"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("findSoundEyebrow")}
            title={<span id={`${id}-fys`}>Find your sound</span>}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {findYourSound.map((p) => (
              <article key={p.id} className="fade-up">
                <Link href={`/shop/${p.slug}`} className="group block">
                  <ProductPhoto
                    src={p.heroImageUrl}
                    alt=""
                    aspect="4/3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-lg group-hover:text-[color:var(--accent-c)]">
                        {p.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{p.scale}</p>
                    </div>
                    <QuickBuy slug={p.slug} />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" aria-labelledby={`${id}-bh`} className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("beginnerEyebrow")}
            title={<span id={`${id}-bh`}>Beginner handpans</span>}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {beginners.map((p) => (
              <article key={p.id} className="fade-up">
                <Link href={`/shop/${p.slug}`} className="group block">
                  <ProductPhoto
                    src={p.images[0] ?? p.heroImageUrl}
                    alt={p.title}
                    aspect="square"
                    sizes="33vw"
                    className="group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-lg group-hover:text-[color:var(--accent-c)]">
                        {p.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{p.scale}</p>
                    </div>
                    <QuickBuy slug={p.slug} />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Trust" className="border-y border-border bg-secondary/60 py-12 md:py-16">
        <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "30-day return window",
            "Insured worldwide shipping",
            "Tuning guarantee & voice check",
            "Dedicated human support",
          ].map((line) => (
            <div key={line} className="border-l-2 border-[color:var(--accent-c)] pl-5">
              <p className="smallcaps text-muted-foreground">{tm("trustPromiseLabel")}</p>
              <p className="mt-2 text-base md:text-lg">{line}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby={`${id}-warranty`} className="py-24 md:py-32">
        <div className="container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule !text-[color:var(--accent-c)]">{tm("warrantyEyebrow")}</p>
          <h2 id={`${id}-warranty`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
            {tm("warrantyTitle")}
          </h2>
          <p className="mt-6 text-foreground/80">{tm("warrantyBody")}</p>
          <div className="mt-9">
            <a href="#how-order" className="btn-pill btn-primary">
              {tm("warrantyCta")} <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {instrumentMonth && (
        <section aria-labelledby={`${id}-iotm`} className="border-y border-border bg-card/40 py-24 md:py-32">
          <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <ProductPhoto
              src={instrumentMonth.heroImageUrl}
              alt={instrumentMonth.title}
              aspect="square"
              frameClassName="fade-up lg:aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="fade-up max-w-lg">
              <p className="eyebrow eyebrow-rule">Instrument of the month</p>
              <h2 id={`${id}-iotm`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                {instrumentMonth.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {instrumentMonth.scale} · {instrumentMonth.noteCount} notes
              </p>
              <p className="mt-6 text-foreground/85">{instrumentMonth.description}</p>
              <div className="mt-8">
                <Link href={`/shop/${instrumentMonth.slug}`} className="link-arrow">
                  Open details <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby={`${id}-voices`} className="py-20 md:py-28">
        <div className="container-x">
          <p id={`${id}-voices`} className="smallcaps text-muted-foreground">
            Customer voices · aggregate 4.9 / 5
          </p>
          <div className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <blockquote className="fade-up lg:col-span-7">
              <p className="font-display text-2xl leading-snug md:text-4xl">
                “Finally a buying path that respects how fragile these decisions feel.”
              </p>
            </blockquote>
            <blockquote className="fade-up lg:col-span-5">
              <p className="text-base italic text-muted-foreground md:text-lg">
                “Shipping updates matched what happened at the carrier.”
              </p>
            </blockquote>
          </div>
        </div>
        <div className="marquee mt-16 hidden border-y border-border py-5 md:block">
          <div className="marquee-track smallcaps text-muted-foreground">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-16">
                <span>Presence over persuasion</span>
                <span>·</span>
                <span>Tuning notes over upsell</span>
                <span>·</span>
                <span>Slow commerce</span>
                <span>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-rar`} className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("raritiesEyebrow")}
            title={<span id={`${id}-rar`}>Rarities</span>}
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {rarities.map((r) => (
              <article key={r.id} className="fade-up group">
                <Link href={`/shop/${r.slug}`} className="block">
                  <ProductPhoto
                    src={r.heroImageUrl}
                    alt={r.title}
                    aspect="21/9"
                    sizes="50vw"
                    className="group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-xl group-hover:text-[color:var(--accent-c)]">
                      {r.title}
                    </span>
                    <p className="text-xs text-muted-foreground">{r.scale}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-bd`} className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("bundlesEyebrow")}
            title={<span id={`${id}-bd`}>Bundle offers</span>}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {bundles.map((b) => (
              <div
                key={b.id}
                className="fade-up rounded-2xl border border-border bg-background/40 p-8 md:p-10"
              >
                <h3 className="font-display text-2xl md:text-3xl">{b.title}</h3>
                <p className="mt-4 text-foreground/80">{b.description}</p>
                <div className="mt-8">
                  <QuickBuy slug={b.slug} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-cs`} className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("casesEyebrow")}
            title={<span id={`${id}-cs`}>Cases & bags</span>}
          />
          <div className="mb-10 flex flex-wrap gap-2">
            {["Graphite", "Ochre", "Slate", "Umber"].map((s) => (
              <span
                key={s}
                className="smallcaps rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cases.map((p) => (
              <article key={p.id} className="fade-up group">
                <Link href={`/shop/${p.slug}`} className="block">
                  <ProductPhoto
                    src={p.heroImageUrl}
                    alt={p.title}
                    aspect="video"
                    sizes="50vw"
                    className="group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg group-hover:text-[color:var(--accent-c)]">
                      {p.title}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {p.scale} · {formatProductDisplay(p.priceCents, currency)}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-jd`} className="py-24 md:py-32">
        <div className="container-x">
          <div className="fade-up rounded-2xl border border-[color:var(--accent-c)]/30 bg-secondary/40 p-8 md:p-14">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="eyebrow eyebrow-rule">{tm("newsletterEyebrowAlt")}</p>
                <h2 id={`${id}-jd`} className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                  Journal dispatch
                </h2>
                <p className="mt-5 max-w-md text-foreground/80">{tm("newsletterBodyAlt")}</p>
                <Link href="/journal" className="link-arrow mt-5 inline-flex">
                  Open the Journal page <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
              <form
                className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:mt-12"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsEmail) setNewsDone(true);
                }}
              >
                <label htmlFor="news-email" className="sr-only">
                  Email
                </label>
                <input
                  id="news-email"
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="min-h-12 flex-1 rounded-full border border-border bg-background/60 px-5 text-sm outline-none focus:border-[color:var(--accent-c)]"
                />
                <button type="submit" className="btn-pill btn-primary">
                  {newsDone ? "Subscribed" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="how-order" aria-labelledby={`${id}-bg`} className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id={`${id}-bg`}>Buying guide</span>} eyebrow="No rush tactics" />
          </div>
          <div className="space-y-6 text-foreground/85 lg:col-span-7">
            <p>{tm("buyingGuideEssence")}</p>
            <div className="grid gap-6 pt-2 sm:grid-cols-3">
              {[tm("buyingStep1"), tm("buyingStep2"), tm("buyingStep3")].map((s, i) => (
                <div key={s} className="border-l-2 border-[color:var(--accent-c)] pl-4">
                  <p className="smallcaps text-[color:var(--accent-c)]">
                    {tm("buyingStepLabel", { step: i + 1 })}
                  </p>
                  <p className="mt-2">{s}</p>
                </div>
              ))}
            </div>
            <Link href="/handpan-scales" className="link-arrow mt-2 inline-flex">
              Explore scales interactively <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-lr`} className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("listeningEyebrow")}
            title={<span id={`${id}-lr`}>Listening room</span>}
          />
          <div className="grid aspect-[16/7] place-items-center rounded-2xl border border-border bg-card px-6 text-center">
            <div>
              <p className="smallcaps text-[color:var(--accent-c)]">{tm("listeningPlaceholderLine")}</p>
              <p className="mx-auto mt-3 max-w-md font-display text-xl md:text-2xl">
                {tm("listeningPlaceholderTitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-sh`} className="border-y border-border bg-card/40 py-24 md:py-32">
        <div className="container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule">{tm("showroomsHomeEyebrow")}</p>
          <h2 id={`${id}-sh`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
            Showrooms
          </h2>
          <p className="mt-6 text-foreground/80">{tm("showroomsHomeBody")}</p>
          <Link href="/showrooms" className="link-arrow mt-8 inline-flex">
            Showrooms detail <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      <HomePageFooter />
    </div>
  );
}
