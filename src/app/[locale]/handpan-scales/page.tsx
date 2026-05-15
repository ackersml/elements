import { VirtualHandpanPlayground } from "@/app/components/scales/VirtualHandpanPlayground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handpan scales playground",
  description:
    "Try handpan scales in the browser with photos behind the pad, synthetic or sampled audio, and an illustrative note layout.",
};

export default function HandpanScalesPage() {
  return (
    <div className="border-b border-border py-16 md:py-24">
      <div className="container-x max-w-[1100px]">
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          Scale playground
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Tap the ding, fields, and optional bottom notes, or focus the pad and
          use number keys. Each scale uses a catalogue or lifestyle photo behind
          the pad for atmosphere. Sound starts as a synthetic voice with light
          reverb; add WAVs plus{" "}
          <code className="rounded border border-border/50 px-1 font-mono text-xs">
            manifest.json
          </code>{" "}
          under{" "}
          <code className="rounded border border-border/50 px-1 font-mono text-xs">
            /audio/handpan-samples/
          </code>{" "}
          to switch to one-shot samples when they load.
        </p>
        <aside className="mt-6 max-w-2xl border border-border/40 bg-secondary/10 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong className="font-medium text-foreground">Illustrative layout.</strong>{" "}
          Note positions on screen follow a simple circle for exploration only.
          They do not match any single maker&apos;s physical layout, and a scale
          you enjoy here is not a guarantee that it can be built or sourced as a
          real handpan. Instrument photos may not match the named scale on every
          preset.
        </aside>
        <div className="mt-12">
          <VirtualHandpanPlayground />
        </div>
      </div>
    </div>
  );
}
