import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const t = await getTranslations("success");

  return (
    <div className="min-h-screen bg-gradient-warm">
      <main className="container-x max-w-lg py-16 text-center">
        <h1 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{t("line1")}</p>
        <p className="mt-3 leading-relaxed text-foreground/90">{t("line2")}</p>
        {session_id && (
          <p className="mt-6 text-sm text-muted-foreground">{t("receipt")}</p>
        )}
        <p className="mt-4 text-sm text-muted-foreground">{t("fulfillment")}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
          {session_id && (
            <Link
              href={`/track?session_id=${encodeURIComponent(session_id)}`}
              className="btn-pill btn-primary font-semibold"
            >
              Track your order
            </Link>
          )}
          <Link href="/" className="btn-pill btn-ghost font-medium">
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
