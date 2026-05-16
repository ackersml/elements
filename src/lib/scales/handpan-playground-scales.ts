/**
 * Schematic scale definitions for the virtual playground.
 * Field order is for UI and audition only; it does not imply a physical layout on a real instrument.
 *
 * Presets aligned with github.com/ackersml/elements-your-sound-journey (Lovable export).
 */
export type HandpanPlaygroundScale = {
  id: string;
  name: string;
  /** Hero-style photo under the pad (illustrative; may not match scale name 1:1). */
  backgroundImageSrc: string;
  /** Match Lovable `object-cover` for full-bleed photos; default `contain` for cutout PNGs. */
  backgroundFit?: "contain" | "cover";
  /** Center (ding) pitch in Tone notation, e.g. "D3" */
  ding: string;
  /** Top-shell fields, clockwise from the top in the UI */
  fields: string[];
  /** Optional bottom notes (inner ring in the UI when present) */
  bottom?: string[];
};

const LOVABLE_PLAYGROUND_BG = "/images/cat-handpan.jpg";

export const HANDPAN_PLAYGROUND_SCALES: HandpanPlaygroundScale[] = [
  {
    id: "d-kurd-9",
    name: "D Kurd 9",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "D3",
    fields: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4"],
  },
  {
    id: "f-low-pygmy",
    name: "F Low Pygmy",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "F3",
    fields: ["C4", "Db4", "Eb4", "F4", "Ab4", "Bb4", "C5", "Db5"],
    bottom: ["G3"],
  },
  {
    id: "c-sharp-hijaz",
    name: "C# Hijaz",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "C#3",
    fields: ["G#3", "A3", "C#4", "D#4", "E4", "F#4", "G#4"],
    bottom: ["B3"],
  },
  {
    id: "d-celtic-minor",
    name: "D Celtic Minor",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "D3",
    fields: ["A3", "C4", "D4", "E4", "F4", "G4", "A4", "C5"],
  },
  {
    id: "a-magic-voyage",
    name: "A Magic Voyage",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "A2",
    fields: ["E3", "G3", "A3", "B3", "C4", "D4", "E4", "G4", "A4"],
  },
  {
    id: "e-la-sirena",
    name: "E La Sirena",
    backgroundImageSrc: LOVABLE_PLAYGROUND_BG,
    backgroundFit: "cover",
    ding: "E3",
    fields: ["B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5"],
  },
];
