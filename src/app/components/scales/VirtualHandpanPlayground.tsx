"use client";

import {
  HANDPAN_PLAYGROUND_SCALES,
  type HandpanPlaygroundScale,
} from "@/lib/scales/handpan-playground-scales";
import { getPlaygroundAudioContextState } from "@/lib/audio/handpan-playground-engine";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useHandpanAudio } from "./useHandpanAudio";

type Slot = {
  id: string;
  note: string;
  role: "ding" | "field" | "bottom";
};

const DIGIT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as const;
const LETTER_KEYS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"] as const;

function buildSlots(scale: HandpanPlaygroundScale): Slot[] {
  const slots: Slot[] = [
    { id: "ding", note: scale.ding, role: "ding" },
    ...scale.fields.map((note, i) => ({
      id: `f-${i}`,
      note,
      role: "field" as const,
    })),
    ...(scale.bottom ?? []).map((note, i) => ({
      id: `b-${i}`,
      note,
      role: "bottom" as const,
    })),
  ];
  return slots;
}

function buildKeyToSlotId(slots: Slot[]): ReadonlyMap<string, string> {
  const m = new Map<string, string>();
  const keys = [...DIGIT_KEYS, ...LETTER_KEYS];
  for (let i = 0; i < slots.length && i < keys.length; i++) {
    m.set(keys[i]!, slots[i]!.id);
  }
  return m;
}

function polarToOffset(
  index: number,
  count: number,
  radiusPx: number
): { x: number; y: number } {
  if (count <= 0) return { x: 0, y: 0 };
  const deg = -90 + (360 / count) * index;
  const rad = (deg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radiusPx,
    y: Math.sin(rad) * radiusPx,
  };
}

export function VirtualHandpanPlayground() {
  const [scaleIndex, setScaleIndex] = useState(0);
  const scale = HANDPAN_PLAYGROUND_SCALES[scaleIndex]!;
  const slots = useMemo(() => buildSlots(scale), [scale]);
  const keyToSlotId = useMemo(() => buildKeyToSlotId(slots), [slots]);

  const { playNote, ensureStarted, audioError, clearAudioError } =
    useHandpanAudio();
  const [audioHelpOpen, setAudioHelpOpen] = useState(false);

  useEffect(() => {
    setAudioHelpOpen(getPlaygroundAudioContextState() === "suspended");
  }, []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((id: string) => {
    setActiveId(id);
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => setActiveId(null), 220);
  }, []);

  const triggerSlot = useCallback(
    (slot: Slot) => {
      const duration =
        slot.role === "ding" ? ("2n" as const) : ("8n" as const);
      const velocity = slot.role === "ding" ? 0.92 : 0.86;
      playNote(slot.note, { duration, velocity });
      flash(slot.id);
      if (getPlaygroundAudioContextState() === "running") {
        setAudioHelpOpen(false);
      }
    },
    [flash, playNote]
  );

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const slotId = keyToSlotId.get(k);
      if (!slotId) return;
      const slot = slots.find((s) => s.id === slotId);
      if (!slot) return;
      e.preventDefault();
      triggerSlot(slot);
    },
    [keyToSlotId, slots, triggerSlot]
  );

  const fieldCount = scale.fields.length;
  const bottomCount = scale.bottom?.length ?? 0;
  const fieldR = bottomCount > 0 ? 132 : 148;
  const bottomR = 78;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div
        role="application"
        aria-label="Virtual handpan: tap notes or use keyboard digits 1–0 and Q–P"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="elements-grain outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {audioError ? (
          <div
            role="alert"
            className="mb-3 flex flex-wrap items-center justify-between gap-2 border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-foreground"
          >
            <span>{audioError}</span>
            <button
              type="button"
              onClick={clearAudioError}
              className="shrink-0 border border-border px-2 py-1 uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {audioHelpOpen ? (
          <div className="mb-3 flex flex-wrap items-center gap-2 border border-border/60 bg-secondary/20 px-3 py-2 text-xs text-muted-foreground">
            <span>Browser audio is paused. Unlock once, then tap notes.</span>
            <button
              type="button"
              className="border border-primary px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary"
              onClick={() => {
                void ensureStarted().then(() => {
                  setAudioHelpOpen(
                    getPlaygroundAudioContextState() !== "running"
                  );
                });
              }}
            >
              Unlock audio
            </button>
          </div>
        ) : null}

        <div
          className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full border border-border/40 bg-secondary/20"
          style={{ minHeight: "min(85vmin, 420px)" }}
        >
          <Image
            key={scale.id}
            src={scale.backgroundImageSrc}
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            className={cn(
              "pointer-events-none z-0 select-none",
              scale.backgroundFit === "cover"
                ? "object-cover"
                : "object-contain p-6"
            )}
            aria-hidden
            priority={scaleIndex === 0}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/30 to-background/70"
            aria-hidden
          />
          {scale.fields.map((note, i) => {
            const { x, y } = polarToOffset(i, fieldCount, fieldR);
            return (
              <NotePad
                key={`${scale.id}-f-${i}`}
                note={note}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                active={activeId === `f-${i}`}
                ariaLabel={`Play field note ${note}`}
                onPress={() =>
                  triggerSlot({ id: `f-${i}`, note, role: "field" })
                }
              />
            );
          })}

          {(scale.bottom ?? []).map((note, i) => {
            const { x, y } = polarToOffset(i, bottomCount, bottomR);
            return (
              <NotePad
                key={`${scale.id}-b-${i}`}
                note={note}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                active={activeId === `b-${i}`}
                size="sm"
                ariaLabel={`Play bottom note ${note}`}
                onPress={() =>
                  triggerSlot({ id: `b-${i}`, note, role: "bottom" })
                }
              />
            );
          })}

          <button
            type="button"
            aria-pressed={activeId === "ding"}
            aria-label={`Play ding ${scale.ding}`}
            onPointerDown={(e) => {
              e.preventDefault();
              triggerSlot({ id: "ding", note: scale.ding, role: "ding" });
            }}
            className={cn(
              "absolute left-1/2 top-1/2 z-10 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-display text-lg tracking-tight transition",
              activeId === "ding"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/50 bg-background/70 text-foreground shadow-sm backdrop-blur-sm hover:border-primary"
            )}
          >
            {scale.ding}
          </button>
        </div>

        <p className="mt-4 max-w-md text-center text-sm text-muted-foreground md:text-left">
          You hear a warm synthetic tone shaped for quick scale checks. If you add
          recorded note samples to the site later, playback can switch to those
          automatically. Focus the pad, then use{" "}
          <kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">
            1
          </kbd>
          –<kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">
            0
          </kbd>{" "}
          for the first ten notes and{" "}
          <kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">
            Q
          </kbd>
          –<kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">
            P
          </kbd>{" "}
          when a scale lists more.
        </p>
      </div>

      <aside className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Scales
        </p>
        <ul className="space-y-2">
          {HANDPAN_PLAYGROUND_SCALES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setScaleIndex(i)}
                className={cn(
                  "w-full border border-transparent px-3 py-2 text-left font-display text-xl tracking-tight transition hover:border-border",
                  scaleIndex === i && "border-primary text-primary"
                )}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Each preset pulls a real instrument photo from the shop catalog. The
          circle layout is for listening only, not a maker layout diagram.
        </p>
      </aside>
    </div>
  );
}

function NotePad({
  note,
  style,
  active,
  size = "md",
  ariaLabel,
  onPress,
}: {
  note: string;
  style: CSSProperties;
  active: boolean;
  size?: "sm" | "md";
  ariaLabel: string;
  onPress: () => void;
}) {
  const dim =
    size === "sm"
      ? "h-11 w-11 text-sm"
      : "h-14 w-14 text-base";
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={ariaLabel}
      style={style}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className={cn(
        "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-display tracking-tight transition touch-manipulation",
        dim,
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/70 bg-background/55 text-foreground shadow-sm backdrop-blur-sm hover:border-primary/70"
      )}
    >
      {note}
    </button>
  );
}
