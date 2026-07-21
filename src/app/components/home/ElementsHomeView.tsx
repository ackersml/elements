"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  getProductBySlug,
  getProductsByCollection,
} from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";
import { canvaAssets } from "@/lib/canva-assets";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { AnnouncementBar } from "@/app/components/layout/AnnouncementBar";
import {
  CollectionExploreDual,
  defaultExploreTiles,
} from "@/app/components/home/CollectionExploreDual";
import {
  buildMoodGridItems,
  ElementMoodGridSection,
} from "@/app/components/home/ElementMoodGridSection";
import { ElementsWheelSection } from "@/app/components/home/ElementsWheelSection";
import { FeaturedInstrumentSection } from "@/app/components/home/FeaturedInstrumentSection";
import { HomeHero } from "@/app/components/home/HomeHero";
import { SeriesCardsSection } from "@/app/components/home/SeriesCardsSection";
import { HighlightsRaritiesSection } from "@/app/components/home/HighlightsRaritiesSection";

function HomePageFooter() {
  const t = useTranslations("mag");
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const shopLinks: { label: string; href: string }[] = [
    { label: tn("shopOrigins"), href: shopCollectionHref("origins") },
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
  const tm = useTranslations("mag");
  const tn = useTranslations("nav");
  const id = useId();

  // Canva homepage — section order mirrors "elements canva design.pdf".
  // Signature Series is temporarily hidden (Iran-origin / EU shipping on hold),
  // so the homepage features Origins throughout — see HIDDEN_COLLECTIONS in
  // src/lib/products.ts.
  const origins = getProductsByCollection("origins");
  const accessories = getProductsByCollection("accessories");
  const featuredDkurd = getProductBySlug("origins-d-kurd-10");

  // Highlights & Rarities — four Origins builds while Signature is on hold.
  const highlightSlugs = [
    "origins-d-kurd-18",
    "origins-f-sharp-low-pygmy-21",
    "origins-f-sharp-nordlys-15",
    "origins-b2-mystic-9",
  ];
  const highlightProducts = highlightSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const moodProducts = [
    getProductBySlug("origins-d-kurd-10"),
    getProductBySlug("origins-f-sharp-nordlys-15"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  const seriesCards: {
    key: string;
    title: string;
    href: string;
    image: string;
  }[] = [
    {
      key: "origins",
      title: tn("shopOrigins"),
      href: shopCollectionHref("origins"),
      image: canvaAssets.series.origins,
    },
    {
      key: "cases",
      title: tm("catCases"),
      href: shopCollectionHref("accessories"),
      image: canvaAssets.series.accessory,
    },
    {
      key: "all",
      title: tm("promoAllTitle"),
      href: "/shop",
      image: canvaAssets.series.shopAll,
    },
  ];

  const exploreTiles = defaultExploreTiles(
    tn("shopOrigins"),
    tn("shopAccessories"),
    shopCollectionHref("origins"),
    shopCollectionHref("accessories"),
    origins.slice(0, 2).map((p) => p.heroImageUrl),
    accessories.slice(0, 2).map((p) => p.heroImageUrl)
  );

  return (
    <div className="relative bg-[color:var(--surface-muted)] text-foreground">
      <AnnouncementBar />

      {/* 1 — Header + Hero (Bali) */}
      <div className="relative">
        <SiteHeader variant="overlay" />
        <HomeHero variant="canva" />
      </div>

      {/* 2 — Brand mark + featured D Kurd 10 */}
      {featuredDkurd ? (
        <FeaturedInstrumentSection
          id={`${id}-featured`}
          product={featuredDkurd}
          variant="canva"
        />
      ) : null}

      {/* 3 — The five elements */}
      <ElementsWheelSection id={`${id}-elements`} variant="canva" />

      {/* 4 — Mood grid (Premium Series pairing) */}
      {moodProducts.length > 0 ? (
        <ElementMoodGridSection
          id={`${id}-mood`}
          items={buildMoodGridItems(moodProducts, tm("premiumSeries"))}
          variant="canva"
        />
      ) : null}

      {/* 5 — Highlights and Rarities */}
      <HighlightsRaritiesSection
        id={`${id}-highlights`}
        products={highlightProducts.length > 0 ? highlightProducts : origins}
      />

      {/* 6 — Series cards */}
      <SeriesCardsSection id={`${id}-series`} cards={seriesCards} variant="canva" />

      {/* 7 — Explore split (Elements / Origins) */}
      <CollectionExploreDual tiles={exploreTiles} />

      <HomePageFooter />
    </div>
  );
}
