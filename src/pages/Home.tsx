import Hero from "@/components/landing/Hero";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <BenefitsSection />
        <HowItWorks />
        <CTA />
      </main>
    </div>
  );
}

export default Home;
