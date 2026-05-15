import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  aspect?: "square" | "4/3" | "video" | "21/9" | "3/4" | "4/5";
};

const aspectClass: Record<NonNullable<ProductPhotoProps["aspect"]>, string> = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  video: "aspect-video",
  "21/9": "aspect-[21/9]",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
};

export function ProductPhoto({
  src,
  alt,
  priority,
  sizes = "33vw",
  className,
  frameClassName,
  aspect = "square",
}: ProductPhotoProps) {
  return (
    <div className={cn("product-photo-frame", aspectClass[aspect], frameClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("product-photo", className)}
      />
    </div>
  );
}
