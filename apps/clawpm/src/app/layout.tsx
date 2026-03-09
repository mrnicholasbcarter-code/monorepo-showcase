import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ClawPM - AI-First Freelance Management',
  description: 'Manage your entire freelance business with AI-powered automation',
};

export default function RootLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-ocean-50 to-blue-50">
        {children}
      </body>
    </html>
  );
}
