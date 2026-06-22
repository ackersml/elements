"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";
import { useCartStore } from "@/lib/cart-store";
import {
  formatProductDisplay,
  type Product,
  type StockStatus,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import {
  MotionBorderGrow,
  MotionIotmImage,
  MotionIotmStagger,
  MotionMagnetic,
} from "@/app/components/home/motion/motion-primitives";
import { useReducedMotion } from "@/app/components/home/motion/useReducedMotion";

type InstrumentOfMonthSectionProps = {
  product: Product;
  limitedLabel: string;
  titleId: string;
};

const STAGGER_STEP = 0.12;
const IOTM_BACKDROP = "/images/handpan-lifestyle-14.jpg";

function stockLabel(status: StockStatus): string {
  if (status === "in_stock") return "Ready to ship";
  if (status === "preorder") return "Pre-order";
  return "Sold out";
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="iotm-spec-chip">
      <dt className="iotm-spec-chip-label">{label}</dt>
      <dd className="iotm-spec-chip-value">{value}</dd>
    </div>
  );
}

export function InstrumentOfMonthSection({
  product,
  limitedLabel,
  titleId,
}: InstrumentOfMonthSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "150px 0px" });
  const reduced = useReducedMotion();
  const active = reduced || inView;
  const currency = useCartStore((s) => s.currency);
  const price = formatProductDisplay(product.priceCents, currency);
  const [titleLead, ...titleRest] = product.title.split(" \u2014 ");
  const titleTail = titleRest.join(" \u2014 ");

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className="iotm-feature relative overflow-hidden border-b border-white/10 section-band-dark"
    >
      <div className="iotm-feature-atmosphere" aria-hidden />
      <div className="grain elements-grain" aria-hidden />

      <div className="relative container-x py-20 md:py-28 lg:py-32">
        <MotionIotmStagger active={active} delay={0}>
          <div className="iotm-feature-masthead">
            <div>
              <p className="eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]">
                Instrument of the month
              </p>
              <p className="mt-2 font-display text-sm uppercase tracking-[0.35em] text-white/35">
                Featured selection
              </p>
            </div>
            <span className="iotm-feature-badge">{limitedLabel}</span>
          </div>
        </MotionIotmStagger>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="relative lg:col-span-7">
            <p className="iotm-feature-watermark font-display" aria-hidden>
              {product.scale}
            </p>

            <div className="iotm-feature-visual">
              <div className="iotm-feature-lifestyle">
                <Image
                  src={IOTM_BACKDROP}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="iotm-feature-lifestyle-shade" aria-hidden />
                <div className="iotm-feature-corner iotm-feature-corner--tl" aria-hidden />
                <div className="iotm-feature-corner iotm-feature-corner--br" aria-hidden />
              </div>

              <MotionIotmImage
                src={product.heroImageUrl}
                alt={product.title}
                active={active}
                className="iotm-feature-product"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:-ml-6 xl:-ml-10">
            <div className="iotm-feature-panel">
              <MotionIotmStagger active={active} delay={STAGGER_STEP}>
                <p className="smallcaps text-[color:var(--sale-bg)]">
                  {product.maker}
                </p>
              </MotionIotmStagger>

              <MotionIotmStagger active={active} delay={STAGGER_STEP * 2}>
                <h2
                  id={titleId}
                  className="mt-3 font-display text-3xl leading-[1.06] tracking-tight text-[color:var(--ink)] md:text-4xl xl:text-[2.65rem]"
                >
                  {titleTail ? (
                    <>
                      <span className="block">{titleLead}</span>
                      <span className="bronze-text mt-1 block text-[0.92em]">
                        {titleTail}
                      </span>
                    </>
                  ) : (
                    product.title
                  )}
                </h2>
              </MotionIotmStagger>

              <MotionIotmStagger active={active} delay={STAGGER_STEP * 3}>
                <dl className="iotm-spec-grid mt-6">
                  <SpecChip label="Scale" value={product.scale} />
                  <SpecChip label="Notes" value={`${product.noteCount}`} />
                  <SpecChip label="Size" value={product.dimensionsCm} />
                  <SpecChip
                    label="Weight"
                    value={`${product.weightKg} kg`}
                  />
                </dl>
              </MotionIotmStagger>

              <MotionIotmStagger active={active} delay={STAGGER_STEP * 4}>
                <MotionBorderGrow className="mt-7">
                  <p className="text-base leading-relaxed text-foreground/80 md:text-[1.05rem]">
                    {product.description}
                  </p>
                </MotionBorderGrow>
              </MotionIotmStagger>

              <MotionIotmStagger active={active} delay={STAGGER_STEP * 5}>
                <div className="iotm-feature-footer">
                  <div>
                    <p className="smallcaps text-muted-foreground">From</p>
                    <p className="font-display text-2xl text-[color:var(--ink)] md:text-3xl">
                      {price}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs font-semibold uppercase tracking-[0.14em]",
                        product.stockStatus === "in_stock"
                          ? "text-[color:var(--forest-moss)]"
                          : "text-muted-foreground"
                      )}
                    >
                      {stockLabel(product.stockStatus)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <MotionMagnetic>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="btn-pill btn-primary inline-flex"
                      >
                        View instrument <ArrowRight size={16} aria-hidden />
                      </Link>
                    </MotionMagnetic>
                    <QuickBuyButton slug={product.slug} />
                  </div>
                </div>
              </MotionIotmStagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
