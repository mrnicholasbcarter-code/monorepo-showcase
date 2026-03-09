'use client';

import { useState } from 'react';
import { ProposalCard, Button } from '@monorepo/ui';
import type { Proposal, Platform, ProposalStatus } from '@monorepo/types';

// Mock data
const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Full-stack TypeScript Developer for SaaS Platform',
    platform: 'upwork',
    jobUrl: 'https://upwork.com/job/123',
    status: 'accepted',
    budget: { min: 5000, max: 8000, currency: 'USD' },
    variant: 'A',
    mlScore: 0.87,
    clientName: 'TechCorp Inc',
    description: 'Looking for an experienced full-stack developer proficient in TypeScript, React, and Node.js...',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-09'),
  },
  {
    id: '2',
    title: 'Next.js Developer for E-commerce Migration',
    platform: 'freelancer',
    jobUrl: 'https://freelancer.com/job/456',
    status: 'pending',
    budget: { min: 3000, max: 5000, currency: 'USD' },
    variant: 'B',
    mlScore: 0.72,
    description: 'Need a skilled Next.js developer to migrate our e-commerce platform...',
    tags: ['Next.js', 'E-commerce', 'Migration'],
    createdAt: new Date('2026-03-07'),
    updatedAt: new Date('2026-03-09'),
  },
  // Add more mock data...
];

export default function ProposalsPage() {
  const [filter, setFilter] = useState<ProposalStatus | 'all'>('all');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');

  const filtered Proposals = mockProposals.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (platform !== 'all' && p.platform !== platform) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
          <Button>+ New Proposal</Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ProposalStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
            >
              <option value="all">All Platforms</option>
              <option value="upwork">Upwork</option>
              <option value="freelancer">Freelancer</option>
              <option value="guru">Guru</option>
              <option value="fiverr">Fiverr</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No proposals found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}
