'use client';

import { AgentCard, Button } from '@monorepo/ui';
import type { Agent } from '@monorepo/types';

// Mock data
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'ArchBot Alpha',
    role: 'architecture',
    status: 'active',
    currentTask: 'Designing microservices architecture for Project X',
    completedTasks: 47,
    successRate: 0.94,
    spawnedAt: new Date('2026-03-01'),
    lastActive: new Date(),
    capabilities: ['System Design', 'Scalability', 'Cloud Architecture', 'API Design'],
  },
  {
    id: '2',
    name: 'QA Sentinel',
    role: 'qa',
    status: 'busy',
    currentTask: 'Running integration tests on payment module',
    completedTasks: 89,
    successRate: 0.97,
    spawnedAt: new Date('2026-02-15'),
    lastActive: new Date(),
    capabilities: ['Automated Testing', 'Code Review', 'Bug Detection', 'Performance Testing'],
  },
  {
    id: '3',
    name: 'DevOps Commander',
    role: 'devops',
    status: 'idle',
    completedTasks: 56,
    successRate: 0.91,
    spawnedAt: new Date('2026-02-20'),
    lastActive: new Date(),
    capabilities: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoring'],
  },
  {
    id: '4',
    name: 'Sales Navigator',
    role: 'sales',
    status: 'active',
    currentTask: 'Following up with 3 high-value leads',
    completedTasks: 34,
    successRate: 0.76,
    spawnedAt: new Date('2026-03-05'),
    lastActive: new Date(),
    capabilities: ['Lead Generation', 'Outreach', 'Proposal Optimization', 'CRM Management'],
  },
];

export default function AgentsPage() {
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
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Agents</p>
            <p className="text-2xl font-bold text-gray-900">{mockAgents.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {mockAgents.filter(a => a.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <p className="text-2xl font-bold text-gray-900">
              {mockAgents.reduce((sum, a) => sum + a.completedTasks, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Avg Success Rate</p>
            <p className="text-2xl font-bold text-ocean-600">
              {(mockAgents.reduce((sum, a) => sum + a.successRate, 0) / mockAgents.length * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

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
