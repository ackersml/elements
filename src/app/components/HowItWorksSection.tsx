import { Search, CreditCard, Hammer, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Pick your instrument",
    description:
      "Start with the studio model below or ask us about other scales and note counts. Product pages stay tied to one SKU for clean checkout and fulfillment.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Pay securely",
    description:
      "Stripe Checkout handles card details. You enter shipping and contact data; we store the order in Supabase when payment completes.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Build slot / QC",
    description:
      "Each pan is checked for sustain, symmetry, and tuning stability before it leaves. If a batch is delayed, we email with a revised window.",
  },
  {
    icon: Package,
    step: "04",
    title: "Ship and track",
    description:
      "You receive tracking when the label exists. Use the track page with your email plus order or session id.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-6 inline-block rounded-full border border-gold bg-secondary/50 px-4 py-1.5 text-sm uppercase tracking-wide text-muted-foreground">
            End-to-end
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
            How it <span className="text-gradient-gold italic">works</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From checkout to tracking, the flow stays transparent: you pay, we
            confirm build and shipping, then you follow the package online.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                  i % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
              >
                <div
                  className={`rounded-xl border border-gold bg-gradient-card p-8 transition-all duration-500 hover:border-primary/40 group ${
                    i % 2 === 0
                      ? "lg:col-start-1 lg:text-right"
                      : "lg:col-start-2 lg:text-left"
                  }`}
                >
                  <div
                    className={`mb-4 flex items-center gap-4 ${
                      i % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-display text-2xl font-bold text-primary opacity-40">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary lg:flex" />

                <div
                  className={`hidden lg:block ${
                    i % 2 === 0
                      ? "lg:col-start-2"
                      : "lg:col-start-1 lg:row-start-1"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
