import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CollectionView } from "@/app/components/shop/CollectionView";
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

  const descriptionKey =
    handle === "signature"
      ? "signatureCollectionBlurb"
      : handle === "origins"
        ? "originsCollectionBlurb"
        : handle === "accessories"
          ? "casesBlurb"
          : "collectionBlurb";

  return (
    <CollectionView
      products={list}
      activeCollection={handle}
      eyebrow={tm("collectionEyebrow")}
      title={tn(labelKey)}
      description={tm(descriptionKey)}
    />
  );
}
