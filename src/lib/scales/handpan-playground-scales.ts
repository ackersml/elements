/**
 * Schematic scale definitions for the virtual playground.
 * Field order is for UI and audition only; it does not imply a physical layout on a real instrument.
 */
export type HandpanPlaygroundScale = {
  id: string;
  name: string;
  /** Hero-style photo under the pad (illustrative; may not match scale name 1:1). */
  backgroundImageSrc: string;
  /** Center (ding) pitch in Tone notation, e.g. "D3" */
  ding: string;
  /** Top-shell fields, clockwise from the top in the UI */
  fields: string[];
  /** Optional bottom notes (inner ring in the UI when present) */
  bottom?: string[];
};

export const HANDPAN_PLAYGROUND_SCALES: HandpanPlaygroundScale[] = [
  {
    id: "d-kurd",
    name: "D Kurd",
    backgroundImageSrc: "/products/d-kurd-10.png",
    ding: "D3",
    fields: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4"],
  },
  {
    id: "c-major",
    name: "C Major",
    backgroundImageSrc: "/products/d-kurd-12.png",
    ding: "C3",
    fields: ["E3", "G3", "C4", "E4", "G4", "C5", "D4"],
  },
  {
    id: "e-amara",
    name: "E Amara",
    backgroundImageSrc: "/images/handpan-lifestyle-field.png",
    ding: "E3",
    fields: ["G3", "B3", "D4", "E4", "G4", "B4", "C4"],
  },
  {
    id: "b-amara",
    name: "B Amara",
    backgroundImageSrc: "/products/b-amara-9.png",
    ding: "B2",
    fields: ["D#3", "F#3", "A3", "B3", "D#4", "F#4", "A4"],
  },
  {
    id: "d-celtic-minor",
    name: "D Celtic minor",
    backgroundImageSrc: "/products/d-kurd-10.png",
    ding: "D3",
    fields: ["A3", "C4", "D4", "E4", "F4", "G4", "A4"],
  },
  {
    id: "f-pygmy",
    name: "F Pygmy",
    backgroundImageSrc: "/products/f-sharp-pygmy-17.png",
    ding: "F3",
    fields: ["Ab3", "C4", "Eb4", "F4", "G4", "Ab4", "C5"],
  },
  {
    id: "d-kurd-bottom",
    name: "D Kurd (with bottom)",
    backgroundImageSrc: "/products/d-kurd-10.png",
    ding: "D3",
    fields: ["A3", "Bb3", "C4", "D4", "E4", "F4", "G4", "A4"],
    bottom: ["A2", "C3"],
  },
];
