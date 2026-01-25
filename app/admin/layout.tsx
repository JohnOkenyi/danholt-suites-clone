import type { Metadata } from 'next';
import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import LiveChatWidget from '@/components/LiveChatWidget';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Admin Dashboard | Danholt Suites',
  description: 'Admin booking management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <LiveChatWidget />
      </body>
    </html>
  );
}
