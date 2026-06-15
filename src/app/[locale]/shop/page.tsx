import { redirect } from "@/i18n/navigation";
import { getProducts } from "@/lib/products";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CollectionView } from "@/app/components/shop/CollectionView";
import { isValidCollection } from "@/lib/shop-nav";

export const metadata: Metadata = {
  title: "Shop",
};

type Props = {
  searchParams: Promise<{ collection?: string }>;
  params: Promise<{ locale: string }>;
};

export default async function ShopPage({ searchParams, params }: Props) {
  const { collection } = await searchParams;
  const { locale } = await params;

  if (collection && isValidCollection(collection)) {
    redirect({ href: `/collections/${collection}`, locale });
  }

  const tm = await getTranslations("mag");
  const list = getProducts();

  return (
    <CollectionView
      products={list}
      activeCollection={null}
      eyebrow="Shop"
      title={tm("collectionTitle")}
      description={tm("collectionBlurb")}
    />
  );
}
