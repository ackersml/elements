"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import {
  MotionClipImage,
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";
import {
  brandElements,
  formatElementTagline,
} from "@/lib/brand/elements-brand";
import { PageHero } from "./PageHero";

const ELEMENT_IMAGE: Partial<Record<string, string>> = {
  earth: "/images/canva/elements/earth.webp",
  fire: "/images/canva/elements/fire.webp",
  air: "/images/canva/elements/air.webp",
  water: "/images/canva/elements/water.webp",
  space: "/images/canva/elements/space.webp",
};

const values = [
  {
    title: "Craft over volume",
    body: "Build slots open monthly. Each instrument is hand-allocated by our luthiers rather than mass produced.",
  },
  {
    title: "Honest sound",
    body: "We document how every build leaves the bench and how it should settle in your room, with no marketing buffers.",
  },
  {
    title: "Education first",
    body: "Scale guides, recordings, and builder interviews so you can choose with understanding, not pressure.",
  },
  {
    title: "Care after delivery",
    body: "A two-year tuning guarantee and remote voicing checks keep your handpan in tune for the long arc.",
  },
];

export function AboutView() {
  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      <PageHero
        eyebrow="Our story"
        title="Crafted for presence,"
        titleAccent="tuned for stillness"
        sub="Elements began with a single question: how do you make an instrument that helps people return to themselves? Every handpan we offer is chosen to bring calm, clarity, and balance."
        kicker={"Silence \u00B7 Presence \u00B7 Source"}
        primaryCta={{ label: "See the instruments", href: "/products" }}
        secondaryCta={{ label: "Talk to us", href: "/contact" }}
        backgroundImage="/images/sound-healing-2.jpg"
        floatImage="/images/collection/handpan-air.png"
        floatAlt="Elements handpan"
      />

      {/* Vision / mission */}
      <section className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/handpan-lifestyle-4.jpg" opacity={0.05} />
        <div className="relative container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-rule">The vision</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
              An emotionally resonant, spiritually grounded handpan brand
            </h2>
          </div>
          <div className="space-y-6 text-foreground/85 lg:col-span-7">
            <p className="text-lg leading-relaxed">
              To create one of the world&apos;s most emotionally resonant,
              spiritually grounded, and visually refined handpan brands, merging
              craftsmanship, sound healing, and elemental symbolism.
            </p>
            <MotionStagger className="grid gap-6 pt-2 sm:grid-cols-3" staggerDelay={0.12}>
              {[
                "Offer high-quality handpans accessible to a global audience",
                "Create meaning through elements, sound, and story",
                "Build long-term trust through education, transparency, and artistry",
              ].map((line, i) => (
                <div key={line} className="border-l-2 border-[color:var(--sale-bg)] pl-4">
                  <p className="smallcaps text-[color:var(--sale-bg)]">
                    Mission {i + 1}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {line}
                  </p>
                </div>
              ))}
            </MotionStagger>
          </div>
        </div>
      </section>

      {/* Elements */}
      <section className="section-band-dark section-padding md:py-36">
        <div className="container-x">
          <MotionReveal className="max-w-2xl">
            <p className="eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]">
              The elemental system
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl">
              Five elements, one language
            </h2>
            <p className="mt-6 text-[color:var(--sandstone)]/75">
              Our graphic system is built on five foundational symbols, Earth,
              Water, Fire, Air, and Space. Each scale is mapped to an element, so
              you can choose by feeling first and theory second.
            </p>
          </MotionReveal>

          <MotionStagger
            className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
            staggerDelay={0.1}
          >
            {brandElements.map((el) => {
              const image = ELEMENT_IMAGE[el.id];
              return (
                <div
                  key={el.id}
                  className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:border-[color:var(--bronze-accent)]/40"
                >
                  <div className="relative mx-auto grid aspect-square w-24 place-items-center">
                    {image ? (
                      <MotionClipImage
                        src={image}
                        alt={el.name}
                        className="h-full w-full [&_img]:!object-contain"
                        sizes="120px"
                      />
                    ) : (
                      <span className="font-display text-4xl text-[color:var(--bronze-accent)]">
                        {el.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-xl text-white">{el.name}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-[color:var(--bronze-accent)]">
                    {formatElementTagline(el.id)}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-[color:var(--sandstone)]/65">
                    {el.description}
                  </p>
                </div>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/sound-healing-15.jpg" opacity={0.05} />
        <div className="relative container-x">
          <MotionReveal className="mb-12 max-w-2xl md:mb-16">
            <p className="eyebrow eyebrow-rule">What we stand for</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
              Slow commerce, made deliberately
            </h2>
          </MotionReveal>
          <MotionStagger className="grid gap-5 sm:grid-cols-2" staggerDelay={0.1}>
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-lg border border-border bg-[color:var(--surface-muted)] p-8 md:p-10"
              >
                <h3 className="font-display text-xl md:text-2xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/80">{v.body}</p>
              </div>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* Maker note */}
      <section className="section-band-accent section-padding md:py-36">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <MotionClipImage
            src="/images/handpan-lifestyle-9.jpg"
            alt="The Elements workshop in Bali"
            className="aspect-[4/5] rounded-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <MotionReveal className="max-w-lg" delay={0.1}>
            <p className="eyebrow eyebrow-rule">From the bench</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
              Built in Bali, voiced by hand
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/85">
              Our workshop sits in Ubud, Gianyar: humidity-controlled rooms where
              instruments are tuned, rested, and re-checked before they travel.
              Nothing ships until it holds its voice.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Dany Rud &middot; Owner &middot; Elements &mdash; Handpan &amp; Sound Healing
            </p>
            <Link href="/showrooms" className="link-arrow mt-8 inline-flex">
              Visit a showroom <ArrowRight size={14} aria-hidden />
            </Link>
          </MotionReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
