import type { Metadata } from 'next';
import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveChatWidget from '@/components/LiveChatWidget';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Danholt Suites | World Class Luxury',
  description: 'Experience the evolution of hospitality at Danholt Suites.',
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
          <Header />
          <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
          <Footer />
          <LiveChatWidget />
        </SmoothScrolling>
      </body>
    </html>
  );
}
