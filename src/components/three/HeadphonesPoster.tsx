import type { Finish } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Static poster shown before WebGL initialises, and whenever WebGL is
 * unavailable. It is a real illustration, not a placeholder.
 */
export function HeadphonesPoster({
  finish,
  className,
  label = "VYRA ONE illustration",
}: {
  finish: Finish;
  className?: string;
  label?: string;
}) {
  const id = `poster-${finish.id}`;
  return (
    <svg
      viewBox="0 0 620 600"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={finish.swatchEdge} />
          <stop offset="0.42" stopColor={finish.swatch} />
          <stop offset="0.7" stopColor={finish.shell} />
          <stop offset="1" stopColor={finish.swatch} />
        </linearGradient>
        <radialGradient id={`${id}-cup`} cx="0.32" cy="0.24" r="0.9">
          <stop offset="0" stopColor={finish.swatchEdge} />
          <stop offset="0.45" stopColor={finish.swatch} />
          <stop offset="1" stopColor="#08090d" />
        </radialGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={finish.swatch} />
          <stop offset="0.34" stopColor={finish.swatchEdge} />
          <stop offset="0.6" stopColor={finish.swatch} />
          <stop offset="1" stopColor="#0b0c11" />
        </linearGradient>
        <linearGradient id={`${id}-cushion`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={finish.cushion} />
          <stop offset="1" stopColor="#08090d" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="310" cy="545" rx="215" ry="24" fill="#000" opacity="0.5" />

      {/* headband */}
      <path
        d="M 168 410 C 168 168 452 168 452 410"
        fill="none"
        stroke={`url(#${id}-band)`}
        strokeWidth="44"
        strokeLinecap="round"
      />
      <path
        d="M 180 402 C 180 196 440 196 440 402"
        fill="none"
        stroke="#0c0e13"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M 176 300 C 220 214 400 214 444 300"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        opacity="0.14"
      />

      {/* yokes */}
      <path d="M 160 392 C 132 400 124 448 128 486" fill="none" stroke={finish.metal} strokeWidth="7" opacity="0.75" />
      <path d="M 460 392 C 488 400 496 448 492 486" fill="none" stroke={finish.metal} strokeWidth="7" opacity="0.75" />

      {/* cups */}
      {[
        { cx: 145, mirror: -1 },
        { cx: 475, mirror: 1 },
      ].map(({ cx, mirror }) => (
        <g key={cx}>
          <ellipse cx={cx} cy="398" rx="112" ry="124" fill={`url(#${id}-cup)`} />
          <ellipse cx={cx} cy="398" rx="112" ry="124" fill="none" stroke="#ffffff" strokeOpacity="0.1" />
          <ellipse
            cx={cx + mirror * 52}
            cy="400"
            rx="42"
            ry="108"
            fill={`url(#${id}-cushion)`}
            opacity="0.92"
          />
          <ellipse
            cx={cx + mirror * 52}
            cy="400"
            rx="42"
            ry="108"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.06"
          />
          <ellipse
            cx={cx - mirror * 44}
            cy="398"
            rx="54"
            ry="62"
            fill="none"
            stroke={finish.metal}
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <ellipse
            cx={cx - mirror * 44}
            cy="398"
            rx="72"
            ry="82"
            fill="none"
            stroke={finish.metal}
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <path
            d={`M ${cx - mirror * 44 - 12} 418 L ${cx - mirror * 44} 382 L ${cx - mirror * 44 + 12} 418`}
            fill="none"
            stroke={finish.metal}
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <circle cx={cx - mirror * 44} cy="338" r="3" fill="#8271ff" filter={`url(#${id}-glow)`} />
        </g>
      ))}
    </svg>
  );
}
