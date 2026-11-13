import { cn } from "@/lib/utils";

/** Technical cross-section of the VYRA ONE acoustic chamber. */
export function EarcupDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Cross-section diagram of the VYRA ONE earcup, showing the housing, acoustic chamber and 40 mm driver"
    >
      <defs>
        <radialGradient id="cup-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8271ff" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#8271ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8271ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cup-shell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3e4b" />
          <stop offset="0.5" stopColor="#1b1e27" />
          <stop offset="1" stopColor="#0d0f14" />
        </linearGradient>
      </defs>

      <g stroke="#F0EEE9" strokeOpacity="0.14" fill="none">
        <circle cx="250" cy="210" r="182" strokeDasharray="1 7" />
        <circle cx="250" cy="210" r="196" strokeOpacity="0.07" />
        <path d="M250 6v28M250 386v28M46 210h28M426 210h28" strokeOpacity="0.2" />
      </g>

      {/* tick ring */}
      <g stroke="#F0EEE9" strokeOpacity="0.18">
        {Array.from({ length: 60 }).map((_, index) => {
          const angle = (index / 60) * Math.PI * 2;
          const inner = 176;
          const outer = index % 5 === 0 ? 186 : 181;
          const round = (value: number) => Math.round(value * 100) / 100;
          return (
            <line
              key={index}
              x1={round(250 + Math.cos(angle) * inner)}
              y1={round(210 + Math.sin(angle) * inner)}
              x2={round(250 + Math.cos(angle) * outer)}
              y2={round(210 + Math.sin(angle) * outer)}
              strokeWidth={index % 5 === 0 ? 1 : 0.5}
            />
          );
        })}
      </g>

      {/* housing */}
      <circle cx="250" cy="210" r="152" fill="url(#cup-shell)" stroke="#F0EEE9" strokeOpacity="0.2" />
      <circle cx="250" cy="210" r="152" fill="none" stroke="#F0EEE9" strokeOpacity="0.08" strokeWidth="10" />
      <circle cx="250" cy="210" r="134" fill="none" stroke="#F0EEE9" strokeOpacity="0.18" />

      {/* chamber */}
      <circle cx="250" cy="210" r="126" fill="none" stroke="#F0EEE9" strokeOpacity="0.06" strokeDasharray="2 6" />

      {/* driver */}
      <circle cx="250" cy="210" r="108" fill="url(#cup-core)" />
      <circle cx="250" cy="210" r="88" fill="#0a0b10" stroke="#F0EEE9" strokeOpacity="0.16" />
      <circle cx="250" cy="210" r="88" fill="none" stroke="#8271ff" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="250" cy="210" r="72" fill="none" stroke="#F0EEE9" strokeOpacity="0.1" />
      <circle cx="250" cy="210" r="54" fill="none" stroke="#F0EEE9" strokeOpacity="0.1" />
      <circle cx="250" cy="210" r="34" fill="none" stroke="#8271ff" strokeOpacity="0.4" />
      <circle cx="250" cy="210" r="9" fill="#8271ff" opacity="0.85" />
      <circle
        cx="250"
        cy="210"
        r="16"
        fill="none"
        stroke="#8271ff"
        strokeOpacity="0.3"
        className="pulse-soft"
      />

      {/* vent */}
      <path
        d="M250 358v-22M232 352l12-16M268 352l-12-16"
        stroke="#8271ff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        fill="none"
      />

      {/* labels */}
      <g fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.4" fill="#A8AAB5">
        <g>
          <path d="M370 110 L432 76" stroke="#F0EEE9" strokeOpacity="0.25" />
          <circle cx="370" cy="110" r="2" fill="#8271ff" />
          <text x="440" y="72">ANODISED HOUSING</text>
          <text x="440" y="84" fill="#6b6e79">ALUMINIUM / 0.8 MM</text>
        </g>
        <g>
          <path d="M350 240 L432 220" stroke="#F0EEE9" strokeOpacity="0.25" />
          <circle cx="350" cy="240" r="2" fill="#8271ff" />
          <text x="440" y="216">ACOUSTIC CHAMBER</text>
          <text x="440" y="228" fill="#6b6e79">VENTED / BRACED</text>
        </g>
        <g>
          <path d="M322 300 L432 330" stroke="#F0EEE9" strokeOpacity="0.25" />
          <circle cx="322" cy="300" r="2" fill="#8271ff" />
          <text x="440" y="326">40 MM DRIVER</text>
          <text x="440" y="338" fill="#6b6e79">BERYLLIUM-COATED</text>
        </g>
        <g>
          <path d="M250 392 L250 402" stroke="#F0EEE9" strokeOpacity="0.25" />
          <text x="250" y="414" textAnchor="middle">PRESSURE VENT</text>
        </g>
        <text x="46" y="72" fill="#6b6e79">FIG. 01</text>
        <text x="46" y="86" fill="#F0EEE9" fillOpacity="0.5">CROSS-SECTION / EAR CUP</text>
      </g>
    </svg>
  );
}

/** Expanding soundstage visualisation. `immersion` is 0–1. */
export function SoundstageDiagram({
  immersion,
  className,
}: {
  immersion: number;
  className?: string;
}) {
  const spread = 0.65 + immersion * 0.55;
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`Soundstage diagram at ${Math.round(immersion * 100)} percent immersion`}
    >
      <defs>
        <radialGradient id="stage-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8271ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8271ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="150" fill="url(#stage-core)" opacity={0.35 + immersion * 0.4} />
      {[0, 1, 2, 3, 4].map((ring) => {
        const radius = (46 + ring * 30) * spread;
        return (
          <ellipse
            key={ring}
            cx="200"
            cy="200"
            rx={radius}
            ry={radius * (0.72 + ring * 0.035)}
            fill="none"
            stroke="#F0EEE9"
            strokeOpacity={0.05 + (4 - ring) * 0.035 + immersion * 0.03}
            strokeDasharray={ring % 2 === 0 ? "1 6" : undefined}
          />
        );
      })}

      {/* axis */}
      <path d="M200 30v340M30 200h340" stroke="#F0EEE9" strokeOpacity="0.07" />
      <circle cx="200" cy="200" r="4" fill="#F0EEE9" />
      <circle cx="200" cy="200" r="10" fill="none" stroke="#8271ff" strokeOpacity="0.5" />

      {/* sources */}
      {[
        { angle: -52, distance: 118, size: 3, label: "VOCAL" },
        { angle: 18, distance: 146, size: 2, label: "STRINGS" },
        { angle: 122, distance: 132, size: 2.4, label: "ROOM" },
        { angle: 204, distance: 102, size: 1.8, label: "BASS" },
        { angle: -150, distance: 154, size: 2.2, label: "AIR" },
      ].map((source) => {
        const rad = (source.angle * Math.PI) / 180;
        const round = (value: number) => Math.round(value * 100) / 100;
        const x = round(200 + Math.cos(rad) * source.distance * spread);
        const y = round(200 + Math.sin(rad) * source.distance * 0.8 * spread);
        return (
          <g key={source.label}>
            <line x1="200" y1="200" x2={x} y2={y} stroke="#F0EEE9" strokeOpacity="0.08" />
            <circle cx={x} cy={y} r={source.size + 2} fill="#8271ff" opacity="0.18" />
            <circle cx={x} cy={y} r={source.size} fill="#8271ff" />
            <text
              x={round(x + 10)}
              y={round(y + 3)}
              fontFamily="var(--font-mono)"
              fontSize="7"
              letterSpacing="1.2"
              fill="#A8AAB5"
            >
              {source.label}
            </text>
          </g>
        );
      })}
      <text
        x="200"
        y="384"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.6"
        fill="#6b6e79"
      >
        LISTENER / HEAD-TRACKED
      </text>
    </svg>
  );
}

/** Deterministic, hand-tuned waveform. */
export function Waveform({
  className,
  bars = 84,
  active = false,
}: {
  className?: string;
  bars?: number;
  active?: boolean;
}) {
  return (
    <div className={cn("flex h-16 items-center gap-[3px]", className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, index) => {
        const envelope = Math.sin((index / bars) * Math.PI);
        const detail =
          0.35 +
          Math.abs(Math.sin(index * 1.7)) * 0.3 +
          Math.abs(Math.cos(index * 0.43)) * 0.35;
        const height = Math.round(Math.max(6, envelope * detail * 100) * 100) / 100;
        return (
          <span
            key={index}
            className="block w-px flex-1 rounded-full bg-current"
            style={{
              height: `${height}%`,
              opacity: Math.round((0.28 + envelope * 0.6) * 100) / 100,
              transformOrigin: "center",
              animation: active ? `eq ${1.2 + (index % 7) * 0.18}s ease-in-out infinite` : undefined,
              animationDelay: active ? `${(index % 11) * 0.08}s` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

export function PressureMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" className={cn("h-full w-full", className)} role="img" aria-label="Pressure distribution diagram showing load across the crown and earcups">
      <defs>
        <linearGradient id="pressure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8271ff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#8271ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8271ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M74 224 C 60 132 116 62 180 62 C 244 62 300 132 286 224"
        fill="none"
        stroke="#F0EEE9"
        strokeOpacity="0.2"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M74 224 C 60 132 116 62 180 62 C 244 62 300 132 286 224"
        fill="none"
        stroke="url(#pressure)"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M74 224 C 60 132 116 62 180 62 C 244 62 300 132 286 224"
        fill="none"
        stroke="#F0EEE9"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
      <g fill="#8271ff">
        <circle cx="180" cy="74" r="3" opacity="0.9" />
        <circle cx="180" cy="74" r="10" fill="none" stroke="#8271ff" strokeOpacity="0.35" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill="#A8AAB5">
        <path d="M180 90v34" stroke="#F0EEE9" strokeOpacity="0.2" />
        <text x="180" y="136" textAnchor="middle">CROWN — SUSPENDED</text>
        <text x="180" y="148" textAnchor="middle" fill="#6b6e79">LOW PRESSURE ZONE</text>
        <path d="M286 200h34" stroke="#F0EEE9" strokeOpacity="0.2" />
        <text x="328" y="197" textAnchor="end">CUSHION SEAL</text>
        <text x="328" y="209" textAnchor="end" fill="#6b6e79">DISTRIBUTED LOAD</text>
      </g>
    </svg>
  );
}
