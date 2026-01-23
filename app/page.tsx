import LuxuryHero from '@/components/LuxuryHero'
import FloatingCardsContainer from '@/components/FloatingCardsContainer'
import IntroSection from '@/components/IntroSection'
import AnticipationSection from '@/components/AnticipationSection'
import ServicePhilosophySection from '@/components/ServicePhilosophySection'
import FeaturesSection from '@/components/FeaturesSection'
import CraftedExperiences from '@/components/CraftedExperiences'
import EvolutionSection from '@/components/EvolutionSection'
import FutureCTASection from '@/components/FutureCTASection'
import MembershipSection from '@/components/MembershipSection'
import PackagesSection from '@/components/PackagesSection'
import EventPassBlock from '@/components/EventPassBlock'
import ReferralSection from '@/components/ReferralSection'

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
            <MembershipSection />
            <CraftedExperiences />
            <PackagesSection />
            <EventPassBlock />
            <EvolutionSection />
            <ReferralSection />
            <FutureCTASection />
        </main>
    )
}
