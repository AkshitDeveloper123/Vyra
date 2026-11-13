export type FinishId = "obsidian" | "lunar" | "violet";
export type CushionId = "standard" | "premium";
export type AccessoryId = "none" | "travel";

export interface Finish {
  id: FinishId;
  name: string;
  short: string;
  description: string;
  swatch: string;
  swatchEdge: string;
  /** 3D material colours */
  shell: string;
  shellAccent: string;
  cushion: string;
  metal: string;
  roughness: number;
  metalness: number;
}

export interface CushionOption {
  id: CushionId;
  name: string;
  description: string;
  price: number;
}

export interface AccessoryOption {
  id: AccessoryId;
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  key: string;
  productId: "vyra-one";
  finish: FinishId;
  cushion: CushionId;
  accessory: AccessoryId;
  quantity: number;
  unitPrice: number;
}

export interface Feature {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  category: "Page" | "Product" | "Technology" | "Support" | "Story";
  keywords?: string[];
}

export interface ViewerAngle {
  id: string;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}
