import { InfoPage } from "@/app/components/info/InfoPage";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t("privacy.title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <InfoPage
      title={t("privacy.title")}
      eyebrow="How we handle your data"
      heroImage="/images/handpan-lifestyle-11.jpg"
    >
      <p>{t("privacy.p1")}</p>
      <p>{t("privacy.p2")}</p>
      <p>{t("privacy.p3")}</p>
    </InfoPage>
  );
}
