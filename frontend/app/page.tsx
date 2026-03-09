import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import ProblemSolution from "@/components/ProblemSolution";
import AppShowcase from "@/components/AppShowcase";
import FounderVision from "@/components/FounderVision";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolution />
        <AppShowcase />
        <FeaturesGrid />
        <FounderVision />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
