import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSolution from '@/components/ProblemSolution';
import FeaturesGrid from '@/components/FeaturesGrid';
import FounderVision from '@/components/FounderVision';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <ProblemSolution />
            <FeaturesGrid />
            <FounderVision />
            <FinalCTA />
            <Footer />
        </main>
    );
}
