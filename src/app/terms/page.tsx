import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for the VYRA concept experience: a fictional brand, a demonstration checkout, and illustrative specifications rather than a real product offer.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="A concept, not a contract."
      intro="VYRA ONE is a fictional product in a portfolio concept. These terms explain what this experience is, what it is not, and how its demonstrations should be understood."
      updated="Last revised 13 November 2026 · Concept build v1.0"
      sections={[
        {
          id: "concept-status",
          title: "Concept status",
          body: [
            "VYRA is a fictional audio brand created for a design and engineering demonstration. VYRA ONE does not exist as a manufactured product. No company, subsidiary or commercial entity is represented here, and no real-world affiliation should be inferred.",
            "By using this site you are exploring a concept interface. Nothing on these pages constitutes an offer, an invitation to treat, a warranty or a representation that any product or service is available.",
          ],
        },
        {
          id: "no-purchases",
          title: "No purchases or payments",
          body: [
            "The bag and checkout are interactive demonstrations. Adding an item, choosing a finish and completing the checkout flow does not create an order, charge a card, reserve inventory or initiate delivery. No payment details are collected at any point.",
            "Prices, taxes, delivery estimates and order confirmations are illustrative interface content. They exist to show how the experience would behave, not to form a transaction.",
          ],
        },
        {
          id: "specifications",
          title: "Illustrative specifications",
          body: [
            "Technical figures — driver dimensions, frequency response, battery life, weight, latency and noise cancellation depth — are design intent. They have not been measured on a physical prototype and should not be relied on for any engineering, purchasing or safety decision.",
            "Renders, diagrams and material studies are original artwork made for the concept. Colour reproduction varies by display, and a finish shown on screen is not a guarantee of a physical appearance.",
          ],
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: [
            "The VYRA name, wordmark, page copy, interface design, procedural 3D models, diagrams and code in this build are original work created for the concept. The fictional trademarks are used only to identify this demonstration.",
            "You may view the site, share links to it and discuss it. You may not present it as a real commercial product, pass the work off as your own, or use the VYRA identity in a way that misleads people about a real company or product.",
          ],
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: [
            "Please do not attempt to disrupt the site, probe it for vulnerabilities without permission, scrape it at volume, or use it to distribute unlawful or harmful material. The experience has no authentication and no private data, so there is nothing here worth attacking.",
            "Automated access that degrades availability for others is not welcome. Ordinary browsing, linking and referencing for critique or education are.",
          ],
        },
        {
          id: "audio-3d",
          title: "Audio, 3D and device demands",
          body: [
            "The Listening Room synthesises tones locally using the Web Audio API. It starts only when you press play. Please begin at a low device volume; sustained tones can be uncomfortable through headphones, and this is not a hearing test or a calibrated monitoring tool.",
            "The 3D views use WebGL and can be demanding on older devices. Where WebGL is unavailable, a static illustration is shown instead. Battery use, frame rate and thermal behaviour vary by device and are not guaranteed.",
          ],
        },
        {
          id: "availability",
          title: "Availability and changes",
          body: [
            "The concept may be changed, taken offline or rebuilt without notice. There is no service-level commitment, no uptime guarantee and no support obligation. Features described on these pages may be adjusted or removed as the demonstration evolves.",
            "Any local data — the demo bag, finish preference or local newsletter list — lives only in your browser and may be lost when you clear site data or change devices.",
          ],
        },
        {
          id: "liability",
          title: "Liability",
          body: [
            "This experience is provided as a design demonstration, as is and as available, without warranties of any kind. To the fullest extent permitted by law, no liability is accepted for loss or damage arising from use of the site, reliance on its illustrative figures, or the behaviour of its demonstrations.",
            "Nothing in these terms excludes or limits any right or liability that cannot lawfully be excluded or limited. Because this is a fictional concept, the practical scope of any claim is limited to the demonstration itself.",
          ],
        },
        {
          id: "contact",
          title: "Questions",
          body: [
            "This page is part of the concept rather than a legal agreement with a trading entity. If something is unclear, the support page gathers the intended behaviour of the demonstration, and the privacy page explains the small amount of data kept in your browser.",
            "These terms should be read alongside that privacy note. Together they describe a self-contained front-end project with no real transactions, accounts or external integrations.",
          ],
        },
      ]}
    />
  );
}
