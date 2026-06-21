"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { course, formatPrice } from "@/lib/course";

// Pay-what-you-can checkout: preset amounts + a custom field.
// Posts the chosen amount to /api/course-checkout and redirects to Stripe.
export function DonationCheckout() {
  const [selected, setSelected] = useState<number>(course.defaultCents);
  const [custom, setCustom] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const customCents = custom ? Math.round(parseFloat(custom) * 100) : 0;
  const amountCents = custom ? customCents : selected;
  const valid = amountCents >= course.minCents && amountCents <= course.maxCents;

  async function handleCheckout() {
    if (!valid) {
      setErr(`Please enter at least ${formatPrice(course.minCents, course.currency)}.`);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/course-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout is not available yet.");
      }
      window.location.href = data.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {course.presetCents.map((cents) => {
          const active = !custom && selected === cents;
          return (
            <button
              key={cents}
              type="button"
              onClick={() => {
                setSelected(cents);
                setCustom("");
                setErr(null);
              }}
              className={
                "rounded-xl border px-4 py-4 text-lg font-medium transition-colors " +
                (active
                  ? "border-white bg-white text-[color:var(--sage-deep)]"
                  : "border-white/35 text-white hover:border-white/70")
              }
            >
              {formatPrice(cents, course.currency)}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
            €
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={course.minCents / 100}
            placeholder="Other amount"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setErr(null);
            }}
            className="min-h-12 w-full rounded-xl border border-white/35 bg-transparent pl-8 pr-4 text-white placeholder:text-white/50 outline-none focus:border-white"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => void handleCheckout()}
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--sage-deep)] transition hover:brightness-95 disabled:opacity-70"
      >
        {loading
          ? "Redirecting…"
          : `Get instant access — ${formatPrice(amountCents || course.minCents, course.currency)}`}
        {!loading && <ArrowRight size={16} aria-hidden />}
      </button>

      {err && (
        <p className="mt-3 text-center text-sm text-white/90" role="alert">
          {err}
        </p>
      )}
      <p className="mt-3 text-center text-xs text-white/60">
        Pay what you can · secure checkout · access emailed after payment
      </p>
    </div>
  );
}
