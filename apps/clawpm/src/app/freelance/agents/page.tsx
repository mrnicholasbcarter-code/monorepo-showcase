'use client';

import { AgentCard, Button } from '@monorepo/ui';
import { trpc } from '@/lib/trpc';

export default function AgentsPage() {
  // Fetch agents from API
  const { data: agents, isLoading, error } = trpc.agents.list.useQuery({
    status: 'all',
    limit: 50,
  });

  const { data: stats } = trpc.agents.getStats.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
            <p className="text-gray-600 mt-1">Your autonomous workforce</p>
          </div>
          <Button>+ Spawn New Agent</Button>
        </div>

        {/* Agent Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAgents}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeAgents}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTasksCompleted}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-ocean-600">
                {(stats.avgSuccessRate * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-ocean-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading agents...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading agents: {error.message}
          </div>
        )}

        {/* Agents Grid */}
        {!isLoading && !error && agents && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>

            {agents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No agents spawned yet
              </div>
            )}
          </>
        )}

        {/* Spawn Agent Section */}
        <div className="mt-8 bg-gradient-to-r from-ocean-500 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Need a New Agent?</h2>
          <p className="mb-4 opacity-90">
            Spawn specialized agents for architecture, QA, DevOps, sales, marketing, and more
          </p>
          <Button variant="secondary">View Available Roles</Button>
        </div>
      </div>
    </div>
  );
}
