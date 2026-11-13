export const SITE = {
  name: "VYRA",
  tagline: "Hear beyond the frame.",
  description:
    "VYRA is a concept audio house exploring spatial sound, material honesty and the rituals of listening. Discover VYRA ONE.",
  url: "https://vyra.audio",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/technology", label: "Technology" },
  { href: "/our-story", label: "Our Story" },
  { href: "/support", label: "Support" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "VYRA ONE" },
      { href: "/product#configurator", label: "Configure" },
      { href: "/product#specifications", label: "Specifications" },
      { href: "/product#viewer", label: "3D Viewer" },
    ],
  },
  {
    title: "Technology",
    links: [
      { href: "/technology", label: "Overview" },
      { href: "/technology#acoustics", label: "Acoustic Architecture" },
      { href: "/technology#spatial", label: "Spatial Audio" },
      { href: "/technology#listening-room", label: "Listening Room" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Help Centre" },
      { href: "/support#faq", label: "FAQ" },
      { href: "/support#contact", label: "Contact" },
      { href: "/support#shipping", label: "Shipping & Returns" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/our-story#principles", label: "Principles" },
      { href: "/our-story#timeline", label: "Concept Timeline" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;
