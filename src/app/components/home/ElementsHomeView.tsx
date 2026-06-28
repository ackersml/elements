"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";
import {
  getProducts,
  getProductsByCollection,
  getProductsByTag,
} from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { AnnouncementBar } from "@/app/components/layout/AnnouncementBar";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { BundleOfferSection } from "@/app/components/home/BundleOfferSection";
import { CustomerReviews } from "@/app/components/home/CustomerReviews";
import { HomeHero } from "@/app/components/home/HomeHero";
import { HomePromoGrid } from "@/app/components/home/HomePromoGrid";
import { InfoStrip } from "@/app/components/home/InfoStrip";
import { InstrumentOfMonthSection } from "@/app/components/home/InstrumentOfMonthSection";
import { ProductRail } from "@/app/components/home/ProductRail";
import { TrustStrip } from "@/app/components/home/TrustStrip";
import {
  MotionBorderGrow,
  MotionHeading,
  MotionReveal,
  MotionScaleReveal,
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
          &copy; {year} Elements. {t("footerSlow")}
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
  const beginners = getProductsByCollection("beginner");
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

  const caseSwatches = (
    <div className="flex flex-wrap gap-2">
      {["Graphite", "Ochre", "Slate", "Umber"].map((s) => (
        <span
          key={s}
          className="smallcaps rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground"
        >
          {s}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative bg-[color:var(--surface-muted)] text-foreground">
      <AnnouncementBar />
      <div className="relative">
        <SiteHeader variant="overlay" />
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
      </div>

      <TrustStrip />

      <InfoStrip />

      {instrumentMonth ? (
        <InstrumentOfMonthSection
          product={instrumentMonth}
          limitedLabel={tm("iotmLimitedStock")}
          titleId={`${id}-iotm`}
        />
      ) : null}

      <ProductRail
        id={`${id}-beg`}
        eyebrow={tm("beginnerEyebrow")}
        title={tm("beginnerTitle")}
        description={tm("beginnerBlurb")}
        products={beginners}
        ctaLabel={tm("shopCtaBeginner")}
        ctaHref={shopCollectionHref("beginner")}
        band="white"
        aspect="4/3"
        cardLayout="default"
        display="grid"
        quickAddOnHover
      />

      <CustomerReviews id={`${id}-reviews`} />

      <ProductRail
        id={`${id}-rar`}
        eyebrow={tm("raritiesEyebrow")}
        title={tm("raritiesTitle")}
        description={tm("raritiesBlurb")}
        products={rarities}
        ctaLabel={tm("shopCtaRare")}
        ctaHref={shopCollectionHref("rare")}
        band="accent"
        aspect="21/9"
        display="carousel"
        backdrop="/images/handpan-lifestyle-15.jpg"
        backdropTint="cream"
      />

      <BundleOfferSection id={`${id}-bundles`} products={bundles.slice(0, 2)} />

      <ProductRail
        id={`${id}-cases`}
        eyebrow={tm("casesEyebrow")}
        title={tm("casesTitle")}
        description={tm("casesBlurb")}
        products={cases}
        ctaLabel={tm("shopCtaAccessories")}
        ctaHref={shopCollectionHref("accessories")}
        band="forest"
        backdrop="/images/handpan-lifestyle-2.jpg"
        backdropTint="forest"
        beforeRail={caseSwatches}
      />

      <HomePromoGrid />

      <section
        className="relative overflow-hidden border-b border-border section-band-accent section-padding"
        aria-labelledby={`${id}-mag-cat`}
      >
        <SectionBackdrop
          src="/images/handpan-lifestyle-4.jpg"
          tint="cream"
          opacity={0.2}
          parallax
        />
        <div className="relative container-x">
          <SectionHeading
            eyebrow={tm("categoriesEyebrow")}
            title={<span id={`${id}-mag-cat`}>{tm("categoriesTitle")}</span>}
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {categoryTiles.map((tile, index) => (
              <MotionScaleReveal key={tile.key} delay={index * 0.08}>
                <Link
                  href={tile.href}
                  className="category-tile group relative block overflow-hidden rounded-lg border border-border bg-transparent"
                >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ProductPhoto
                    src={tile.image}
                    alt=""
                    aspect="3/4"
                    variant="tile"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    frameClassName="category-tile-photo !absolute !inset-0 !h-full !w-full !rounded-none !border-0 !aspect-auto"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-transform duration-500 ease-out group-hover:translate-y-[-4px] md:p-6">
                  <h3 className="font-display text-lg md:text-2xl">{tile.title}</h3>
                  <span className="smallcaps mt-2 inline-flex items-center gap-2 text-[color:var(--bronze-accent)]">
                    {tm("seeMore")} <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
              </MotionScaleReveal>
            ))}
          </div>
        </div>
      </section>

      <ProductRail
        id={`${id}-fys`}
        eyebrow={tm("findSoundEyebrow")}
        title={tm("findSoundTitle")}
        description={tm("findSoundBlurb")}
        products={findYourSound}
        ctaLabel={tm("shopCtaAll")}
        ctaHref="/shop"
        band="sandstone"
        backdrop="/images/sound-healing-8.jpg"
        backdropTint="sandstone"
      />

      <section
        aria-labelledby={`${id}-assurance`}
        className="border-b border-border section-band-accent section-padding"
      >
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={tm("whyChooseEyebrow")}
              title={<span id={`${id}-assurance`}>{tm("assuranceTitle")}</span>}
              headingClassName="!mb-6 md:!mb-8"
            />
            <p className="-mt-4 mb-8 max-w-xl text-muted-foreground md:-mt-6">
              {tm("assuranceBlurb")}
            </p>
            <MotionStagger className="grid gap-5 sm:grid-cols-2" staggerDelay={0.1}>
              {[tm("whyChoose1"), tm("whyChoose2"), tm("whyChoose3"), tm("whyChoose4")].map(
                (line) => (
                  <MotionBorderGrow key={line}>
                    <p className="py-1 text-foreground/90">{line}</p>
                  </MotionBorderGrow>
                )
              )}
            </MotionStagger>
          </div>
          <MotionReveal className="rounded-lg border border-border bg-white p-8 md:p-10">
            <p className="eyebrow eyebrow-rule !text-[color:var(--sale-bg)]">
              {tm("warrantyEyebrow")}
            </p>
            <h3 className="mt-5 font-display text-2xl leading-tight md:text-3xl">
              {tm("warrantyTitle")}
            </h3>
            <p className="mt-4 text-foreground/85">{tm("warrantyBody")}</p>
            <a href="#how-order" className="btn-pill btn-primary mt-8 inline-flex">
              {tm("warrantyCta")} <ArrowRight size={16} aria-hidden />
            </a>
          </MotionReveal>
        </div>
      </section>

      <section
        aria-labelledby={`${id}-jd`}
        className="border-b border-border section-band-accent section-padding"
      >
        <div className="container-x">
          <MotionReveal className="rounded-lg border border-border bg-white p-8 md:p-14">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="eyebrow eyebrow-rule">{tm("newsletterEyebrowAlt")}</p>
                <h2
                  id={`${id}-jd`}
                  className="mt-4 font-display text-3xl leading-tight md:text-4xl"
                >
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

      <section
        id="how-order"
        aria-labelledby={`${id}-bg`}
        className="relative overflow-hidden border-b border-border section-band-muted section-padding"
      >
        <SectionBackdrop
          src="/images/sound-healing-13.jpg"
          tint="cream"
          opacity={0.18}
          parallax
        />
        <div className="relative container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title={<span id={`${id}-bg`}>Buying guide</span>}
              eyebrow="No rush tactics"
            />
          </div>
          <div className="space-y-6 text-foreground/85 lg:col-span-7">
            <p>{tm("buyingGuideEssence")}</p>
            <MotionStagger className="grid gap-6 pt-2 sm:grid-cols-3" staggerDelay={0.12}>
              {[tm("buyingStep1"), tm("buyingStep2"), tm("buyingStep3")].map((s, i) => (
                <MotionBorderGrow key={s}>
                  <p className="smallcaps text-[color:var(--sale-bg)]">
                    {tm("buyingStepLabel", { step: i + 1 })}
                  </p>
                  <p className="mt-2">{s}</p>
                </MotionBorderGrow>
              ))}
            </MotionStagger>
          </div>
        </div>

        <MotionReveal className="container-x mt-16">
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-[color:var(--surface-muted)] p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="eyebrow eyebrow-rule">{tm("showroomsHomeEyebrow")}</p>
              <h3 className="mt-3 font-display text-2xl md:text-3xl">Showrooms</h3>
              <p className="mt-3 max-w-xl text-foreground/80">{tm("showroomsHomeBody")}</p>
            </div>
            <Link href="/showrooms" className="link-arrow shrink-0">
              Showrooms detail <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </section>

      <HomePageFooter />
    </div>
  );
}
