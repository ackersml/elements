"use client";

import { Link } from "@/i18n/navigation";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function TrackForm() {
  const searchParams = useSearchParams();
  const sessionIdFromUrl = searchParams.get("session_id") ?? "";

  const [email, setEmail] = useState("");
  const [orderRef, setOrderRef] = useState(sessionIdFromUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<{
    id: string;
    status: string;
    tracking_url: string | null;
    tracking_number: string | null;
    created_at: string;
    line_items?: { productName?: string; quantity?: number }[];
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    const em = email.trim();
    const ref = orderRef.trim();
    if (!em || !ref) {
      setError("Email and order ID are required.");
      return;
    }

    setLoading(true);
    try {
      const isUuid = UUID_REGEX.test(ref);
      const params = new URLSearchParams({ email: em });
      if (isUuid) params.set("id", ref);
      else params.set("session_id", ref);

      const res = await fetch(`/api/orders?${params}`);
      const data: { error?: string } & typeof order = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Order not found.");
        return;
      }
      setOrder(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <main className="mx-auto max-w-lg px-4 py-16">
        <h1 className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          Track your order
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Enter the email you used at checkout and your order ID or session ID.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-input bg-background px-4 py-2 text-foreground"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="orderRef"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Order ID or session ID
            </label>
            <input
              id="orderRef"
              type="text"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              className="w-full border border-input bg-background px-4 py-2 text-foreground"
              placeholder="From confirmation email or success page"
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-primary bg-primary px-6 py-3 font-medium text-primary-foreground hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "Looking up…" : "Look up order"}
          </button>
        </form>

        {order && (
          <div className="mt-8 border border-border bg-card p-4 text-foreground">
            <p className="font-medium">Order status: {order.status}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed: {new Date(order.created_at).toLocaleString()}
            </p>
            {order.line_items?.length ? (
              <p className="mt-2 text-sm">
                {order.line_items.map((item, i) => (
                  <span key={i}>
                    {item.quantity}x {item.productName ?? "Item"}
                    {i < order.line_items!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            ) : null}
            {order.tracking_url ? (
              <a
                href={order.tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block border border-primary bg-primary px-4 py-2 font-medium text-primary-foreground hover:brightness-110"
              >
                Track package
              </a>
            ) : order.tracking_number ? (
              <p className="mt-4 text-sm">
                Tracking number: {order.tracking_number}
              </p>
            ) : null}
          </div>
        )}

        <p className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-warm">
          Loading…
        </div>
      }
    >
      <TrackForm />
    </Suspense>
  );
}
