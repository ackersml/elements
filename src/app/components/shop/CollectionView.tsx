"use client";

import { useMemo, useState } from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { MotionStagger } from "@/app/components/home/motion/motion-primitives";
import { shopCollectionHref, shopNavCollections } from "@/lib/shop-nav";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "name";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "priceAsc", label: "Price: Low to High" },
  { key: "priceDesc", label: "Price: High to Low" },
  { key: "name", label: "Name: A to Z" },
];

const HERO_IMAGE: Record<string, string> = {
  all: "/images/handpan-lifestyle-7.jpg",
  beginner: "/images/handpan-lifestyle-13.jpg",
  extended: "/images/handpan-lifestyle-5.jpg",
  rare: "/images/handpan-lifestyle-8.jpg",
  bundles: "/images/handpan-lifestyle-10.jpg",
  accessories: "/images/handpan-lifestyle-12.jpg",
};

type CollectionViewProps = {
  products: Product[];
  /** Active collection handle, or null for the all-products shop view. */
  activeCollection: string | null;
  eyebrow: string;
  title: string;
  description: string;
};

export function CollectionView({
  products,
  activeCollection,
  eyebrow,
  title,
  description,
}: CollectionViewProps) {
  const tn = useTranslations("nav");
  const [sort, setSort] = useState<SortKey>("featured");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "priceAsc":
        return list.sort((a, b) => a.priceCents - b.priceCents);
      case "priceDesc":
        return list.sort((a, b) => b.priceCents - a.priceCents);
      case "name":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return list;
    }
  }, [products, sort]);

  const activeKey = activeCollection ?? "all";
  const heroImage = HERO_IMAGE[activeKey] ?? HERO_IMAGE.all;
  const sortLabel =
    SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "Featured";

  const pills: { key: string; label: string; href: string; active: boolean }[] = [
    {
      key: "all",
      label: "All",
      href: "/shop",
      active: activeCollection == null,
    },
    ...shopNavCollections.map((c) => ({
      key: c.collection,
      label: tn(c.key as "shopBeginner"),
      href: shopCollectionHref(c.collection),
      active: activeCollection === c.collection,
    })),
  ];

  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      {/* Dark collection header */}
      <section className="relative isolate overflow-hidden hero-home">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,rgba(62,74,60,0.55)_0%,rgba(47,58,46,0.85)_45%,rgba(31,37,28,0.96)_100%)]" />
          <div className="grain" />
        </div>
        <div className="relative container-x pb-14 pt-28 md:pb-16 md:pt-36">
          <nav className="flex items-center gap-2 text-xs text-[color:var(--sandstone)]/55">
            <Link href="/" className="transition hover:text-[color:var(--sandstone)]">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/shop"
              className="transition hover:text-[color:var(--sandstone)]"
            >
              {tn("shop")}
            </Link>
            {activeCollection ? (
              <>
                <span aria-hidden>/</span>
                <span className="text-[color:var(--sandstone)]/80">{title}</span>
              </>
            ) : null}
          </nav>
          <p className="eyebrow eyebrow-rule mt-6 !text-[color:var(--bronze-accent)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.04] tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-[color:var(--sandstone)]/75 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-md">
        <div className="container-x space-y-4 py-5">
          <div className="flex flex-wrap items-center gap-2">
            {pills.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                aria-current={p.active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                  p.active
                    ? "bg-[color:var(--pine-grove)] text-white"
                    : "border border-border text-muted-foreground hover:border-[color:var(--bronze-accent)] hover:text-foreground"
                )}
              >
                {p.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-display text-foreground">{sorted.length}</span>{" "}
              {sorted.length === 1 ? "instrument" : "instruments"}
            </p>

            <Dropdown.Root>
              <Dropdown.Trigger className="inline-flex min-w-[200px] items-center justify-between gap-2 rounded-lg border border-border px-4 py-2.5 text-sm transition hover:border-[color:var(--bronze-accent)]">
                <span className="text-muted-foreground">
                  Sort:{" "}
                  <span className="font-medium text-foreground">{sortLabel}</span>
                </span>
                <ChevronDown size={16} className="text-muted-foreground" aria-hidden />
              </Dropdown.Trigger>
              <Dropdown.Content
                align="end"
                sideOffset={8}
                className="z-[80] min-w-[200px] rounded-lg border border-border bg-white p-1 shadow-2xl"
              >
                {SORT_OPTIONS.map((o) => (
                  <Dropdown.Item
                    key={o.key}
                    onSelect={() => setSort(o.key)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm outline-none transition hover:bg-secondary",
                      sort === o.key && "text-[color:var(--sale-bg)]"
                    )}
                  >
                    {o.label}
                    {sort === o.key ? <Check size={14} aria-hidden /> : null}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-white section-padding md:py-24">
        <div className="container-x">
          {sorted.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              Nothing in this collection yet.{" "}
              <Link href="/shop" className="link-arrow">
                View all
              </Link>
            </p>
          ) : (
            <MotionStagger className="product-grid" staggerDelay={0.06}>
              {sorted.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  aspect="4/3"
                  showElement
                  collectionScene={activeCollection === "beginner"}
                />
              ))}
            </MotionStagger>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
