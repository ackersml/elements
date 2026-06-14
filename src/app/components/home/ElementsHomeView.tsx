"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";
import { ProductCard } from "@/app/components/shop/ProductCard";
import {
  getProducts,
  getProductsByCollection,
  getProductsByTag,
} from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { CustomerReviews } from "@/app/components/home/CustomerReviews";
import { HomeHero } from "@/app/components/home/HomeHero";
import { TrustStrip } from "@/app/components/home/TrustStrip";
import {
  MotionClipImage,
  MotionHeading,
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";

function SectionHeading({
  eyebrow,
  title,
  rule = true,
  center = false,
  eyebrowAccent = false,
  headingClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  rule?: boolean;
  center?: boolean;
  eyebrowAccent?: boolean;
  /** Optional override for bottom margin (e.g. tighter stacks between sections). */
  headingClassName?: string;
}) {
  const titleText = typeof title === "string" ? title : undefined;

  return (
    <MotionHeading
      eyebrow={eyebrow}
      title={titleText ?? title}
      center={center}
      className={cn(
        "mb-12 md:mb-16",
        headingClassName,
        center ? "mx-auto max-w-2xl" : "max-w-3xl"
      )}
      eyebrowClassName={cn(
        "eyebrow",
        rule && "eyebrow-rule",
        eyebrowAccent && "!text-[color:var(--accent-c)]"
      )}
      titleClassName="mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
    />
  );
}

function HomePageFooter() {
  const t = useTranslations("mag");
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const shopLinks: { label: string; href: string }[] = [
    { label: tn("shopBeginner"), href: shopCollectionHref("beginner") },
    { label: tn("shopExtended"), href: shopCollectionHref("extended") },
    { label: tn("shopRare"), href: shopCollectionHref("rare") },
    { label: tn("shopBundles"), href: shopCollectionHref("bundles") },
    { label: tn("shopAccessories"), href: shopCollectionHref("accessories") },
  ];

  const readLinks: { label: string; href: string }[] = [
    { label: tn("journal"), href: "/journal" },
    { label: tn("aboutHandpans"), href: "/journal" },
    { label: tn("showrooms"), href: "/showrooms" },
  ];

  const legalLinks: { label: string; href: string | null }[] = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: null },
    { label: tf("shipping"), href: "/shipping" },
    { label: tf("returns"), href: "/returns" },
  ];

  return (
    <footer className="section-band-dark">
      <div className="container-x grid grid-cols-2 gap-10 py-14 text-sm md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-lg tracking-[0.3em] text-white">ELEMENTS</p>
          <p className="mt-3 max-w-xs text-[color:var(--sandstone)]/70">
            {t("footerBrandLine")}
          </p>
        </div>
        <div>
          <p className="smallcaps text-[color:var(--sandstone)]/60">{t("footerColShop")}</p>
          <ul className="mt-4 space-y-2 text-[color:var(--sandstone)]/80">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[color:var(--bronze-accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="smallcaps text-[color:var(--sandstone)]/60">{t("footerColRead")}</p>
          <ul className="mt-4 space-y-2 text-[color:var(--sandstone)]/80">
            {readLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-[color:var(--bronze-accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="smallcaps text-[color:var(--sandstone)]/60">{t("footerColLegal")}</p>
          <ul className="mt-4 space-y-2 text-[color:var(--sandstone)]/80">
            {legalLinks.map((l) => (
              <li key={l.label}>
                {l.href == null ? (
                  <span className="text-[color:var(--sandstone)]/50">{l.label}</span>
                ) : (
                  <Link href={l.href} className="hover:text-[color:var(--bronze-accent)]">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-[color:var(--sandstone)]/50 sm:flex-row">
        <p>
          © {year} Elements. {t("footerSlow")}
        </p>
        <p>{t("footerCities")}</p>
      </div>
    </footer>
  );
}

export function ElementsHomeView() {
  const t = useTranslations("hero");
  const tm = useTranslations("mag");
  const tn = useTranslations("nav");
  const id = useId();
  const beginners = getProductsByTag("beginner");
  const rarities = getProductsByCollection("rare");
  const bundles = getProductsByCollection("bundles");
  const cases = getProductsByTag("accessory");
  const findYourSound = getProducts().slice(0, 3);
  const instrumentMonth = getProducts().find((p) => p.slug === "copper-veil-d-kurd-12");

  const catHandpan = beginners[0] ?? getProducts()[0];
  const catCase = cases[0];
  const catExtended =
    getProductsByCollection("extended")[0] ?? getProductsByCollection("rare")[0];

  const categoryTiles = [
    {
      key: "handpans",
      title: tm("catHandpans"),
      href: shopCollectionHref("beginner"),
      image: catHandpan?.heroImageUrl,
    },
    {
      key: "extended",
      title: tn("shopExtended"),
      href: shopCollectionHref("extended"),
      image: catExtended?.heroImageUrl,
    },
    {
      key: "cases",
      title: tm("catCases"),
      href: shopCollectionHref("accessories"),
      image: catCase?.heroImageUrl,
    },
    {
      key: "rarities",
      title: tn("shopRare"),
      href: shopCollectionHref("rare"),
      image: rarities[0]?.heroImageUrl,
    },
  ].filter((c): c is typeof c & { image: string } => Boolean(c.image));

  const [newsEmail, setNewsEmail] = useState("");
  const [newsDone, setNewsDone] = useState(false);

  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader />
      <HomeHero
        eyebrow={t("eyebrow")}
        titleLine1={t("titleLine1")}
        titleAccent={t("titleItalic")}
        sub={t("sub")}
        kicker={tm("heroKicker")}
        ctaPrimary={t("ctaPrimary")}
        ctaSecondary={t("ctaSecondary")}
        ctaLearn={t("ctaLearn")}
      />

      <TrustStrip />

      <MotionReveal>
        <div className="border-b border-border section-band-accent">
          <div className="container-x flex flex-col items-start justify-between gap-2 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{tm("stripLabel")}.</span>
              &nbsp;{tm("stripDetail")}
            </p>
            <Link href="/collections/beginner" className="link-arrow">
              {tm("stripCta")} <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </MotionReveal>

      {instrumentMonth && (
        <section aria-labelledby={`${id}-iotm`} className="border-b border-border bg-white section-padding md:py-36">
          <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionClipImage
              src={instrumentMonth.heroImageUrl}
              alt={instrumentMonth.title}
              className="aspect-square lg:aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <MotionReveal className="max-w-lg" delay={0.12}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow eyebrow-rule">Instrument of the month</p>
                <span className="rounded-full border border-[color:var(--sale-bg)]/30 bg-[color:var(--surface-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--sale-bg)]">
                  {tm("iotmLimitedStock")}
                </span>
              </div>
              <h2 id={`${id}-iotm`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                {instrumentMonth.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {instrumentMonth.scale} · {instrumentMonth.noteCount} notes
              </p>
              <p className="mt-6 text-foreground/85">{instrumentMonth.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={`/shop/${instrumentMonth.slug}`} className="link-arrow">
                  Open details <ArrowRight size={14} aria-hidden />
                </Link>
                <QuickBuyButton slug={instrumentMonth.slug} />
              </div>
            </MotionReveal>
          </div>
        </section>
      )}

      <section id="shop" aria-labelledby={`${id}-bh`} className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/handpan-lifestyle-11.jpg" opacity={0.08} />
        <div className="relative container-x">
          <SectionHeading
            eyebrow={tm("collectionEyebrow")}
            title={<span id={`${id}-bh`}>{tm("collectionTitle")}</span>}
            center
          />
          <p className="-mt-8 mb-10 max-w-2xl text-center text-muted-foreground mx-auto md:-mt-10">
            {tm("collectionBlurb")}
          </p>
          <p className="eyebrow mb-6">{tm("beginnerEyebrow")}</p>
          <h3 className="mb-8 font-display text-2xl md:text-3xl">Beginner handpans</h3>
          <MotionStagger className="product-grid" staggerDelay={0.08}>
            {beginners.map((p) => (
              <ProductCard key={p.id} product={p} showElement aspect="square" />
            ))}
          </MotionStagger>
        </div>
      </section>

      <CustomerReviews id={`${id}-reviews`} />

      <section aria-labelledby={`${id}-rar`} className="section-band-accent section-padding">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("raritiesEyebrow")}
            title={<span id={`${id}-rar`}>Rarities</span>}
            headingClassName="!mb-6 md:!mb-8"
          />
          <MotionStagger className="grid grid-cols-1 gap-4 lg:grid-cols-2" staggerDelay={0.12}>
            {rarities.map((r) => (
              <ProductCard key={r.id} product={r} aspect="21/9" />
            ))}
          </MotionStagger>
        </div>
      </section>

      <section aria-labelledby={`${id}-bd`} className="border-y border-border bg-white section-padding md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("bundlesEyebrow")}
            title={<span id={`${id}-bd`}>Bundle offers</span>}
          />
          <MotionStagger className="grid grid-cols-1 gap-4 md:grid-cols-2" staggerDelay={0.14}>
            {bundles.map((b) => (
              <div
                key={b.id}
                className="rounded-lg border border-border bg-[color:var(--surface-muted)] p-8 md:p-10"
              >
                <h3 className="font-display text-2xl md:text-3xl">{b.title}</h3>
                <p className="mt-4 text-foreground/80">{b.description}</p>
                <div className="mt-8">
                  <QuickBuyButton slug={b.slug} />
                </div>
              </div>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section aria-labelledby={`${id}-cs`} className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/sound-healing-15.jpg" opacity={0.06} />
        <div className="relative container-x">
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
          <MotionStagger className="grid grid-cols-1 gap-6 md:grid-cols-2" staggerDelay={0.1}>
            {cases.map((p) => (
              <ProductCard key={p.id} product={p} aspect="video" />
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white section-padding md:py-40" aria-labelledby={`${id}-mag-cat`}>
        <SectionBackdrop src="/images/handpan-lifestyle-4.jpg" opacity={0.06} />
        <div className="relative container-x">
          <SectionHeading
            eyebrow={tm("categoriesEyebrow")}
            title={<span id={`${id}-mag-cat`}>{tm("categoriesTitle")}</span>}
          />
          <MotionStagger className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" staggerDelay={0.1}>
            {categoryTiles.map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                className="group relative block overflow-hidden rounded-lg border border-border bg-transparent"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ProductPhoto
                    src={tile.image}
                    alt=""
                    aspect="3/4"
                    variant="tile"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    frameClassName="!absolute !inset-0 !h-full !w-full !rounded-none !border-0 !aspect-auto"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                  <h3 className="font-display text-lg md:text-2xl">{tile.title}</h3>
                  <span className="smallcaps mt-2 inline-flex items-center gap-2 text-[color:var(--bronze-accent)]">
                    {tm("seeMore")} <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section
        aria-labelledby={`${id}-fys`}
        className="border-y border-border section-band-accent section-padding md:py-36"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("findSoundEyebrow")}
            title={<span id={`${id}-fys`}>Find your sound</span>}
          />
          <MotionStagger className="product-grid" staggerDelay={0.08}>
            {findYourSound.map((p) => (
              <ProductCard key={p.id} product={p} aspect="4/3" />
            ))}
          </MotionStagger>
        </div>
      </section>

      <section aria-labelledby={`${id}-why`} className="bg-white section-padding">
        <div className="container-x">
          <SectionHeading
            eyebrow={tm("whyChooseEyebrow")}
            title={<span id={`${id}-why`}>Why choose Elements</span>}
            headingClassName="!mb-8"
          />
          <MotionStagger className="grid gap-5 sm:grid-cols-2" staggerDelay={0.1}>
            {[tm("whyChoose1"), tm("whyChoose2"), tm("whyChoose3"), tm("whyChoose4")].map(
              (line) => (
                <li
                  key={line}
                  className="border-l-2 border-[color:var(--sale-bg)] py-1 pl-5 text-foreground/90"
                >
                  {line}
                </li>
              )
            )}
          </MotionStagger>
        </div>
      </section>

      <section aria-labelledby={`${id}-warranty`} className="relative overflow-hidden bg-white section-padding md:py-44">
        <SectionBackdrop src="/images/sound-healing-13.jpg" opacity={0.08} />
        <MotionReveal className="relative container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule !text-[color:var(--sale-bg)]">{tm("warrantyEyebrow")}</p>
          <h2 id={`${id}-warranty`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
            {tm("warrantyTitle")}
          </h2>
          <p className="mt-6 text-foreground/85">{tm("warrantyBody")}</p>
          <div className="mt-9">
            <a href="#how-order" className="btn-pill btn-primary">
              {tm("warrantyCta")} <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </MotionReveal>
      </section>

      <section aria-labelledby={`${id}-jd`} className="section-band-accent section-padding md:py-36">
        <div className="container-x">
          <MotionReveal className="rounded-lg border border-border bg-white p-8 md:p-14">
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
                  className="min-h-12 flex-1 rounded-lg border border-border bg-white px-5 text-sm outline-none focus:border-[color:var(--ink)]"
                />
                <button type="submit" className="btn-pill btn-primary">
                  {newsDone ? "Subscribed" : "Subscribe"}
                </button>
              </form>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section id="how-order" aria-labelledby={`${id}-bg`} className="relative overflow-hidden border-y border-border bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/handpan-lifestyle-14.jpg" opacity={0.06} />
        <div className="relative container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={<span id={`${id}-bg`}>Buying guide</span>} eyebrow="No rush tactics" />
          </div>
          <div className="space-y-6 text-foreground/85 lg:col-span-7">
            <p>{tm("buyingGuideEssence")}</p>
            <MotionStagger className="grid gap-6 pt-2 sm:grid-cols-3" staggerDelay={0.12}>
              {[tm("buyingStep1"), tm("buyingStep2"), tm("buyingStep3")].map((s, i) => (
                <div key={s} className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                  <p className="smallcaps text-[color:var(--sale-bg)]">
                    {tm("buyingStepLabel", { step: i + 1 })}
                  </p>
                  <p className="mt-2">{s}</p>
                </div>
              ))}
            </MotionStagger>
          </div>
        </div>
      </section>

      <section aria-labelledby={`${id}-sh`} className="relative overflow-hidden border-y border-border bg-white section-padding md:py-44">
        <SectionBackdrop src="/images/sound-healing-2.jpg" opacity={0.08} />
        <MotionReveal className="relative container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule">{tm("showroomsHomeEyebrow")}</p>
          <h2 id={`${id}-sh`} className="mt-5 font-display text-3xl leading-tight md:text-5xl">
            Showrooms
          </h2>
          <p className="mt-6 text-foreground/80">{tm("showroomsHomeBody")}</p>
          <Link href="/showrooms" className="link-arrow mt-8 inline-flex">
            Showrooms detail <ArrowRight size={14} aria-hidden />
          </Link>
        </MotionReveal>
      </section>

      <HomePageFooter />
    </div>
  );
}
