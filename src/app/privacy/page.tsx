import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "VYRA is a fictional concept brand. This privacy note explains exactly what stays in your browser and what is never collected.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Nothing leaves this browser."
      intro="VYRA is a design concept, not a store. This page describes the only data the experience creates — a few local preferences — and the things it deliberately does not do."
      updated="Last revised 13 November 2026 · Concept build v1.0"
      sections={[
        {
          id: "short-version",
          title: "The short version",
          body: [
            "There are no accounts, no sign-ups and no server-side profiles. The site stores a small amount of information in your own browser so the configurator, bag and newsletter demo feel continuous between pages.",
            "Nothing is transmitted to VYRA, because there is no VYRA backend to transmit to. The brand is fictional and this build is a self-contained front-end experience.",
          ],
        },
        {
          id: "local-data",
          title: "What stays in your browser",
          body: [
            "Three local storage keys are used: vyra:finish remembers your selected finish, vyra:bag:v1 remembers the items and quantities in the demo bag, and vyra:newsletter remembers any address you chose to add to the local concept list.",
            "This information never expires on its own. You can remove it at any time by clearing site data for this domain in your browser settings. The bag and finish will then return to their defaults.",
            "Local storage is not a cookie, is not shared across domains, and is not readable by other websites. It is also not encrypted — it is simply a text store on your device, so avoid entering anything sensitive into the demo forms.",
          ],
        },
        {
          id: "not-collected",
          title: "What is not collected",
          body: [
            "This build contains no analytics, advertising pixels, session recording, fingerprinting, cross-site tracking or marketing automation. Fonts and 3D assets are bundled with the project rather than fetched from third-party services.",
            "No microphone, camera, location, contacts or device identifiers are requested. The Listening Room synthesises tones inside your browser and does not play or record any audio from your environment.",
            "If this concept is served by a hosting provider, that provider may keep standard technical access logs under its own policy. That activity is outside the design of this build and outside the control of a fictional brand.",
          ],
        },
        {
          id: "forms",
          title: "Forms and the sound lab",
          body: [
            "The newsletter, contact and checkout forms validate your input locally and show a local confirmation. They do not send email, create an order, reserve stock or contact a payment provider. No card details are requested anywhere in the experience.",
            "The demo checkout keeps its confirmation in memory only. Closing or reloading the page ends the demonstration; the bag contents remain until you remove them or clear site data.",
            "The Listening Room uses the Web Audio API to generate oscillators. It begins only after you press play, and stops when you press stop or leave the page.",
          ],
        },
        {
          id: "third-parties",
          title: "Third parties",
          body: [
            "There are no external integrations, payment processors, CRMs, email platforms or embedded media players. The typefaces, diagrams, 3D models and interface code are part of the project itself.",
            "Because there are no third-party scripts, there is nothing to consent to and no cookie banner to dismiss. That is a deliberate choice for a concept piece, not a claim about how a real commercial product would operate.",
          ],
        },
        {
          id: "choices",
          title: "Your choices",
          body: [
            "You can browse the site with local storage blocked. The bag, finish and newsletter demo will fall back gracefully or explain that saving is unavailable, but the pages will still render.",
            "You can use a private window to start with an empty bag and no remembered finish. You can also disable JavaScript, though the interactive 3D and configurator require it.",
          ],
        },
        {
          id: "children",
          title: "Children",
          body: [
            "This is a design portfolio concept rather than a product for children. It is not directed at anyone under 16, and it does not knowingly create profiles of any visitor — of any age — because it does not create profiles at all.",
          ],
        },
        {
          id: "changes",
          title: "Changes and contact",
          body: [
            "If the concept is revised, this page will be updated and the revision date above will change. There is no mailing list to notify, only the local demo list described earlier.",
            "Questions about this note can be raised through the support page. That form is a local-only demonstration, so it is best treated as part of the concept rather than a route to a real privacy office.",
          ],
        },
      ]}
    />
  );
}
