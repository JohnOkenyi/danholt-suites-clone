import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Danholt Suites | Your Home in Abuja',
  description: 'Experience comfort, privacy, and convenience at Danholt Suites – where every stay feels like coming home.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}
