"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function BronzeProbe() {
  return (
      <mesh rotation={[0.35, 0.6, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#7a7062"
        metalness={0.62}
        roughness={0.44}
        envMapIntensity={0.72}
      />
    </mesh>
  );
}

export default function HandpanHeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.45], fov: 42 }}
      className="h-[min(520px,68vh)] w-full touch-none bg-transparent"
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.26} />
      <directionalLight castShadow position={[3.5, 5, 4]} intensity={0.88} />
      <Suspense fallback={null}>
        <BronzeProbe />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-1.1}
        maxAzimuthAngle={1.1}
      />
    </Canvas>
  );
}
