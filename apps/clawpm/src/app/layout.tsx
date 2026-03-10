import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '@/lib/trpc-provider';

export const metadata: Metadata = {
  title: 'ClawPM - AI-First Freelance Management',
  description: 'Manage your entire freelance business with AI-powered automation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-ocean-500/30 selection:text-ocean-200">
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  );
}
