export interface MembershipTier {
    id: 'bronze' | 'silver' | 'gold';
    name: string;
    price: string;
    tagline: string;
    benefits: string[];
    popular?: boolean;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
    {
        id: 'bronze',
        name: 'Bronze',
        price: 'My ₦1,000 / month',
        tagline: 'Perfect for frequent diners and casual guests.',
        benefits: [
            '5% off all restaurant bills',
            'Complimentary soft drink with every dine-in meal',
            'Birthday dessert on your special day',
            'Entry into our monthly draw for a complimentary meal or room night'
        ]
    },
    {
        id: 'silver',
        name: 'Silver',
        price: 'From ₦3,000 / month',
        tagline: 'For regular guests who love elevated comfort.',
        benefits: [
            '10% off room bookings on weekdays',
            'Priority late checkout when available',
            'Complimentary welcome drink at check-in',
            'Entry into our monthly draw for a complimentary room night or dinner'
        ],
        popular: true
    },
    {
        id: 'gold',
        name: 'Gold',
        price: 'From ₦5,000+ / month',
        tagline: 'For guests who want the full Danholt experience.',
        benefits: [
            '15% off selected room categories all week',
            'Priority room upgrades when available',
            'Invitations to members-only events and tastings',
            'Premium entry into our monthly draws with higher-value rewards'
        ]
    }
];
