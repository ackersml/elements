import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nina K.",
    text: "Sustain is even across the ring. I compared against recordings from a few EU shops; this one arrived in tune and stayed there after a week of daily play.",
    rating: 5,
  },
  {
    name: "Oliver P.",
    text: "Packing was overbuilt in a good way. Tracking updated the same day the label printed. Support answered a scale question within a few hours.",
    rating: 5,
  },
  {
    name: "Maya L.",
    text: "First handpan purchase. The Kurd layout was explained clearly before I paid. No upsell noise, just the instrument and a clear delivery window.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-warm py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">
            Players who wanted{" "}
            <span className="text-gradient-gold italic">clarity</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Synthetic-style quotes for layout only; replace with verified reviews
            when you have them.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="space-y-4 rounded-xl border border-gold bg-gradient-card p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed italic text-secondary-foreground">
                &quot;{t.text}&quot;
              </p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
