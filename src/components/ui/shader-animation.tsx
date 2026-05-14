"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ShaderAnimationProps = {
  className?: string;
};

/**
 * Full-viewport procedural shader, colour-mapped to Elements brand
 * (forest #2d362e, cream #e8e3d5, accent #c9bc9f). Intended as a subtle hero backdrop.
 */
export function ShaderAnimation({ className }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.04;
        float lineWidth = 0.0014;

        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        vec3 dark = vec3(0.176, 0.211, 0.180);
        vec3 accent = vec3(0.788, 0.737, 0.624);
        vec3 cream = vec3(0.910, 0.890, 0.835);

        float energy = clamp((color.r + color.g + color.b) * 0.26, 0.0, 1.0);
        vec3 glow = mix(dark, accent, energy);
        glow = mix(glow, cream, energy * energy * 0.32);

        gl_FragColor = vec4(glow, 1.0);
      }
    `;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms: Record<string, THREE.IUniform> = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const raf = { id: 0 };

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    container.appendChild(renderer.domElement);
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    const tick = () => {
      uniforms.time.value += reduced ? 0.015 : 0.035;
      renderer.render(scene, camera);
      if (!reduced) {
        raf.id = window.requestAnimationFrame(tick);
      }
    };

    if (!reduced) {
      raf.id = window.requestAnimationFrame(tick);
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize, false);
      window.cancelAnimationFrame(raf.id);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "pointer-events-none h-full min-h-[min(520px,68vh)] w-full"}
      aria-hidden
    />
  );
}
