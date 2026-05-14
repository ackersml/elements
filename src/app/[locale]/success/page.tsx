import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-warm">
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Thank you for your order
        </h1>
        {session_id && (
          <p className="mt-2 text-muted-foreground">
            Payment confirmed. A receipt is on the way to your inbox.
          </p>
        )}
        <p className="mt-4 leading-relaxed text-foreground">
          We will email if we need scale confirmation or a revised build window.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          {session_id && (
            <Link
              href={`/track?session_id=${encodeURIComponent(session_id)}`}
              className="inline-flex items-center justify-center border border-primary bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:brightness-110"
            >
              Track your order
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-gold px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
