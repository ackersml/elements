import Image from "next/image";
import { Check } from "lucide-react";
import { product, formatPrice } from "@/lib/product";
import { CheckoutButton } from "./CheckoutButton";

const bulletPoints = [
  "D Kurd 10 layout — versatile for songwriters and improv",
  "Hand-tuned nitrided steel, stable under normal indoor humidity",
  "Padded gig bag included on studio tier (confirm variant in CJ)",
  "Insured carrier options at checkout",
  "Email updates at QC, label creation, and delivery",
];

export function ProductSection() {
  return (
    <section
      id="product"
      className="bg-gradient-warm py-24 lg:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl glow-gold">
              <Image
                src={product.images[0] ?? product.heroImageUrl}
                alt="Top view of a bronze handpan with tone fields around a central dome"
                width={800}
                height={600}
                className="h-auto w-full object-contain rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl tracking-tight">
              Studio{" "}
              <span className="text-gradient-gold italic">Handpan</span>
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.priceCents, product.currency)}
              </span>
              <span className="rounded border border-gold bg-secondary/50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Reference SKU
              </span>
            </div>

            <ul className="space-y-3">
              {bulletPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-secondary-foreground"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <CheckoutButton />
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Secure checkout with Stripe. Return policy and warranty text ship
              on your legal pages; mirror the clarity of specialist retailers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
