import type { Metadata } from 'next';
import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import PublicLayout from '@/components/PublicLayout';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Danholt Suites | World Class Luxury & Hospitality',
    template: '%s | Danholt Suites'
  },
  description: 'Experience the evolution of hospitality at Danholt Suites. Luxury rooms, premium dining, and world-class facilities in Abuja.',
  keywords: ['luxury hotel', 'Abuja suites', 'fine dining', 'conference hall', 'sports center', 'Danholt Suites'],
  authors: [{ name: 'Danholt Suites' }],
  creator: 'Danholt Suites',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danholtsuites.com',
    siteName: 'Danholt Suites',
    title: 'Danholt Suites | World Class Luxury',
    description: 'Redefining luxury hospitality in Abuja.',
    images: [
      {
        url: '/images/hero-slide-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Danholt Suites Luxury Room',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danholt Suites | World Class Luxury',
    description: 'Experience the evolution of hospitality.',
    images: ['/images/hero-slide-1.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-danholt-navy text-danholt-cream antialiased selection:bg-danholt-gold selection:text-white overflow-x-hidden`}>
        <SmoothScrolling>
          <PublicLayout>
            {children}
          </PublicLayout>
        </SmoothScrolling>
      </body>
    </html>
  );
}
