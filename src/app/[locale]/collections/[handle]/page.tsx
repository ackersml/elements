import { redirect } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import {
  getCollectionLabelKey,
  isValidCollection,
  shopNavCollections,
} from "@/lib/shop-nav";
import { getProductsByCollection } from "@/lib/products";

type Props = {
  params: Promise<{ handle: string; locale: string }>;
};

export function generateStaticParams() {
  return shopNavCollections.map((c) => ({ handle: c.collection }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const labelKey = getCollectionLabelKey(handle);
  if (!labelKey) return { title: "Collection" };
  const t = await getTranslations("nav");
  return { title: t(labelKey) };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;

  if (!isValidCollection(handle)) {
    notFound();
  }

  const tn = await getTranslations("nav");
  const tm = await getTranslations("mag");
  const labelKey = getCollectionLabelKey(handle)!;
  const list = getProductsByCollection(handle);
  const title = tn(labelKey);

  return (
    <>
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-[color:var(--surface-accent)] md:min-h-[50vh]">
        <div className="relative container-x pt-24 pb-12 md:pt-28 md:pb-16">
          <p className="eyebrow eyebrow-rule">{tm("collectionEyebrow")}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed md:text-lg">
            {list.length}{" "}
            {list.length === 1
              ? tm("collectionCountOne")
              : tm("collectionCountMany")}
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden bg-white section-padding">
        <SectionBackdrop src="/images/handpan-lifestyle-7.jpg" opacity={0.05} />
        <div className="relative container-x">
          {list.length === 0 ? (
            <p className="text-muted-foreground">{tm("collectionEmpty")}</p>
          ) : (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} aspect="4/3" showElement />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
