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
      <main className="container-x max-w-lg py-16 text-center">
        <h1 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
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
