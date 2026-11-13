import type { Feature } from "@/types";

export const FEATURES: Feature[] = [
  {
    id: "spatial",
    index: "01",
    title: "Spatial Audio",
    kicker: "A stage, not a speaker",
    description:
      "VYRA ONE renders sound as a place. Instruments hold position, vocals occupy space, and the room around you becomes part of the mix — without losing the intent of the recording.",
  },
  {
    id: "anc",
    index: "02",
    title: "Adaptive Noise Control",
    kicker: "The world, softened",
    description:
      "A concept response system reads the character of your surroundings and reshapes attenuation continuously — from the low hum of a cabin to the bright clatter of a café.",
  },
  {
    id: "acoustics",
    index: "03",
    title: "Precision Acoustics",
    kicker: "Engineered restraint",
    description:
      "A 40 mm beryllium-coated driver sits in a vented, internally braced chamber. The result is control: deep without bloom, detailed without brightness.",
  },
  {
    id: "comfort",
    index: "04",
    title: "All-Day Comfort",
    kicker: "Disappear by design",
    description:
      "A suspended headband spreads load across the crown while memory-core cushions seal gently rather than clamp. Designed to be forgotten after the first minute.",
  },
  {
    id: "connectivity",
    index: "05",
    title: "Seamless Connectivity",
    kicker: "Move without ceremony",
    description:
      "Two devices, one attention span. VYRA ONE holds a primary connection and a standby device, handing off automatically when a call or a film asks for you.",
  },
  {
    id: "controls",
    index: "06",
    title: "Intelligent Controls",
    kicker: "Touch, with intention",
    description:
      "A machined control rail and a considered touch surface. Gestures are deliberate, discoverable and quiet — no accidental pauses, no hunting for a button.",
  },
];

export const TECHNOLOGY_PILLARS = [
  {
    id: "acoustics",
    index: "01",
    title: "Acoustic Architecture",
    body: "Every VYRA ONE begins as a volume of air. The driver, chamber and vent are designed together, so the enclosure behaves as part of the acoustic system rather than a container around it. Internal bracing breaks up standing waves; a tuned rear vent controls pressure without leaking intent.",
    note: "Concept specification — 40 mm beryllium-coated dynamic driver.",
  },
  {
    id: "spatial",
    index: "02",
    title: "Spatial Rendering",
    body: "Spatial audio is often treated as an effect. We treat it as a coordinate system. Head-tracked rendering anchors the mix in space while a gentle room model adds early reflections, so the stage stays believable when you turn your head.",
    note: "Illustrative concept — head tracking is simulated in this demo.",
  },
  {
    id: "noise",
    index: "03",
    title: "Noise Control",
    body: "Silence is not a single state. The concept model maps environmental noise in real time and adjusts attenuation across bands — protecting quiet detail in a library, softening low-frequency drone on a flight, staying aware at a station platform.",
    note: "Concept behaviour, not a shipped feature.",
  },
  {
    id: "materials",
    index: "04",
    title: "Materials",
    body: "Anodised aluminium, recycled composite and a single continuous textile. Materials are chosen for how they age, not only how they look on day one. Surfaces are bead-blasted to a satin finish that resists fingerprints and reveals the form.",
    note: "Illustrative material narrative.",
  },
  {
    id: "ergonomics",
    index: "05",
    title: "Ergonomics",
    body: "The clamp force curve is deliberately non-linear: light at rest, stable in motion. Cushions use a slow-recovery core so pressure redistributes over time. The headband is suspended, keeping hard structure away from the crown.",
    note: "Concept ergonomic study.",
  },
  {
    id: "interface",
    index: "06",
    title: "Interface",
    body: "Controls should be felt before they are seen. A single machined rail carries power, pairing and a physical mode switch, while the outer cup reads gestures. Haptics confirm intent with a low, quiet pulse — never a buzz.",
    note: "Concept interface study.",
  },
] as const;
