"use client";

import {
  ensurePlaygroundAudioReady,
  playHandpanNoteFromUserGesture,
  setPlaygroundAudioErrorHandler,
  type PlaygroundNoteOptions,
} from "@/lib/audio/handpan-playground-engine";
import { useCallback, useEffect, useState } from "react";

/**
 * React binding for the module singleton in `handpan-playground-engine`.
 * Optional WAV pack: add `public/audio/handpan-samples/manifest.json` with
 * `{ "baseUrl": "/audio/handpan-samples/", "urls": { "D3": "D3.wav", ... } }`.
 */
export function useHandpanAudio() {
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    setPlaygroundAudioErrorHandler(setAudioError);
    return () => setPlaygroundAudioErrorHandler(null);
  }, []);

  const playNote = useCallback(
    (note: string, options?: PlaygroundNoteOptions) => {
      playHandpanNoteFromUserGesture(note, options);
    },
    []
  );

  const ensureStarted = useCallback(() => ensurePlaygroundAudioReady(), []);

  const clearAudioError = useCallback(() => setAudioError(null), []);

  return { playNote, ensureStarted, audioError, clearAudioError };
}
