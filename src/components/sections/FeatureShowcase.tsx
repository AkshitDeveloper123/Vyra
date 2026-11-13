"use client";

import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRightLeft,
  Laptop,
  Pause,
  Play,
  Smartphone,
  Volume2,
} from "lucide-react";
import { FEATURES } from "@/data/features";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import {
  PressureMap,
  SoundstageDiagram,
  Waveform,
} from "@/components/visuals/Diagrams";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ------------------------------------------------------------------ */
/* 01 — Spatial                                                       */
/* ------------------------------------------------------------------ */

const SPATIAL_PRESETS = [
  { id: "intimate", label: "Intimate", value: 26 },
  { id: "studio", label: "Studio", value: 64 },
  { id: "hall", label: "Hall", value: 92 },
];

function SpatialPanel() {
  const [immersion, setImmersion] = useState(64);

  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] sm:items-center">
      <div className="mx-auto w-full max-w-[300px]">
        <SoundstageDiagram immersion={immersion / 100} />
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="display text-[clamp(3.4rem,7vw,5rem)] tabular-nums text-ivory">
            {String(immersion).padStart(2, "0")}
          </span>
          <span className="label text-silver-dim">% immersion</span>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="spatial-field" className="label text-silver">
              Field width
            </label>
            <span className="label text-silver-dim">Dry / Expansive</span>
          </div>
          <input
            id="spatial-field"
            type="range"
            min={0}
            max={100}
            value={immersion}
            onChange={(event) => setImmersion(Number(event.target.value))}
            className="slider"
            aria-valuetext={`${immersion} percent immersion`}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SPATIAL_PRESETS.map((preset) => {
            const active = Math.abs(immersion - preset.value) < 2;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setImmersion(preset.value)}
                aria-pressed={active}
                className={cn(
                  "label rounded-full border px-3.5 py-2 transition-all duration-300",
                  active
                    ? "border-ivory/60 bg-ivory/[0.08] text-ivory"
                    : "border-line text-silver hover:border-ivory/30 hover:text-ivory",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-silver">
          Sources hold their position as you turn. At low values the stage stays close and
          deliberate; at high values the room opens without smearing detail.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Noise control                                                 */
/* ------------------------------------------------------------------ */

const ENVIRONMENTS = [
  {
    id: "cafe",
    label: "Café",
    detail: "Bright clatter, shifting voices",
    bands: [42, 55, 68, 74, 62, 48, 36, 28],
  },
  {
    id: "cabin",
    label: "Cabin",
    detail: "Low drone, steady pressure",
    bands: [86, 82, 74, 61, 46, 34, 24, 18],
  },
  {
    id: "studio",
    label: "Studio",
    detail: "Near silence, room tone",
    bands: [28, 32, 38, 42, 34, 26, 20, 16],
  },
  {
    id: "street",
    label: "Street",
    detail: "Traffic, wind, sudden horns",
    bands: [64, 70, 66, 58, 52, 44, 32, 24],
  },
];

const ANC_MODES = [
  { id: "adaptive", label: "Adaptive", factor: 1, note: "Continuous, band-by-band response." },
  { id: "focus", label: "Focus", factor: 1.14, note: "Maximum attenuation for deep work." },
  { id: "aware", label: "Aware", factor: 0.52, note: "Keeps voices and announcements present." },
];

function NoisePanel() {
  const [envId, setEnvId] = useState("cabin");
  const [modeId, setModeId] = useState("adaptive");
  const env = ENVIRONMENTS.find((item) => item.id === envId) ?? ENVIRONMENTS[1];
  const mode = ANC_MODES.find((item) => item.id === modeId) ?? ANC_MODES[0];
  const bands = env.bands.map((value) => Math.min(100, Math.round(value * mode.factor)));
  const average = Math.round(bands.reduce((total, value) => total + value, 0) / bands.length);

  return (
    <div>
      <fieldset>
        <legend className="label mb-3 text-silver">Environment</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ENVIRONMENTS.map((item) => {
            const active = item.id === envId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setEnvId(item.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                  active
                    ? "border-violet/45 bg-violet/[0.08]"
                    : "border-line bg-graphite/20 hover:border-ivory/25",
                )}
              >
                <span className={cn("block text-[13px]", active ? "text-ivory" : "text-silver")}>
                  {item.label}
                </span>
                <span className="mt-1 block text-[10px] leading-snug text-silver-dim">
                  {item.detail}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 flex h-40 items-end gap-2 sm:gap-3" aria-hidden="true">
        {bands.map((value, index) => (
          <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-[3px] bg-gradient-to-t from-violet/15 via-violet/55 to-violet transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ height: `${value}%` }}
              />
            </div>
            <span className="font-mono text-[7px] tracking-[0.08em] text-silver-dim">
              {["63", "125", "250", "500", "1k", "2k", "4k", "8k"][index]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="flex flex-wrap gap-2">
            {ANC_MODES.map((item) => {
              const active = item.id === modeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setModeId(item.id)}
                  aria-pressed={active}
                  className={cn(
                    "label rounded-full border px-3 py-1.5 transition-colors",
                    active
                      ? "border-ivory/50 bg-ivory/[0.07] text-ivory"
                      : "border-line text-silver hover:text-ivory",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-silver-dim">{mode.note}</p>
        </div>
        <div className="sm:text-right">
          <p className="display text-[38px] tabular-nums text-ivory">
            −{average}
            <span className="ml-1 font-mono text-[10px] tracking-[0.16em] text-silver-dim">
              dB
            </span>
          </p>
          <p className="label mt-1 text-silver-dim">Illustrative attenuation</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Acoustics                                                     */
/* ------------------------------------------------------------------ */

const TUNINGS = [
  {
    id: "reference",
    label: "Reference",
    note: "Neutral through the presence region, with a controlled low shelf.",
    values: [54, 59, 64, 68, 71, 73, 74, 75, 76, 76, 77, 77, 77, 76, 75, 73, 71, 68, 65, 61, 57, 54, 51, 48],
  },
  {
    id: "warm",
    label: "Warm",
    note: "A fuller lower register and a gently relaxed upper treble.",
    values: [66, 70, 74, 77, 79, 80, 80, 79, 78, 77, 76, 75, 73, 71, 69, 66, 63, 59, 55, 51, 47, 44, 41, 38],
  },
  {
    id: "open",
    label: "Open",
    note: "A lifted air region for acoustic material and long listening.",
    values: [48, 53, 58, 63, 67, 70, 72, 73, 74, 75, 76, 78, 80, 81, 82, 82, 81, 79, 76, 72, 68, 63, 58, 53],
  },
];

function curvePoints(values: number[]) {
  return values
    .map((value, index) => {
      const x = 26 + (index / (values.length - 1)) * 428;
      const y = 186 - (value / 100) * 150;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function AcousticsPanel() {
  const [tuningId, setTuningId] = useState("reference");
  const tuning = TUNINGS.find((item) => item.id === tuningId) ?? TUNINGS[0];
  const points = curvePoints(tuning.values);
  const area = `26,186 ${points} 454,186`;

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-line bg-[radial-gradient(120%_120%_at_30%_10%,#12141c,#090a0e_70%)] p-2">
        <svg
          viewBox="0 0 480 220"
          className="h-auto w-full"
          role="img"
          aria-label={`Illustrative frequency response curve for the ${tuning.label} tuning`}
        >
          <defs>
            <linearGradient id="response-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8271ff" stopOpacity="0.28" />
              <stop offset="1" stopColor="#8271ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={`h-${line}`}
              x1="26"
              x2="454"
              y1={36 + line * 37.5}
              y2={36 + line * 37.5}
              stroke="#F0EEE9"
              strokeOpacity="0.07"
              strokeDasharray={line === 4 ? undefined : "2 6"}
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <line
              key={`v-${line}`}
              y1="30"
              y2="190"
              x1={26 + (line / 5) * 428}
              x2={26 + (line / 5) * 428}
              stroke="#F0EEE9"
              strokeOpacity="0.05"
            />
          ))}

          {TUNINGS.filter((item) => item.id !== tuningId).map((item) => (
            <polyline
              key={item.id}
              points={curvePoints(item.values)}
              fill="none"
              stroke="#F0EEE9"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          ))}

          <motion.g
            key={tuning.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <polygon points={area} fill="url(#response-fill)" />
            <polyline
              points={points}
              fill="none"
              stroke="#8271ff"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </motion.g>

          <g fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.1" fill="#71747f">
            <text x="26" y="205">20 Hz</text>
            <text x="186" y="205" textAnchor="middle">200</text>
            <text x="344" y="205" textAnchor="middle">2k</text>
            <text x="454" y="205" textAnchor="end">20 kHz</text>
            <text x="26" y="26">dB</text>
            <text x="454" y="26" textAnchor="end" fill="#F0EEE9" fillOpacity="0.4">
              {tuning.label.toUpperCase()}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {TUNINGS.map((item) => {
          const active = item.id === tuningId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTuningId(item.id)}
              aria-pressed={active}
              className={cn(
                "label rounded-full border px-3.5 py-2 transition-all duration-300",
                active
                  ? "border-violet/50 bg-violet/[0.1] text-ivory"
                  : "border-line text-silver hover:border-ivory/30 hover:text-ivory",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-silver">{tuning.note}</p>
      <p className="label mt-3 text-silver-dim">Illustrative tuning curve — not measured data</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Comfort                                                       */
/* ------------------------------------------------------------------ */

function ComfortPanel() {
  const [clampForce, setClampForce] = useState(5);
  const crown = Math.max(9, 42 - clampForce * 3.4);
  const seal = 38 + clampForce * 6;
  const character =
    clampForce <= 3 ? "Light" : clampForce <= 7 ? "Balanced" : "Secure";

  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
      <div className="relative rounded-lg border border-line bg-graphite/20 p-3">
        <PressureMap />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
          <span className="label text-silver-dim">Load study / side view</span>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label htmlFor="clamp-force" className="label text-silver">
            Clamp force
          </label>
          <span className="label text-silver-dim">{character}</span>
        </div>
        <input
          id="clamp-force"
          type="range"
          min={1}
          max={10}
          value={clampForce}
          onChange={(event) => setClampForce(Number(event.target.value))}
          className="slider"
          aria-valuetext={`${character} clamp force, ${clampForce} of 10`}
        />
        <div className="mt-1 flex justify-between">
          <span className="label text-silver-dim">Light</span>
          <span className="label text-silver-dim">Secure</span>
        </div>

        <dl className="mt-7 space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <dt className="text-[12px] text-silver">Crown pressure</dt>
              <dd className="font-mono text-[11px] tabular-nums text-ivory">
                {crown.toFixed(1)} kPa
              </dd>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ivory/10">
              <div
                className="h-full rounded-full bg-ivory/70 transition-all duration-500"
                style={{ width: `${Math.min(100, crown * 2)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <dt className="text-[12px] text-silver">Cushion seal</dt>
              <dd className="font-mono text-[11px] tabular-nums text-ivory">
                {Math.round(seal)}%
              </dd>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ivory/10">
              <div
                className="h-full rounded-full bg-violet transition-all duration-500"
                style={{ width: `${Math.min(100, seal)}%` }}
              />
            </div>
          </div>
        </dl>

        <p className="mt-6 text-[12px] leading-relaxed text-silver">
          The suspended band spreads load across the crown, so clamp force can stay stable in
          motion without pressing on a single point.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Connectivity                                                  */
/* ------------------------------------------------------------------ */

const DEVICES = [
  {
    id: "laptop",
    name: "MacBook Pro",
    kind: "Workstation",
    detail: "Studio display · USB-C audio",
    icon: Laptop,
  },
  {
    id: "phone",
    name: "iPhone",
    kind: "Mobile",
    detail: "Music · calls · handoff",
    icon: Smartphone,
  },
] as const;

function ConnectivityPanel() {
  const [primaryId, setPrimaryId] = useState<"laptop" | "phone">("laptop");
  const [status, setStatus] = useState("Primary connection stable");

  const makePrimary = (id: "laptop" | "phone") => {
    if (id === primaryId) return;
    setPrimaryId(id);
    setStatus("Handoff complete — 42 ms");
  };

  const swap = () => {
    setPrimaryId((prev) => (prev === "laptop" ? "phone" : "laptop"));
    setStatus("Handoff complete — 42 ms");
  };

  return (
    <div className="mx-auto max-w-[460px]">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[27px] top-[54px] h-[calc(100%-108px)] w-px bg-gradient-to-b from-line via-violet/40 to-line"
        />
        <div className="space-y-3">
          {DEVICES.map((device) => {
            const active = device.id === primaryId;
            const Icon = device.icon;
            return (
              <button
                key={device.id}
                type="button"
                onClick={() => makePrimary(device.id)}
                aria-pressed={active}
                className={cn(
                  "relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-400",
                  active
                    ? "border-violet/40 bg-violet/[0.07]"
                    : "border-line bg-graphite/20 hover:border-ivory/25",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors",
                    active
                      ? "border-violet/50 text-violet-soft"
                      : "border-line text-silver",
                  )}
                >
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] text-ivory">{device.name}</span>
                    <span className="label rounded-full border border-line px-2 py-0.5 text-[8px] text-silver-dim">
                      {device.kind}
                    </span>
                  </span>
                  <span className="mt-1 block text-[11px] text-silver-dim">{device.detail}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span
                    className={cn(
                      "label block",
                      active ? "text-violet-soft" : "text-silver-dim",
                    )}
                  >
                    {active ? "Primary" : "Standby"}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] text-silver-dim">
                    {active ? "LDAC / 24-bit" : "Ready"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-3 flex items-center gap-3 rounded-xl border border-line bg-ink/60 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/20 bg-ivory/[0.04]">
            <span className="font-mono text-[10px] tracking-[0.1em] text-ivory">V</span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] text-ivory">VYRA ONE</p>
            <p className="mt-0.5 text-[10px] text-silver-dim" aria-live="polite">
              {status}
            </p>
          </div>
          <button
            type="button"
            onClick={swap}
            className="group flex shrink-0 items-center gap-2 rounded-full border border-line px-3 py-2 text-[11px] text-silver transition-colors hover:border-ivory/40 hover:text-ivory"
          >
            <ArrowRightLeft size={12} aria-hidden="true" />
            Swap
          </button>
        </div>
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-silver">
        One primary connection, one standby. When a call arrives on the other device, VYRA hands
        audio over without asking you to reconnect.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — Controls                                                      */
/* ------------------------------------------------------------------ */

const CONTROL_MODES = ["Focus", "Aware", "Spatial"];

function ControlsPanel() {
  const [volume, setVolume] = useState(62);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState("Focus");
  const [log, setLog] = useState("Surface idle — drag to adjust");
  const drag = useRef<{ startY: number; startVolume: number; moved: boolean } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startY: event.clientY, startVolume: volume, moved: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const delta = drag.current.startY - event.clientY;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    const next = Math.max(0, Math.min(100, Math.round(drag.current.startVolume + delta / 2)));
    setVolume(next);
    setLog(`Swipe — volume ${next}%`);
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
      <div className="mx-auto">
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative h-52 w-52 touch-none select-none rounded-full border border-line"
          style={{
            background: `conic-gradient(#8271ff ${volume * 3.6}deg, rgba(240,238,233,0.08) 0deg)`,
          }}
          data-cursor-label="Drag volume"
        >
          <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_50%_35%,#1b1e27,#0b0c11_70%)]" />
          <div className="absolute inset-6 rounded-full border border-line" />
          <button
            type="button"
            onClick={() => {
              setPlaying((prev) => !prev);
              setLog(playing ? "Tap — playback paused" : "Tap — playback started");
            }}
            aria-label={playing ? "Pause simulated playback" : "Start simulated playback"}
            className="absolute inset-0 grid place-items-center rounded-full text-ivory transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-ivory/20 bg-ivory/[0.05] backdrop-blur-sm">
              {playing ? (
                <Pause size={18} strokeWidth={1.4} aria-hidden="true" />
              ) : (
                <Play size={18} strokeWidth={1.4} aria-hidden="true" className="ml-0.5" />
              )}
            </span>
          </button>
          <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-line bg-ink px-3 py-1">
            <span className="font-mono text-[9px] tabular-nums text-silver">{volume}%</span>
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="label flex items-center gap-2 text-silver">
            <Volume2 size={13} aria-hidden="true" />
            Touch surface
          </span>
          <span className="label text-silver-dim">Drag vertically</span>
        </div>

        <div className="mt-5">
          <label htmlFor="control-volume" className="sr-only">
            Simulated volume
          </label>
          <input
            id="control-volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(event) => {
              const next = Number(event.target.value);
              setVolume(next);
              setLog(`Slider — volume ${next}%`);
            }}
            className="slider"
          />
        </div>

        <div className="mt-6">
          <p className="label mb-2 text-silver-dim">Long press — mode</p>
          <div className="flex flex-wrap gap-2">
            {CONTROL_MODES.map((item) => {
              const active = item === mode;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setLog(`Long press — ${item} mode`);
                  }}
                  aria-pressed={active}
                  className={cn(
                    "label rounded-full border px-3 py-1.5 transition-colors",
                    active
                      ? "border-ivory/50 bg-ivory/[0.07] text-ivory"
                      : "border-line text-silver hover:text-ivory",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <p className="label text-silver-dim">Last gesture</p>
          <p className="mt-1.5 text-[12px] text-silver" aria-live="polite">
            {log}
          </p>
        </div>

        <Waveform className="mt-5 h-9 text-violet/70" bars={48} active={playing} />
      </div>
    </div>
  );
}

const PANELS: Record<string, () => ReactElement> = {
  spatial: SpatialPanel,
  anc: NoisePanel,
  acoustics: AcousticsPanel,
  comfort: ComfortPanel,
  connectivity: ConnectivityPanel,
  controls: ControlsPanel,
};

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const active = FEATURES.find((feature) => feature.id === activeId) ?? FEATURES[0];
  const Panel = PANELS[active.id] ?? SpatialPanel;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const vertical = useMediaQuery("(min-width: 1024px)");

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = FEATURES.findIndex((feature) => feature.id === activeId);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % FEATURES.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + FEATURES.length) % FEATURES.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = FEATURES.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActiveId(FEATURES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="systems" className="relative border-t border-line py-20 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(130,113,255,0.06),transparent)] blur-2xl"
      />
      <div className="shell relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="02">Systems</SectionLabel>
          <p className="label text-silver-dim">Six disciplines / one object</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              as="h2"
              lines={["BUILT TO BE FELT,", "NOT HEARD."]}
              className="display text-[clamp(2.6rem,6.4vw,6.2rem)]"
              lineClassName={["", "text-silver/40"]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="copy text-[14px] md:text-[15px]">
              Six systems work as one. Adjust the studies below to see how each decision changes
              the whole — every panel is a live, local interaction, not a recording.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
          <div
            role="tablist"
            aria-label="VYRA ONE systems"
            aria-orientation={vertical ? "vertical" : "horizontal"}
            onKeyDown={onTabKeyDown}
            className="no-scrollbar -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {FEATURES.map((feature, index) => {
              const isActive = feature.id === activeId;
              return (
                <button
                  key={feature.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  role="tab"
                  id={`system-tab-${feature.id}`}
                  aria-selected={isActive}
                  aria-controls={`system-panel-${feature.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(feature.id)}
                  className={cn(
                    "group relative flex shrink-0 snap-start items-center gap-4 border-b border-line py-4 text-left transition-colors lg:w-full lg:py-5",
                    isActive ? "text-ivory" : "text-silver hover:text-ivory",
                  )}
                >
                  <span className="label shrink-0 text-silver-dim">{feature.index}</span>
                  <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <span className="whitespace-nowrap text-[15px] tracking-[-0.015em] lg:whitespace-normal lg:text-[17px]">
                      {feature.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 lg:block",
                        isActive
                          ? "bg-violet shadow-[0_0_10px_#8271ff]"
                          : "bg-transparent",
                      )}
                    />
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="system-active"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 hidden h-px bg-gradient-to-r from-violet/70 to-transparent lg:block"
                    />
                  )}
                </button>
              );
            })}

            <div className="mt-6 hidden border border-line bg-graphite/20 p-5 lg:block">
              <p className="label text-silver-dim">Concept study</p>
              <p className="mt-2 text-[11px] leading-relaxed text-silver">
                All readings are illustrative simulations created for this prototype. They do not
                describe a certified or shipped product.
              </p>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-2xl border border-line bg-graphite/25">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                <span className="label text-silver">{active.kicker}</span>
              </div>
              <span className="label text-silver-dim">Fig. {active.index} / interactive</span>
            </div>

            <div className="relative p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  id={`system-panel-${active.id}`}
                  role="tabpanel"
                  aria-labelledby={`system-tab-${active.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-line px-5 py-4 sm:px-7">
              <p className="text-[12px] leading-relaxed text-silver md:text-[13px]">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
