"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { MotionReveal } from "@/app/components/home/motion/motion-primitives";
import { PageHero } from "./PageHero";

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "info@elements.com",
    note: "Order updates, tuning questions, and showroom requests share one queue.",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Ubud, Gianyar \u00B7 Bali, Indonesia",
    note: "Dany Rud, Owner, Elements - Handpan & Sound Healing.",
  },
  {
    icon: Clock,
    label: "Response",
    value: "Within 1-2 working days",
    note: "Reference your order number when writing so routing stays accurate.",
  },
];

export function ContactView() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      <PageHero
        eyebrow="Talk to us directly"
        title="Let's find the right"
        titleAccent="instrument or session"
        sub="Whether you are choosing a scale, booking a sound session, or planning a showroom visit, write to us and a real person replies."
        kicker="Bali, Indonesia"
        backgroundImage="/images/sound-healing-13.jpg"
        floatImage="/images/collection/handpan-earth.png"
        floatAlt="Elements handpan"
      />

      <section className="relative bg-white section-padding md:py-36">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Details */}
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-rule">Reach us</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
              One queue, real answers
            </h2>
            <div className="mt-10 space-y-8">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-[color:var(--surface-muted)] text-[color:var(--sale-bg)]">
                      <Icon size={18} aria-hidden />
                    </span>
                    <div>
                      <p className="smallcaps text-muted-foreground">{d.label}</p>
                      <p className="mt-1 font-display text-lg">{d.value}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                        {d.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-lg border border-border bg-[color:var(--surface-accent)] p-6">
              <p className="text-sm leading-relaxed text-foreground/80">
                Press &amp; partnership inquiries: include distribution region and
                timeline so routing stays accurate.
              </p>
              <Link href="/showrooms" className="link-arrow mt-4 inline-flex">
                Request a showroom visit <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <MotionReveal className="rounded-xl border border-border bg-[color:var(--surface-muted)] p-8 md:p-12">
              {sent ? (
                <div className="py-10 text-center">
                  <h3 className="font-display text-2xl md:text-3xl">
                    Message received
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    Thank you. We&apos;ll reply to{" "}
                    <span className="text-foreground">{form.email}</span> within
                    1-2 working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="link-arrow mx-auto mt-8 inline-flex"
                  >
                    Send another <ArrowRight size={14} aria-hidden />
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (form.email && form.message) setSent(true);
                  }}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="smallcaps text-muted-foreground">
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="mt-2 min-h-12 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-[color:var(--ink)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="smallcaps text-muted-foreground">
                        Email
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-2 min-h-12 w-full rounded-lg border border-border bg-white px-4 text-sm outline-none transition focus:border-[color:var(--ink)]"
                        placeholder="you@studio.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="smallcaps text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="mt-2 w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--ink)]"
                      placeholder="Tell us about the scale, session, or visit you have in mind."
                    />
                  </div>
                  <button type="submit" className="btn-pill btn-primary">
                    Send message <ArrowRight size={16} aria-hidden />
                  </button>
                </form>
              )}
            </MotionReveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
