import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  /** Image path under /public, e.g. "/images/handpan-lifestyle-2.jpg" */
  src: string;
  /** Opacity 0..1 — how visible the image is behind the dark wash. Default 0.18 */
  opacity?: number;
  /** Object-position for the image. Default "center" */
  position?: string;
  /** Override className for the wrapping div */
  className?: string;
  /** Render a stronger dark vignette at the bottom (useful when content sits low). Default false */
  vignetteBottom?: boolean;
};

/**
 * Full-bleed faded image backdrop for any section. Place inside a `relative` section.
 *
 * <section className="relative ...">
 *   <SectionBackdrop src="/images/handpan-lifestyle-2.jpg" />
 *   <div className="relative ...">content</div>
 * </section>
 */
export function SectionBackdrop({
  src,
  opacity = 0.18,
  position = "center",
  className,
  vignetteBottom = false,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        style={{ opacity, objectPosition: position }}
        className="object-cover"
      />
      {/* Light forest-green wash so the imagery shows through clearly; vertical fade keeps text legible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2f3a2e]/45 via-[#2f3a2e]/20 to-[#2f3a2e]/55" />
      {vignetteBottom && (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2f3a2e] to-transparent" />
      )}
    </div>
  );
}
