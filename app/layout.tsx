import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import PublicLayout from '@/components/PublicLayout';
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
          <PublicLayout>
            {children}
          </PublicLayout>
        </SmoothScrolling>
        
        {/* ElevenLabs Voice Agent Widget */}
        <elevenlabs-convai agent-id="agent_4701kfynh9t9fwsrvabne3hs7f3f"></elevenlabs-convai>
        <Script
          src="https://elevenlabs.io/convai-widget/index.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
