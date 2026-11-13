import type { FaqItem } from "@/types";

export const FAQS: FaqItem[] = [
  {
    id: "concept",
    question: "Is VYRA a real company?",
    answer:
      "No. VYRA is a fictional concept brand created as a design and engineering demonstration. VYRA ONE is not for sale, no orders are fulfilled, and no payment is ever collected. The site is a fully interactive prototype.",
  },
  {
    id: "order",
    question: "Can I actually buy VYRA ONE?",
    answer:
      "The bag and checkout flow are demonstrations. You can configure a product, add it to your bag and step through a demo checkout, but nothing is transmitted, charged or shipped. Your bag is stored only in this browser using local storage.",
  },
  {
    id: "shipping",
    question: "How would shipping work?",
    answer:
      "In this concept, VYRA ONE would ship worldwide from a single studio partner with complimentary carbon-balanced delivery. Illustrative timelines: 2–4 working days within Europe, 4–8 working days elsewhere. No real shipping exists.",
  },
  {
    id: "returns",
    question: "What is the returns position?",
    answer:
      "The concept policy is a 30-day listening window: use the product properly, and if it is not for you, return it in any condition short of damage. This is illustrative copy for the prototype, not a contractual offer.",
  },
  {
    id: "finishes",
    question: "Which finish should I choose?",
    answer:
      "Obsidian is the most discreet and reads as a silhouette. Lunar Silver is warmer and more architectural in daylight. Violet Dusk is the most expressive and shifts between graphite and mineral violet depending on the light. All three share the same acoustic architecture.",
  },
  {
    id: "cushions",
    question: "Standard or Premium cushions?",
    answer:
      "Standard uses a knitted acoustic mesh over a memory core — cooler over long sessions and slightly more open. Premium uses a denser microfibre for a warmer seal and stronger passive isolation. Both are replaceable and magnetically mounted.",
  },
  {
    id: "spatial",
    question: "Does spatial audio need special content?",
    answer:
      "In the concept, the renderer works with stereo material by deriving elevation and rear cues, and with native multichannel content for a more precise stage. The Listening Room on the Technology page is a synthesised browser demo, not a recording of the headphones.",
  },
  {
    id: "support",
    question: "Where can I get help?",
    answer:
      "The Support page contains the full concept FAQ, care guidance and a contact form. The form validates locally and confirms on-screen; it does not send email to any external service.",
  },
];
