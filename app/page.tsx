import LuxuryHero from '@/components/LuxuryHero'
import FloatingCardsContainer from '@/components/FloatingCardsContainer'
import IntroSection from '@/components/IntroSection'
import AnticipationSection from '@/components/AnticipationSection'
import ServicePhilosophySection from '@/components/ServicePhilosophySection'
import FeaturesSection from '@/components/FeaturesSection'
import CraftedExperiences from '@/components/CraftedExperiences'
import EvolutionSection from '@/components/EvolutionSection'
import FutureCTASection from '@/components/FutureCTASection'

export default function Home() {
    return (
        <main className="min-h-screen bg-danholt-light flex flex-col">
            <div className="relative">
                {/* <FloatingCardsContainer /> */}
                <LuxuryHero />
                <IntroSection />
                <AnticipationSection />
            </div>
            <ServicePhilosophySection />
            <FeaturesSection />
            <CraftedExperiences />
            <EvolutionSection />
            <FutureCTASection />
        </main>
    )
}
