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
 * Default sound: triangle + partials on the shared AudioContext (ding gets a longer
 * ring). Optional WAV pack: `public/audio/handpan-samples/manifest.json`.
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
