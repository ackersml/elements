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
let samplerVoice: Tone.Sampler | null = null;
let manifestProbeStarted = false;
/** One shared output for synthetic notes (warmer than raw destination). */
let playgroundMaster: GainNode | null = null;

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

/** Same pitch math as elements-your-sound-journey handpan-scales (Lovable). */
function noteToFreq(note: string): number {
  const m = /^([A-G])(b|#)?(\d)$/.exec(note);
  if (!m) return 440;
  const letters: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  let semis = letters[m[1]!]!;
  if (m[2] === "#") semis++;
  if (m[2] === "b") semis--;
  const octave = parseInt(m[3]!, 10);
  const midi = (octave + 1) * 12 + semis;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function getPlaygroundMaster(): GainNode {
  const ctx = Tone.getContext().rawContext;
  if (!playgroundMaster) {
    playgroundMaster = ctx.createGain();
    playgroundMaster.gain.value = 0.82;
    playgroundMaster.connect(ctx.destination);
  }
  return playgroundMaster;
}

/**
 * In-browser voice: triangle body + mild low-pass + quiet 2nd partial (fuller than pure sine).
 * WAV manifest, when present, still overrides via Tone.Sampler + Freeverb.
 */
function playSyntheticHandpanNote(
  note: string,
  options?: PlaygroundNoteOptions
): void {
  const ctx = Tone.getContext().rawContext;
  const f = noteToFreq(note);
  const t0 = ctx.currentTime;
  const out = getPlaygroundMaster();
  const isDing = options?.duration === "2n";
  const v = options?.velocity ?? 0.88;
  const peakBase = isDing ? 0.48 : 0.34;
  const peak = Math.min(0.62, peakBase + v * 0.11);
  const mainTail = t0 + (isDing ? 2.5 : 1.52);
  const attack = isDing ? 0.024 : 0.018;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(isDing ? 3800 : 4400, t0);
  lp.Q.setValueAtTime(0.65, t0);

  const gMain = ctx.createGain();
  gMain.gain.setValueAtTime(0.0001, t0);
  gMain.gain.exponentialRampToValueAtTime(peak, t0 + attack);
  gMain.gain.exponentialRampToValueAtTime(0.0005, mainTail);

  const o1 = ctx.createOscillator();
  o1.type = "triangle";
  o1.frequency.setValueAtTime(f, t0);
  o1.connect(lp).connect(gMain).connect(out);
  o1.start(t0);
  o1.stop(mainTail + 0.12);

  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.setValueAtTime(f * 2.01, t0);
  const g2 = ctx.createGain();
  const harmPeak = isDing ? 0.11 : 0.09;
  const harmTail = t0 + (isDing ? 1.85 : 1.05);
  g2.gain.setValueAtTime(0.0001, t0);
  g2.gain.exponentialRampToValueAtTime(harmPeak, t0 + 0.038);
  g2.gain.exponentialRampToValueAtTime(0.0005, harmTail);
  o2.connect(g2).connect(out);
  o2.start(t0);
  o2.stop(harmTail + 0.1);
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
      /* Missing manifest: stay on Lovable sine voice */
    }
  })();
}

/** Resume AudioContext synchronously inside the same user gesture stack. */
function resumeContextSync(): void {
  if (typeof window === "undefined") return;
  const raw = Tone.getContext().rawContext;
  if (raw.state === "suspended") {
    void raw.resume();
  }
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
    if (samplerVoice?.loaded) {
      const duration = options?.duration ?? "8n";
      const velocity = options?.velocity ?? 0.88;
      samplerVoice.triggerAttackRelease(
        note,
        duration,
        undefined,
        velocity
      );
      return;
    }
    playSyntheticHandpanNote(note, options);
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
