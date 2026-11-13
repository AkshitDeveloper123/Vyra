import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { Waveform } from "@/components/visuals/Diagrams";

function TrainScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#0d1018,#08090d)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_42px,rgba(240,238,233,0.04)_42px,rgba(240,238,233,0.04)_43px)]"
      />
      <div className="absolute left-[9%] top-[12%] h-[60%] w-[55%] overflow-hidden rounded-[16px] border border-white/15 bg-[linear-gradient(165deg,#242a38,#0a0c12)] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div
          aria-hidden="true"
          className="drift-x absolute -inset-x-12 -inset-y-4 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(104deg, transparent 0 26px, rgba(240,238,233,0.15) 26px 27px, transparent 27px 54px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />
        <span className="label absolute bottom-3 left-3 text-silver-dim">22:40</span>
      </div>

      <div className="absolute bottom-[11%] right-[9%] h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,#2a2f3d,#0a0b10)]" />
      <div className="absolute right-[16%] top-[17%] h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_14px_#8271ff]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute left-[9%] top-[73%] h-px w-[55%] bg-ivory/10" />
    </div>
  );
}

function StudioScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(70%_60%_at_50%_42%,#1b1e27,#08090d_75%)]">
      <div className="absolute left-1/2 top-[42%] aspect-square h-[62%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="spin-slow absolute inset-0 rounded-full"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% 50%, #0c0e13 0 3px, #171a23 3px 4px, #0b0c11 4px 9px)",
          }}
        >
          <div className="absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-violet/40 bg-violet/70">
            <span className="font-mono text-[8px] tracking-[0.18em] text-white">VYRA</span>
          </div>
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute right-[14%] top-[18%] h-[38%] w-px origin-top rotate-[22deg] bg-gradient-to-b from-ivory/50 to-transparent"
      />
      <div className="absolute right-[13%] top-[18%] h-3 w-3 rounded-full border border-ivory/30" />
      <div className="absolute inset-x-6 bottom-6">
        <Waveform className="h-10 text-violet/60" bars={56} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <span className="label absolute left-5 top-5 text-silver-dim">Reference / 33⅓</span>
    </div>
  );
}

function CityScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#0a0c12,#151a28_62%,#090a0e)]">
      <div className="glow-breathe absolute left-[18%] top-[18%] h-40 w-40 rounded-full bg-violet/25 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(240,238,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(240,238,233,0.05)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[62%] w-full"
      >
        <defs>
          <linearGradient id="city-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a0c12" stopOpacity="0" />
            <stop offset="1" stopColor="#08090d" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <g fill="#0d0f16" stroke="#F0EEE9" strokeOpacity="0.08">
          <rect x="18" y="142" width="54" height="158" />
          <rect x="82" y="104" width="40" height="196" />
          <rect x="132" y="168" width="62" height="132" />
          <rect x="204" y="86" width="46" height="214" />
          <rect x="260" y="132" width="58" height="168" />
          <rect x="328" y="112" width="52" height="188" />
        </g>
        <g fill="#8271ff" opacity="0.55">
          <rect x="30" y="158" width="4" height="4" />
          <rect x="44" y="182" width="4" height="4" />
          <rect x="94" y="124" width="4" height="4" />
          <rect x="106" y="152" width="4" height="4" />
          <rect x="148" y="190" width="4" height="4" />
          <rect x="174" y="214" width="4" height="4" />
          <rect x="218" y="110" width="4" height="4" />
          <rect x="230" y="144" width="4" height="4" />
          <rect x="276" y="158" width="4" height="4" />
          <rect x="300" y="196" width="4" height="4" />
          <rect x="342" y="136" width="4" height="4" />
          <rect x="358" y="174" width="4" height="4" />
        </g>
        <rect x="0" y="0" width="400" height="300" fill="url(#city-fade)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      <span className="label absolute left-5 top-5 text-silver-dim">Aware / 08:15</span>
    </div>
  );
}

const MOMENTS = [
  {
    index: "01",
    tag: "Cabin / 22:40",
    title: "The late train",
    body: "Cabin pressure, low drone, a record you have heard a hundred times — and suddenly haven't.",
    Scene: TrainScene,
  },
  {
    index: "02",
    tag: "Reference / 14:10",
    title: "The studio",
    body: "Reference first. A mix should arrive with its decisions intact, not smoothed into comfort.",
    Scene: StudioScene,
  },
  {
    index: "03",
    tag: "Aware / 08:15",
    title: "The city, softened",
    body: "Aware mode keeps the platform announcement and removes the edge around it. Attention, not isolation.",
    Scene: CityScene,
  },
];

export function Lifestyle() {
  return (
    <section id="in-use" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="06">In use</SectionLabel>
          <p className="label text-silver-dim">Three studies of attention</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              as="h2"
              lines={["FOR THE HOURS", "BETWEEN."]}
              className="display text-[clamp(2.6rem,6.4vw,6.2rem)]"
              lineClassName={["", "text-silver/40"]}
            />
          </div>
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="copy text-[14px] md:text-[15px]">
              VYRA ONE is not designed for a single room. It is designed for the transitions — the
              train, the desk, the walk home — when the world changes and the listening should not.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-16">
          {MOMENTS.map((moment, index) => {
            const Scene = moment.Scene;
            return (
              <Reveal key={moment.index} delay={index * 0.08}>
                <article className="group overflow-hidden rounded-2xl border border-line bg-graphite/20">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
                      <Scene />
                    </div>
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                      <span className="label text-silver-dim">{moment.index}</span>
                      <span className="h-px w-5 bg-ivory/20" aria-hidden="true" />
                      <span className="label text-silver-dim">{moment.tag}</span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:linear-gradient(115deg,transparent_35%,rgba(240,238,233,0.06)_50%,transparent_65%)]"
                    />
                  </div>
                  <div className="border-t border-line p-5">
                    <h3 className="text-[19px] tracking-[-0.02em] text-ivory">{moment.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-silver">{moment.body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="label text-silver-dim">
            Atmosphere studies — original CSS compositions, not photography
          </p>
          <p className="label text-silver-dim">Concept narrative / no real locations</p>
        </div>
      </div>
    </section>
  );
}
