import type {
  AccessoryOption,
  CushionOption,
  Finish,
  FinishId,
  ViewerAngle,
} from "@/types";

export const BASE_PRICE = 399;

export const FINISHES: Finish[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    short: "OBS",
    description:
      "A near-black anodised shell that absorbs light and lets the silhouette do the talking.",
    swatch: "#20232b",
    swatchEdge: "#3a3e4a",
    shell: "#1c1f27",
    shellAccent: "#2b2f3a",
    cushion: "#111319",
    metal: "#a7abb8",
    roughness: 0.34,
    metalness: 0.42,
  },
  {
    id: "lunar",
    name: "Lunar Silver",
    short: "LUN",
    description:
      "Warm brushed aluminium, finished by hand so every surface catches the light differently.",
    swatch: "#cdcac4",
    swatchEdge: "#f2f0ea",
    shell: "#c9c6c0",
    shellAccent: "#dedbd5",
    cushion: "#a8a49c",
    metal: "#eae8e3",
    roughness: 0.28,
    metalness: 0.72,
  },
  {
    id: "violet",
    name: "Violet Dusk",
    short: "VIO",
    description:
      "A deep mineral violet with a satin finish. Quietly expressive, never loud.",
    swatch: "#4b3f78",
    swatchEdge: "#7d6bc4",
    shell: "#443a70",
    shellAccent: "#5b4d92",
    cushion: "#241f38",
    metal: "#bdb0ff",
    roughness: 0.3,
    metalness: 0.5,
  },
];

export const FINISH_MAP: Record<FinishId, Finish> = FINISHES.reduce(
  (acc, finish) => ({ ...acc, [finish.id]: finish }),
  {} as Record<FinishId, Finish>,
);

export const CUSHIONS: CushionOption[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Knitted acoustic mesh with a soft-touch memory core.",
    price: 0,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Lambskin-soft microfibre. Warmer, denser, more isolating.",
    price: 49,
  },
];

export const ACCESSORIES: AccessoryOption[] = [
  {
    id: "none",
    name: "None",
    description: "Ships with the woven travel pouch and USB-C cable.",
    price: 0,
  },
  {
    id: "travel",
    name: "Travel Kit",
    description: "Hard-shell case, braided USB-C and a 3.5 mm studio cable.",
    price: 79,
  },
];

export const CUSHION_MAP = Object.fromEntries(
  CUSHIONS.map((c) => [c.id, c]),
) as Record<CushionOption["id"], CushionOption>;

export const ACCESSORY_MAP = Object.fromEntries(
  ACCESSORIES.map((a) => [a.id, a]),
) as Record<AccessoryOption["id"], AccessoryOption>;

export function configPrice(
  cushion: CushionOption["id"],
  accessory: AccessoryOption["id"],
) {
  return BASE_PRICE + CUSHION_MAP[cushion].price + ACCESSORY_MAP[accessory].price;
}

export const VIEWER_ANGLES: ViewerAngle[] = [
  { id: "front", label: "Front", position: [0, 0.25, 9.2], target: [0, 0, 0] },
  { id: "profile", label: "Profile", position: [7.4, 0.5, 3.2], target: [0, 0, 0] },
  { id: "detail", label: "Detail", position: [4.2, 0.9, 4.6], target: [1.35, 0.15, 0] },
  { id: "back", label: "Back", position: [-2.2, 1.4, -7.6], target: [0, 0, 0] },
];

export const CONCEPT_NOTE =
  "VYRA ONE is a fictional concept product. Specifications are illustrative, not verified real-world claims.";
