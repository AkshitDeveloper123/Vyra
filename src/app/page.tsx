import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatementStrip } from "@/components/sections/StatementStrip";
import { ProductIntro } from "@/components/sections/ProductIntro";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { FinishShowcase } from "@/components/sections/FinishShowcase";
import { TechTeaser } from "@/components/sections/TechTeaser";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "VYRA — Hear beyond the frame",
  description:
    "VYRA ONE is a fictional concept headphone exploring spatial sound, material honesty and the rituals of listening.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatementStrip />
      <ProductIntro />
      <FeatureShowcase />
      <ScrollStory />
      <FinishShowcase />
      <TechTeaser />
      <Lifestyle />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
