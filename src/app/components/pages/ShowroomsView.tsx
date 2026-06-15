"use client";

import { ArrowRight, CalendarClock, Volume2, Sofa, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import {
  MotionClipImage,
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";
import { PageHero } from "./PageHero";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: Sofa,
    title: "Quiet rooms, soft floors",
    body: "Spaces designed for listening, not selling. Sit, lie back, and let each instrument fill the room.",
  },
  {
    icon: CalendarClock,
    title: "Tuned time",
    body: "Visits run by appointment in phases, so every booking gets unhurried, dedicated time.",
  },
  {
    icon: Volume2,
    title: "Play before you decide",
    body: "Compare scales side by side and hear how each build settles in a real acoustic space.",
  },
  {
    icon: ShieldCheck,
    title: "Bench-ready instruments",
    body: "Everything on display is stored in humidity-controlled conditions and freshly voiced.",
  },
];

export function ShowroomsView() {
  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      <PageHero
        eyebrow="Audition rooms"
        title="Hear it before"
        titleAccent="you decide"
        sub="Our Bali showroom hosts private auditions by appointment. Quiet rooms, soft floors, no pressure, just time with the instruments."
        kicker={"Ubud, Gianyar \u00B7 Bali, Indonesia"}
        primaryCta={{ label: "Request a visit", href: "/contact" }}
        secondaryCta={{ label: "Browse instruments", href: "/products" }}
        backgroundImage="/images/handpan-lifestyle-2.jpg"
        floatImage="/images/collection/handpan-air.png"
        floatAlt="Elements handpan"
      />

      {/* What to expect */}
      <section className="section-band-dark section-padding md:py-36">
        <div className="container-x">
          <MotionReveal className="max-w-2xl">
            <p className="eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]">
              What to expect
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              A room built for listening
            </h2>
            <p className="mt-6 text-[color:var(--sandstone)]/75">
              Every visit is paced around you. Come to compare scales, feel the
              sustain, and find the voice that fits your space.
            </p>
          </MotionReveal>

          <MotionStagger
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-[color:var(--bronze-accent)]/40"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-lg border border-[color:var(--bronze-accent)]/25 bg-[color:var(--forest-moss)]/30 text-[color:var(--bronze-accent)] transition group-hover:bg-[color:var(--bronze-accent)]/10">
                    <Icon size={24} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-xl text-white">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--sandstone)]/70">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Location */}
      <section className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/handpan-lifestyle-11.jpg" opacity={0.05} />
        <div className="relative container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <MotionClipImage
            src="/images/handpan-lifestyle-9.jpg"
            alt="Elements showroom in Ubud, Bali"
            className="aspect-[4/5] rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <MotionReveal className="max-w-lg" delay={0.1}>
            <p className="eyebrow eyebrow-rule">The location</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
              Ubud, Bali
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/85">
              Set in Gianyar, our studio doubles as a workshop and audition space.
              Calendars open in phases, so request a window and we will confirm the
              logistics, including humidity-controlled storage and bench-ready
              instruments.
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                <dt className="smallcaps text-muted-foreground">Access</dt>
                <dd className="mt-1 text-foreground">By appointment only</dd>
              </div>
              <div className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                <dt className="smallcaps text-muted-foreground">Region</dt>
                <dd className="mt-1 text-foreground">Ubud, Gianyar, Bali</dd>
              </div>
              <div className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                <dt className="smallcaps text-muted-foreground">Booking</dt>
                <dd className="mt-1 text-foreground">Via the contact page</dd>
              </div>
              <div className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                <dt className="smallcaps text-muted-foreground">Sessions</dt>
                <dd className="mt-1 text-foreground">Auditions &amp; sound healing</dd>
              </div>
            </dl>
            <Link href="/contact" className="link-arrow mt-8 inline-flex">
              Request an audition slot <ArrowRight size={14} aria-hidden />
            </Link>
          </MotionReveal>
        </div>
      </section>

      {/* Remote option */}
      <section className="section-band-accent section-padding md:py-36">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-rule">Cannot travel?</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
              Remote voicing checks
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/85">
              If a visit is not practical, we run remote voicing checks over video.
              You hear the candidate instruments played in our room, ask questions,
              and choose with the same confidence as an in-person audition.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-white p-8 md:p-10">
              <p className="font-display text-2xl">Start a remote session</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Tell us the scales you are weighing and your time zone. We will
                schedule a live listen.
              </p>
              <Link href="/contact" className="btn-pill btn-primary mt-7">
                Arrange a listen <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
