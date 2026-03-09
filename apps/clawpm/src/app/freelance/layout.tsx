import Link from 'next/link';
import { ReactNode } from 'react';

export default function FreelanceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/freelance" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-blue-600">
              ClawPM
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/freelance" className="text-gray-700 hover:text-ocean-600 font-medium">
                Dashboard
              </Link>
              <Link href="/freelance/proposals" className="text-gray-700 hover:text-ocean-600 font-medium">
                Proposals
              </Link>
              <Link href="/freelance/agents" className="text-gray-700 hover:text-ocean-600 font-medium">
                Agents
              </Link>
              <Link href="/freelance/tasks" className="text-gray-700 hover:text-ocean-600 font-medium">
                Tasks
              </Link>
              <Link href="/freelance/analytics" className="text-gray-700 hover:text-ocean-600 font-medium">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
