import { Music, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Scales explained",
    description:
      "We label each listing with scale character and note layout so you can compare Kurd, Pygmy, and other layouts without guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Insured shipping",
    description:
      "Instruments travel in protective packaging with insured options where available, so damage in transit is handled properly.",
  },
  {
    icon: Truck,
    title: "Worldwide delivery",
    description:
      "Checkout collects a full shipping address; we align carriers and customs paperwork for major regions.",
  },
  {
    icon: HeadphonesIcon,
    title: "After-sale support",
    description:
      "Questions about care, humidity, or tuning stability get a direct line to our team, not a generic help desk.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-gradient-warm py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
            Built like a{" "}
            <span className="text-gradient-gold italic">serious</span> shop
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The same operational ideas you see on large handpan retailers: clear
            policies, careful packing, and honest product copy.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gold bg-gradient-card p-8 transition-all duration-500 hover:border-primary/40 group"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
