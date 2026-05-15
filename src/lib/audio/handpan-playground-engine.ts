import * as Tone from "tone";

export type PlaygroundNoteOptions = {
  duration?: Tone.Unit.Time;
  velocity?: number;
};

type ManifestPayload = {
  /** Root for sample URLs; default `/audio/handpan-samples/` */
  baseUrl?: string;
  /** Tone note string → filename relative to baseUrl */
  urls: Record<string, string>;
};

let freeverb: Tone.Freeverb | null = null;
let metalVoice: Tone.PolySynth<Tone.MetalSynth> | null = null;
let samplerVoice: Tone.Sampler | null = null;
let manifestProbeStarted = false;

let errorHandler: ((message: string) => void) | null = null;

export function setPlaygroundAudioErrorHandler(
  handler: ((message: string) => void) | null
): void {
  errorHandler = handler;
}

function reportError(message: string): void {
  errorHandler?.(message);
}

function getFreeverb(): Tone.Freeverb {
  if (!freeverb) {
    freeverb = new Tone.Freeverb({
      roomSize: 0.38,
      wet: 0.2,
    }).toDestination();
  }
  return freeverb;
}

function ensureMetalVoice(): Tone.PolySynth<Tone.MetalSynth> {
  if (metalVoice) return metalVoice;
  const poly = new Tone.PolySynth({
    maxPolyphony: 24,
    voice: Tone.MetalSynth,
    options: {
      volume: -12,
      envelope: {
        attack: 0.002,
        decay: 0.45,
        sustain: 0.06,
        release: 1.85,
      },
      harmonicity: 5.1,
      modulationIndex: 28,
      resonance: 3800,
      octaves: 1.45,
    },
  }).connect(getFreeverb());
  metalVoice = poly;
  return poly;
}

function getActiveInstrument():
  | Tone.PolySynth<Tone.MetalSynth>
  | Tone.Sampler {
  if (samplerVoice?.loaded) return samplerVoice;
  return ensureMetalVoice();
}

/** Resume AudioContext synchronously inside the same user gesture stack. */
function resumeContextSync(): void {
  if (typeof window === "undefined") return;
  const raw = Tone.getContext().rawContext;
  if (raw.state === "suspended") {
    void raw.resume();
  }
}

function scheduleSamplerManifestProbe(): void {
  if (manifestProbeStarted || typeof window === "undefined") return;
  manifestProbeStarted = true;
  void (async () => {
    try {
      const res = await fetch("/audio/handpan-samples/manifest.json", {
        cache: "default",
      });
      if (!res.ok) return;
      const data = (await res.json()) as ManifestPayload;
      if (!data.urls || typeof data.urls !== "object") return;

      const baseUrl =
        data.baseUrl != null && data.baseUrl.length > 0
          ? data.baseUrl.endsWith("/")
            ? data.baseUrl
            : `${data.baseUrl}/`
          : "/audio/handpan-samples/";

      const incoming = new Tone.Sampler({
        urls: data.urls,
        baseUrl,
        attack: 0.002,
        release: 0.4,
        onload: () => {
          try {
            if (metalVoice) {
              metalVoice.disconnect();
              metalVoice.dispose();
              metalVoice = null;
            }
            if (samplerVoice) {
              samplerVoice.disconnect();
              samplerVoice.dispose();
              samplerVoice = null;
            }
            incoming.connect(getFreeverb());
            samplerVoice = incoming;
          } catch (e) {
            incoming.dispose();
            reportError(
              e instanceof Error ? e.message : "Sampler swap failed"
            );
          }
        },
        onerror: (err) => {
          reportError(err.message);
          incoming.dispose();
        },
      });
    } catch {
      /* Missing manifest or network: stay on synthetic voice */
    }
  })();
}

/**
 * Play one note from a direct user gesture (pointer or key).
 * Avoids awaiting Tone.start() before the first trigger so strict autoplay policies stay satisfied.
 */
export function playHandpanNoteFromUserGesture(
  note: string,
  options?: PlaygroundNoteOptions
): void {
  resumeContextSync();
  void Tone.start();
  scheduleSamplerManifestProbe();

  try {
    const inst = getActiveInstrument();
    const duration = options?.duration ?? "8n";
    const velocity = options?.velocity ?? 0.88;
    inst.triggerAttackRelease(note, duration, undefined, velocity);
  } catch (e) {
    reportError(e instanceof Error ? e.message : "Audio playback failed");
  }
}

export async function ensurePlaygroundAudioReady(): Promise<void> {
  resumeContextSync();
  await Tone.start();
}

export function getPlaygroundAudioContextState(): AudioContextState {
  if (typeof window === "undefined") return "running";
  return Tone.getContext().rawContext.state;
}
