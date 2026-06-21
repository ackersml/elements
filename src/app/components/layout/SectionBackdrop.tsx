import Image from "next/image";
import { cn } from "@/lib/utils";

type Tint = "white" | "cream" | "forest" | "sandstone";

type Props = {
  src: string;
  opacity?: number;
  position?: string;
  className?: string;
  vignetteBottom?: boolean;
  tint?: Tint;
};

const tintOverlay: Record<Tint, string> = {
  white: "from-white/80 via-white/60 to-white/90",
  cream: "from-[#fff7f2]/88 via-[#fff7f2]/72 to-[#fff7f2]/92",
  forest: "from-[#2f3a2e]/82 via-[#2f3a2e]/55 to-[#2f3a2e]/78",
  sandstone: "from-[#e8decf]/85 via-[#e8decf]/65 to-[#e8decf]/88",
};

export function SectionBackdrop({
  src,
  opacity = 0.12,
  position = "center",
  className,
  vignetteBottom = false,
  tint = "white",
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
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          tintOverlay[tint]
        )}
      />
      {vignetteBottom ? (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
      ) : null}
    </div>
  );
}
