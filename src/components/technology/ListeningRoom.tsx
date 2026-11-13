"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SceneId = "still" | "drift" | "bloom";

const SCENES: Array<{
  id: SceneId;
  label: string;
  note: string;
  frequencies: number[];
}> = [
  {
    id: "still",
    label: "Still",
    note: "A sustained four-note chord. No movement, no effect.",
    frequencies: [110, 164.81, 220, 277.18],
  },
  {
    id: "drift",
    label: "Drift",
    note: "A slow detune between voices, like a room settling.",
    frequencies: [98, 146.83, 196, 246.94],
  },
  {
    id: "bloom",
    label: "Bloom",
    note: "A wider chord with gentle stereo motion.",
    frequencies: [130.81, 196, 261.63, 329.63],
  },
];

const BAR_COUNT = 28;
const LOW_LEVELS = Array.from({ length: BAR_COUNT }, () => 7);

interface Voice {
  osc: OscillatorNode;
  gain: GainNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
}

export function ListeningRoom() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState<SceneId>("still");
  const [volume, setVolume] = useState(38);
  const [levels, setLevels] = useState<number[]>(LOW_LEVELS);
  const [error, setError] = useState<string | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const voicesRef = useRef<Voice[]>([]);
  const rafRef = useRef<number | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const activeScene = SCENES.find((item) => item.id === scene) ?? SCENES[0];

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      Boolean(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
    setSupported(ok);
  }, []);

  const clearLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    }
    clearLoop();
    setPlaying(false);
    setLevels(LOW_LEVELS);

    const voices = voicesRef.current;
    voicesRef.current = [];
    const closing = ctx;
    ctxRef.current = null;
    masterRef.current = null;
    analyserRef.current = null;

    window.setTimeout(() => {
      voices.forEach((voice) => {
        try {
          voice.osc.stop();
          voice.lfo.stop();
        } catch {
          /* already stopped */
        }
      });
      void closing?.close().catch(() => undefined);
    }, 500);
  };

  const start = async () => {
    if (playing) {
      stop();
      return;
    }
    setError(null);
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) {
        setSupported(false);
        return;
      }

      const ctx = new Ctor();
      await ctx.resume();

      const master = ctx.createGain();
      master.gain.value = 0;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1400;
      filter.Q.value = 0.4;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.86;

      master.connect(filter);
      filter.connect(analyser);
      analyser.connect(ctx.destination);

      const pans = [-0.72, 0.5, -0.24, 0.78];
      const voices: Voice[] = activeScene.frequencies.map((frequency, index) => {
        const osc = ctx.createOscillator();
        osc.type = index === 0 ? "sine" : "triangle";
        osc.frequency.value = frequency;
        osc.detune.value = index % 2 === 0 ? -3 : 4;

        const gain = ctx.createGain();
        gain.gain.value = index === 0 ? 0.15 : 0.1;

        const panner = ctx.createStereoPanner();
        panner.pan.value = pans[index] ?? 0;

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.035 + index * 0.017;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.022;

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(master);

        osc.start();
        lfo.start();
        return { osc, gain, lfo, lfoGain };
      });

      ctxRef.current = ctx;
      masterRef.current = master;
      analyserRef.current = analyser;
      voicesRef.current = voices;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);

      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime((volume / 100) * 0.24, ctx.currentTime + 1.6);
      setPlaying(true);

      let last = 0;
      const draw = (time: number) => {
        rafRef.current = requestAnimationFrame(draw);
        if (time - last < 42) return;
        last = time;
        const analyserNode = analyserRef.current;
        const data = dataRef.current;
        if (!analyserNode || !data) return;
        analyserNode.getByteFrequencyData(data);
        const next = Array.from({ length: BAR_COUNT }, (_, index) => {
          const position = Math.pow(index / BAR_COUNT, 1.55) * (data.length * 0.72);
          const value = data[Math.floor(position)] ?? 0;
          return 7 + (value / 255) * 93;
        });
        setLevels(next);
      };
      rafRef.current = requestAnimationFrame(draw);
    } catch {
      setError("Audio could not start in this browser. Nothing was played.");
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (!playing || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (master) {
      master.gain.setTargetAtTime((volume / 100) * 0.24, ctx.currentTime, 0.1);
    }
  }, [volume, playing]);

  useEffect(() => {
    if (!playing || !ctxRef.current) return;
    const ctx = ctxRef.current;
    voicesRef.current.forEach((voice, index) => {
      const next = activeScene.frequencies[index];
      if (next) voice.osc.frequency.setTargetAtTime(next, ctx.currentTime, 0.7);
    });
  }, [activeScene, playing]);

  useEffect(() => {
    return () => {
      clearLoop();
      voicesRef.current.forEach((voice) => {
        try {
          voice.osc.stop();
          voice.lfo.stop();
        } catch {
          /* already stopped */
        }
      });
      voicesRef.current = [];
      void ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
    };
  }, []);

  return (
    <section id="listening-room" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label flex items-center gap-3 text-silver-dim">
            <span>06</span>
            <span className="h-px w-7 bg-current opacity-40" aria-hidden="true" />
            <span>Listening room</span>
          </p>
          <p className="label text-silver-dim">Opt-in / browser generated</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(2.6rem,6.2vw,5.8rem)]">
              A ROOM MADE
              <br />
              <span className="text-silver/40">OF TONES.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="copy text-[14px] md:text-[15px]">
              A small, synthesised study of the spatial idea. Four generated voices, gentle motion
              and nothing pre-recorded. Start it only if you want sound.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(80%_80%_at_50%_45%,#161a26,#090a0e_72%)] lg:col-span-7">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
              <span
                className={cn(
                  "h-1 w-1 rounded-full transition-colors",
                  playing ? "bg-violet shadow-[0_0_10px_#8271ff]" : "bg-silver-dim",
                )}
                aria-hidden="true"
              />
              <span className="label text-silver-dim">
                {playing ? "Signal live" : "Signal stopped"}
              </span>
            </div>

            <div className="relative flex h-[360px] items-center justify-center sm:h-[440px]">
              <div
                aria-hidden="true"
                className={cn(
                  "absolute h-[240px] w-[240px] rounded-full border border-ivory/[0.06] transition-opacity duration-700 sm:h-[300px] sm:w-[300px]",
                  playing ? "opacity-100" : "opacity-40",
                )}
              />
              <div
                aria-hidden="true"
                className="absolute h-[170px] w-[170px] rounded-full border border-ivory/[0.08] sm:h-[210px] sm:w-[210px]"
              />
              <div
                aria-hidden="true"
                className="absolute h-[100px] w-[100px] rounded-full border border-violet/20 bg-violet/[0.04] sm:h-[120px] sm:w-[120px]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-x-5 bottom-5 flex h-32 items-end gap-[3px] sm:inset-x-8"
              >
                {levels.map((level, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t-[2px] bg-gradient-to-t from-violet/15 via-violet/50 to-violet/90 transition-[height] duration-100 ease-linear"
                    style={{ height: `${level}%`, opacity: playing ? 1 : 0.35 }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                <p className="label text-silver-dim">VYRA / generated study</p>
                <p className="mt-2 text-[15px] text-ivory">
                  {playing ? activeScene.label : "Ready when you are"}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-silver-dim">
                  {playing ? "4 voices · stereo" : "No autoplay"}
                </p>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-t from-black/50 to-transparent px-5 pb-4 pt-14">
              <p className="label text-silver-dim">Synthesised locally</p>
              <p className="label text-silver-dim">Nothing recorded</p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-line bg-graphite/20 p-5 sm:p-6 lg:col-span-5">
            <div>
              <p className="label text-violet-soft">Generated sound</p>
              <p className="mt-2 text-[12px] leading-relaxed text-silver">
                Four oscillators pass through a gentle low-pass filter. No samples, streams or
                external requests. Sound starts only when you press play.
              </p>
            </div>

            <div className="mt-5">
              <p className="label mb-2 text-silver">Scene</p>
              <div className="flex flex-wrap gap-2">
                {SCENES.map((item) => {
                  const active = item.id === scene;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScene(item.id)}
                      aria-pressed={active}
                      className={cn(
                        "label rounded-full border px-3.5 py-2 transition-all duration-300",
                        active
                          ? "border-ivory/50 bg-ivory/[0.07] text-ivory"
                          : "border-line text-silver hover:border-ivory/30 hover:text-ivory",
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 min-h-[32px] text-[11px] leading-relaxed text-silver-dim">
                {activeScene.note}
              </p>
            </div>

            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="listening-volume" className="label flex items-center gap-2 text-silver">
                  <Volume2 size={12} aria-hidden="true" />
                  Volume
                </label>
                <span className="font-mono text-[9px] tabular-nums text-silver-dim">{volume}%</span>
              </div>
              <input
                id="listening-volume"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="slider"
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={start}
                disabled={supported === false}
                className={cn("btn w-full", playing && "btn-ghost")}
              >
                {playing ? (
                  <Pause size={15} strokeWidth={1.6} aria-hidden="true" />
                ) : (
                  <Play size={15} strokeWidth={1.6} aria-hidden="true" />
                )}
                {playing ? "Stop the room" : "Enter the listening room"}
              </button>
              <p className="text-center text-[10px] leading-relaxed text-silver-dim" aria-live="polite">
                {supported === false
                  ? "Web Audio is unavailable in this browser, so the sound study cannot start."
                  : error ??
                    "Start at a comfortable volume. This is a tone study, not a recording of VYRA ONE."}
              </p>
            </div>

            <div className="mt-auto border-t border-line pt-4">
              <p className="text-[10px] leading-relaxed text-silver-dim">
                Accessibility: the demo is entirely optional, never autoplays, and stops when you
                leave the page or press stop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
