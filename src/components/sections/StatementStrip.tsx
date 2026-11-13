const ITEMS = [
  "Hear beyond the frame",
  "Spatial audio",
  "Material honesty",
  "Quiet technology",
  "Designed in silence",
];

export function StatementStrip() {
  const group = (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-8 md:gap-12">
          <span className="label whitespace-nowrap text-silver">{item}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-violet/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-4">
      <div className="marquee-track flex w-max" aria-hidden="true">
        {group}
        {group}
      </div>
      <span className="sr-only">
        VYRA — hear beyond the frame. Spatial audio, material honesty and quiet technology.
      </span>
    </div>
  );
}
