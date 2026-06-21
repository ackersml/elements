"use client";

import { Check, Play, Plus, Minus, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { course } from "@/lib/course";
import { DonationCheckout } from "./DonationCheckout";

const EASE = [0.16, 1, 0.3, 1] as const;

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden role="img">
      <circle cx="32" cy="11" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 13c3.2-3.2 8-5 12-5s8.8 1.8 12 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M32 22c-2.4 4-6.2 7-11 8.4M32 22c2.4 4 6.2 7 11 8.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 33c4.5 2.2 9.5 3.3 18 3.3S45.5 35.2 50 33c-2 7.5-9 12.7-18 12.7S16 40.5 14 33Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Wordmark({ center = false }: { center?: boolean }) {
  return (
    <div className={center ? "flex flex-col items-center text-center" : "flex flex-col"}>
      <LotusMark className="h-9 w-9 text-white" />
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white">
        {course.brandUrl}
      </p>
      <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.4em] text-white/85">
        {course.kicker}
      </p>
    </div>
  );
}

function DanyPhoto({ className }: { className?: string }) {
  return (
    <div
      className={
        "overflow-hidden rounded-2xl bg-[color:var(--sage-deep)] " + (className ?? "")
      }
    >
      <img
        src="/course/dany.jpg"
        alt="Dany Rud playing handpan"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function PrimaryCta({ label }: { label: string }) {
  return (
    <a
      href="#access"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--sage-deep)] transition hover:brightness-95"
    >
      {label} <ArrowRight size={16} aria-hidden />
    </a>
  );
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't always reflect the `muted` prop to the attribute, which
    // blocks mobile autoplay — force it, then attempt to play.
    v.muted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    // Retry once the data is ready (covers slower mobile connections).
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      src="/course/hero.mp4"
      poster="/course/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="auto"
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-10 pb-16 md:px-10 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex justify-center">
          <Wordmark center />
        </div>

        <h1 className="cfade course-heading mx-auto mt-10 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
          {course.title}
          <br />
          {course.titleLine2}
        </h1>
        <p className="cfade cfade-2 mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          {course.pitch}
        </p>
        <div className="cfade cfade-3 mt-9 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta label="Get the course" />
          <a
            href="#curriculum"
            className="inline-flex items-center justify-center rounded-full border border-white/45 px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:border-white"
          >
            See what's inside
          </a>
        </div>

        <div className="cfade cfade-4 mt-12 overflow-hidden rounded-2xl border border-white/20 bg-[color:var(--sage-deep)]">
          <div className="aspect-video w-full">
            <HeroVideo />
          </div>
        </div>

        <p className="mt-6 text-sm text-white/65">
          Pay what you can · any level · lifetime access
        </p>
      </div>
    </section>
  );
}

function FeatureBullets() {
  return (
    <section className="border-t border-white/15 px-5 py-14 md:px-10">
      <div className="mx-auto grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
        {course.heroFeatures.map((f) => (
          <motion.div
            {...reveal()}
            key={f}
            className="flex items-start gap-3 text-white/90"
          >
            <Check size={20} className="mt-0.5 shrink-0 text-white" aria-hidden />
            <span className="md:text-lg">{f}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {course.featureCards.map((c, i) => (
          <motion.div
            {...reveal(i * 0.08)}
            key={c.title}
            className="rounded-2xl border border-white/25 bg-white/[0.07] p-7"
          >
            <h3 className="course-heading text-xl text-white">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CauseSection() {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      <motion.div
        {...reveal()}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-[color:var(--sage-deep)] p-8 text-center md:p-12"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
          {course.cause.eyebrow}
        </p>
        <h2 className="course-heading mx-auto mt-4 max-w-2xl text-3xl text-white md:text-4xl">
          {course.cause.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/85">
          {course.cause.body}
        </p>
        <a
          href={course.cause.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--sage-deep)] transition hover:brightness-95"
        >
          {course.cause.ctaLabel} <ArrowRight size={16} aria-hidden />
        </a>
        <p className="mt-4 text-xs text-white/55">{course.cause.note}</p>
      </motion.div>
    </section>
  );
}

function Curriculum() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="curriculum" className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div {...reveal()} className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
            Course curriculum
          </p>
          <h2 className="course-heading mt-3 text-3xl text-white md:text-5xl">
            Three patterns, one flow
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Five focused video lessons that build from your first groove to layered,
            melodic playing — at your own pace.
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/[0.06]">
          {course.modules.map((m, i) => {
            const isOpen = open === i;
            return (
              <div key={m.title} className="border-b border-white/15 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[color:var(--sage-deep)]">
                    <Play size={16} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                        {m.tag}
                      </span>
                      {m.preview && (
                        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                          Free preview
                        </span>
                      )}
                    </span>
                    <span className="course-heading mt-1 block text-lg text-white md:text-xl">
                      {m.title}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.12em] text-white/55 sm:block">
                    {m.level}
                  </span>
                  {isOpen ? (
                    <Minus size={18} className="shrink-0 text-white/70" aria-hidden />
                  ) : (
                    <Plus size={18} className="shrink-0 text-white/70" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 pl-19 text-sm leading-relaxed text-white/80 md:px-6 md:pl-20">
                    {m.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Learn() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div {...reveal()} className="order-2 lg:order-1">
          <DanyPhoto className="aspect-[4/5] w-full max-w-md" />
        </motion.div>
        <motion.div {...reveal(0.1)} className="order-1 lg:order-2 max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
            What you'll learn
          </p>
          <h2 className="course-heading mt-3 text-3xl text-white md:text-5xl">
            Learn with {course.instructor}
          </h2>
          <ul className="mt-8 space-y-4">
            {course.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 text-white/90">
                <Check size={18} className="mt-0.5 shrink-0 text-white" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
            From players
          </p>
          <h2 className="course-heading mt-3 text-3xl text-white md:text-5xl">
            Hands moving, music flowing
          </h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {course.testimonials.map((t, i) => (
            <motion.figure
              {...reveal(i * 0.08)}
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-white/25 bg-white/[0.07] p-7"
            >
              <blockquote className="flex-1 leading-relaxed text-white/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="course-heading text-lg text-white">{t.name}</p>
                <p className="text-sm text-white/60">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Access() {
  return (
    <section id="access" className="px-5 py-20 md:px-10 md:py-28">
      <motion.div
        {...reveal()}
        className="mx-auto max-w-xl rounded-3xl border border-white/25 bg-[color:var(--sage-deep)] p-8 text-center md:p-12"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/75">
          Pay what you can
        </p>
        <h2 className="course-heading mt-3 text-3xl text-white md:text-4xl">
          Get the full course today
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/80">
          Choose the amount that feels right. Every contribution supports {course.instructor}
          {" "}and unlocks lifetime access to all five lessons, sent straight to your email.
        </p>
        <div className="mt-8">
          <DonationCheckout />
        </div>
      </motion.div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div {...reveal()} className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
            Questions
          </p>
          <h2 className="course-heading mt-3 text-3xl text-white md:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>
        <div className="border-t border-white/15">
          {course.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="course-heading text-lg text-white md:text-xl">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus size={18} className="shrink-0 text-white/70" aria-hidden />
                  ) : (
                    <Plus size={18} className="shrink-0 text-white/70" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-5 leading-relaxed text-white/80">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 py-16 text-center md:px-10 md:py-20">
      <motion.h2
        {...reveal()}
        className="course-heading mx-auto max-w-2xl text-3xl text-white md:text-4xl"
      >
        Curious? Let's get your hands flowing.
      </motion.h2>
      <motion.div {...reveal(0.1)} className="mt-8 flex justify-center">
        <PrimaryCta label="Get the course" />
      </motion.div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/15 px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <Wordmark center />
        <p className="mt-2 text-xs text-white/55">
          © {year} {course.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function PurchaseBanner() {
  const [status, setStatus] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("purchase");
    if (p === "success" || p === "cancelled") setStatus(p);
  }, []);

  if (!status || dismissed) return null;
  const success = status === "success";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={() => setDismissed(true)}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[color:var(--sage-deep)] p-8 text-center shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Close"
          className="absolute right-4 top-4 text-white/60 transition hover:text-white"
        >
          <X size={20} aria-hidden />
        </button>

        {success ? (
          <>
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white">
              <CheckCircle2 size={36} aria-hidden />
            </span>
            <h3 className="course-heading text-2xl text-white md:text-3xl">
              Payment received — thank you!
            </h3>
            <p className="mt-4 text-white/85">
              Your private course link is on its way —{" "}
              <strong className="font-medium text-white">check your inbox now</strong>.
              (If you don't see it in a minute, check your spam folder.)
            </p>
          </>
        ) : (
          <>
            <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white">
              <X size={32} aria-hidden />
            </span>
            <h3 className="course-heading text-2xl text-white md:text-3xl">
              Checkout cancelled
            </h3>
            <p className="mt-4 text-white/85">
              No charge was made. You can come back and enrol any time.
            </p>
          </>
        )}

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--sage-deep)] transition hover:brightness-95"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default function CoursePage() {
  return (
    <div className="course-scope relative min-h-screen text-white">
      <PurchaseBanner />
      <Hero />
      <FeatureBullets />
      <FeatureCards />
      <CauseSection />
      <Curriculum />
      <Learn />
      <Testimonials />
      <Access />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
