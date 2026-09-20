import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vivianlin423-glitch.github.io/portfolio/'),
  title: 'Vivian Lin — Video Reasoning & Robotics',
  description:
    'Selected work in video reasoning, robotics simulation, counterfactual generation, and human evaluation.',
  alternates: {
    canonical: 'https://vivianlin423-glitch.github.io/portfolio/',
  },
  openGraph: {
    title: 'Vivian Lin — Video Reasoning & Robotics',
    description:
      'Selected work in video reasoning, robotics simulation, counterfactual generation, and human evaluation.',
    url: 'https://vivianlin423-glitch.github.io/portfolio/',
    siteName: 'Vivian Lin — Video Reasoning & Robotics',
    images: [
      {
        url: 'https://vivianlin423-glitch.github.io/portfolio/og.png',
        width: 1200,
        height: 630,
        alt: 'Vivian Lin — Video Reasoning, Robotics, Simulation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivian Lin — Video Reasoning & Robotics',
    description:
      'Selected work in video reasoning, robotics simulation, counterfactual generation, and human evaluation.',
    images: ['https://vivianlin423-glitch.github.io/portfolio/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
