'use client';

import { StatsCard, Button } from '@monorepo/ui';
import Link from 'next/link';

// Mock data - replace with real API calls
const stats = {
  totalProposals: 127,
  activeProposals: 23,
  winRate: 34.2,
  activeAgents: 6,
  tasksCompleted: 89,
  avgResponseTime: 4.2,
};

export default function FreelanceDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Freelance Command Center</h1>
            <p className="text-gray-600 mt-1">AI-powered freelance management platform</p>
          </div>
          <div className="flex gap-3">
            <Link href="/freelance/proposals/new">
              <Button>+ New Proposal</Button>
            </Link>
            <Link href="/freelance/agents/spawn">
              <Button variant="secondary">Spawn Agent</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Proposals"
            value={stats.totalProposals}
            change={{ value: 12, trend: 'up' }}
            icon="📄"
          />
          <StatsCard
            title="Active Proposals"
            value={stats.activeProposals}
            icon="⏳"
          />
          <StatsCard
            title="Win Rate"
            value={`${stats.winRate}%`}
            change={{ value: 5.3, trend: 'up' }}
            icon="🎯"
          />
          <StatsCard
            title="Active Agents"
            value={stats.activeAgents}
            icon="🤖"
          />
          <StatsCard
            title="Tasks Completed"
            value={stats.tasksCompleted}
            change={{ value: 8, trend: 'up' }}
            icon="✅"
          />
          <StatsCard
            title="Avg Response Time"
            value={`${stats.avgResponseTime}h`}
            change={{ value: 15, trend: 'down' }}
            icon="⚡"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/freelance/proposals">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Proposals</h3>
              <p className="text-sm text-gray-600">
                Track, submit, and optimize proposals across all platforms
              </p>
            </div>
          </Link>

          <Link href="/freelance/agents">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Agents</h3>
              <p className="text-sm text-gray-600">
                Spawn and manage specialized agents for automation
              </p>
            </div>
          </Link>

          <Link href="/freelance/analytics">
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">
                ML-powered insights and performance metrics
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
