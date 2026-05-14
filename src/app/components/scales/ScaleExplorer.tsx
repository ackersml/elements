"use client";

import * as Tone from "tone";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SCALES: { name: string; notes: string[] }[] = [
  { name: "D Kurd", notes: ["D3", "A3", "C4", "D4", "E4", "F4", "G4", "A4"] },
  { name: "C Major", notes: ["C3", "E3", "G3", "C4", "E4", "G4", "C5"] },
  { name: "E Amara", notes: ["E3", "G3", "B3", "D4", "E4", "G4", "B4"] },
];

export function ScaleExplorer() {
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(false);

  async function playChord() {
    await Tone.start();
    setPlaying(true);
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const scale = SCALES[sel];
    synth.triggerAttackRelease(scale.notes, "2n", undefined, 0.35);
    setTimeout(() => setPlaying(false), 1200);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="flex min-h-[280px] items-center justify-center border border-border/40 bg-secondary/10 p-8">
        <p className="font-display text-2xl text-muted-foreground md:text-4xl">
          {SCALES[sel].name}
        </p>
      </div>
      <aside className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Scales
        </p>
        <ul className="space-y-2">
          {SCALES.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => setSel(i)}
                className={cn(
                  "w-full border border-transparent px-3 py-2 text-left font-display text-xl tracking-tight transition hover:border-border",
                  sel === i && "border-primary text-primary"
                )}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => void playChord()}
          disabled={playing}
          className="mt-4 w-full border border-primary bg-primary px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
        >
          {playing ? "Playing…" : "Play chord in scale"}
        </button>
        <p className="text-xs text-muted-foreground">
          Uses Tone.js on client — connect speakers for audition.
        </p>
      </aside>
    </div>
  );
}
