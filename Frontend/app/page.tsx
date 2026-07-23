import type { Metadata } from "next";
import { LandingCallToAction } from "@/components/landing/LandingCallToAction";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPreparation } from "@/components/landing/LandingPreparation";
import { LandingProcess } from "@/components/landing/LandingProcess";
import { LandingPurpose } from "@/components/landing/LandingPurpose";

export const metadata: Metadata = {
  title: "HIMTI PartnerHub | Media Partnership Applications",
  description:
    "Submit a media partnership application to HIMTI BINUS University, receive review feedback, and complete agreed partnership deliverables.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-brand-dark px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content">
        <LandingHero />
        <LandingPurpose />
        <LandingProcess />
        <LandingPreparation />
        <LandingCallToAction />
      </main>
      <LandingFooter />
    </div>
  );
}
