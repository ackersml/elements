import { InfoPage } from "@/app/components/info/InfoPage";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t("journal.title") };
}

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <InfoPage title={t("journal.title")}>
      <p>{t("journal.p1")}</p>
      <p>{t("journal.p2")}</p>
      <p>{t("journal.p3")}</p>
    </InfoPage>
  );
}
