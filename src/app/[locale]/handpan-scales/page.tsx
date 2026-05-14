import { ScaleExplorer } from "@/app/components/scales/ScaleExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handpan scales explorer",
  description:
    "Interactive reference for common handpan scales — chord playback via Tone.js.",
};

export default function HandpanScalesPage() {
  return (
    <div className="border-b border-border/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          Scale explorer
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Three reference scales. Select a name, then play a slow chord. Full 3D
          handpan layout with labeled fields is a follow-up when the mesh is
          available.
        </p>
        <div className="mt-12">
          <ScaleExplorer />
        </div>
      </div>
    </div>
  );
}
