/**
 * Schematic scale definitions for the virtual playground.
 * Field order is for UI and audition only; it does not imply a physical layout on a real instrument.
 *
 * Background art uses your catalog photos under `public/products/` (one image per preset).
 */
export type HandpanPlaygroundScale = {
  id: string;
  name: string;
  /** Photo under the pad from `public/` */
  backgroundImageSrc: string;
  /** Product PNGs are cutouts; use contain so the full instrument reads in the circle. */
  backgroundFit?: "contain" | "cover";
  /** Center (ding) pitch in Tone notation, e.g. "D3" */
  ding: string;
  /** Top-shell fields, clockwise from the top in the UI */
  fields: string[];
  /** Optional bottom notes (inner ring in the UI when present) */
  bottom?: string[];
};

export const HANDPAN_PLAYGROUND_SCALES: HandpanPlaygroundScale[] = [
  {
    id: "d-kurd-9",
    name: "D Kurd 9",
    backgroundImageSrc: "/products/d-kurd-12.png",
    backgroundFit: "contain",
    ding: "D3",
    fields: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4"],
  },
  {
    id: "f-low-pygmy",
    name: "F Low Pygmy",
    backgroundImageSrc: "/products/f-sharp-pygmy-17.png",
    backgroundFit: "contain",
    ding: "F3",
    fields: ["C4", "Db4", "Eb4", "F4", "Ab4", "Bb4", "C5", "Db5"],
    bottom: ["G3"],
  },
  {
    id: "c-sharp-hijaz",
    name: "C# Hijaz",
    backgroundImageSrc: "/products/c-sharp-pygmy-17.png",
    backgroundFit: "contain",
    ding: "C#3",
    fields: ["G#3", "A3", "C#4", "D#4", "E4", "F#4", "G#4"],
    bottom: ["B3"],
  },
  {
    id: "d-celtic-minor",
    name: "D Celtic Minor",
    backgroundImageSrc: "/products/d-kurd-10.png",
    backgroundFit: "contain",
    ding: "D3",
    fields: ["A3", "C4", "D4", "E4", "F4", "G4", "A4", "C5"],
  },
  {
    id: "a-magic-voyage",
    name: "A Magic Voyage",
    backgroundImageSrc: "/products/b-amara-9.png",
    backgroundFit: "contain",
    ding: "A2",
    fields: ["E3", "G3", "A3", "B3", "C4", "D4", "E4", "G4", "A4"],
  },
  {
    id: "e-la-sirena",
    name: "E La Sirena",
    backgroundImageSrc: "/products/f-sharp-pygmy-17.jpg",
    backgroundFit: "contain",
    ding: "E3",
    fields: ["B3", "D4", "E4", "F#4", "G4", "A4", "B4", "D5"],
  },
];
