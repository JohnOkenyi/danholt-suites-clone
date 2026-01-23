import MembershipSection from '@/components/MembershipSection'
import PackagesSection from '@/components/PackagesSection'
import EventPassBlock from '@/components/EventPassBlock'
import ReferralSection from '@/components/ReferralSection'

export default function MembershipPage() {
    return (
        <main className="min-h-screen bg-danholt-midnight pt-20">
            <MembershipSection />
            <PackagesSection />
            <EventPassBlock />
            <ReferralSection />
        </main>
    )
}
