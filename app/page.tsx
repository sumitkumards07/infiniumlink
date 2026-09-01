import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TryItNow } from "@/components/landing/TryItNow";
import { PerformanceStats } from "@/components/landing/PerformanceStats";
import { BioPages } from "@/components/landing/BioPages";
import { FormsSection } from "@/components/landing/FormsSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { SupportedApps } from "@/components/landing/SupportedApps";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans">
      <Navbar />
      <main>
        <Hero />
        <TryItNow />
        <PerformanceStats />
        <BioPages />
        <FormsSection />
        <FeatureGrid />
        <SupportedApps />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
