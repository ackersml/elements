import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  opacity?: number;
  position?: string;
  className?: string;
  vignetteBottom?: boolean;
};

export function SectionBackdrop({
  src,
  opacity = 0.12,
  position = "center",
  className,
  vignetteBottom = false,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
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
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      {vignetteBottom && (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  );
}
