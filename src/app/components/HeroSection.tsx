import Image from "next/image";
import { product, formatPrice } from "@/lib/product";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-warm">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-up space-y-8 text-center lg:text-left">
            <div className="inline-block rounded-full border border-gold bg-secondary/50 px-4 py-1.5 text-sm uppercase tracking-wide text-muted-foreground">
              ✨ The Perfect Gift
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Turn Your Photos Into a{" "}
              <span className="text-gradient-gold italic">Magical</span> Flipbook
            </h1>
            <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground sm:mx-0 sm:text-xl lg:mx-0">
              A hand-cranked wooden frame that brings your favourite memories to
              life. Upload your photos — we create the movie.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#product"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 glow-gold"
              >
                Order Yours Now — {formatPrice(product.priceCents, product.currency)}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-gold px-8 py-4 font-medium text-foreground transition-all duration-300 hover:bg-secondary"
              >
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span> Free Shipping
              </span>
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span> 90-Day Returns
              </span>
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span> 5,000+ Happy Customers
              </span>
            </div>
          </div>

          <div
            className="relative animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative overflow-hidden rounded-2xl glow-gold">
              <Image
                src={product.heroImageUrl}
                alt="Custom Photo Flipbook Frame — hand-cranked animation machine bringing your photos to life"
                width={800}
                height={600}
                className="h-auto w-full rounded-2xl animate-float"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-gold bg-card px-5 py-3 shadow-2xl">
              <p className="text-lg font-bold text-primary">43% OFF</p>
              <p className="text-xs text-muted-foreground">Limited Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
