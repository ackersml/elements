"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

function ModelPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#5c4a3a" metalness={0.9} roughness={0.3} />
    </mesh>
  );
}

type Props = {
  product: Product;
};

export function ProductModelSection({ product }: Props) {
  const [active, setActive] = useState(0);
  if (product.modelUrl) {
    return (
      <p className="text-sm text-muted-foreground">
        GLB at {product.modelUrl} — wire to &lt;Model /&gt; when asset is in /public.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="relative aspect-square border border-border/50">
        <Image
          src={product.images[0] ?? product.heroImageUrl}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="h-[min(400px,50vh)] w-full border border-border/30">
        <Canvas camera={{ position: [0, 0, 3.2] }} className="h-full w-full">
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 4, 3]} intensity={1.1} />
          <Suspense fallback={null}>
            <ModelPlaceholder />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableDamping minDistance={2} maxDistance={5} />
        </Canvas>
        <p className="p-2 text-center text-[10px] text-muted-foreground">
          3D preview placeholder — Draco GLB + tone hotspots next
        </p>
        {product.audioSamples.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {product.audioSamples.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "border border-border px-2 py-1 text-xs",
                  active === i && "border-primary text-primary"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
