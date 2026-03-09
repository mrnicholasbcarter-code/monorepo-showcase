'use client';

import { useState } from 'react';
import { ProposalCard, Button } from '@monorepo/ui';
import type { Platform, ProposalStatus } from '@monorepo/types';
import { trpc } from '@/lib/trpc';

export default function ProposalsPage() {
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');

  // Fetch proposals from API
  const { data: proposals, isLoading, error } = trpc.proposals.list.useQuery({
    status: statusFilter,
    platform: platformFilter,
    limit: 50,
    offset: 0,
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'all')}
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
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value as Platform | 'all')}
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-ocean-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading proposals...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading proposals: {error.message}
          </div>
        )}

        {/* Proposals Grid */}
        {!isLoading && !error && proposals && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proposals.map(proposal => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>

            {proposals.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No proposals found matching your filters
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
