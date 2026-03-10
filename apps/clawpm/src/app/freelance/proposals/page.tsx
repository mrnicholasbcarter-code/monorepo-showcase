'use client';

import { useState } from 'react';
import { ProposalCard, Button, ProposalWizard } from '@monorepo/ui';
import type { Platform, ProposalStatus } from '@monorepo/types';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Grid, List as ListIcon, SlidersHorizontal } from 'lucide-react';

export default function ProposalsPage() {
  const utils = trpc.useContext();
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');

  // Fetch proposals from API
  const { data: proposals, isLoading, error } = trpc.proposals.list.useQuery({
    status: statusFilter,
    platform: platformFilter,
    limit: 50,
    offset: 0,
  });

  const createMutation = trpc.proposals.create.useMutation({
    onSuccess: () => {
      utils.proposals.list.invalidate();
    }
  });

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Proposal Lab</h1>
          <p className="text-slate-400 mt-1">Simulate, optimize, and deploy high-conversion business proposals.</p>
        </div>
        <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              placeholder="Search experiments..."
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-ocean-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <Filter className="h-3.5 w-3.5 text-ocean-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'all')}
              className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">ALL STATES</option>
              <option value="draft">DRAFT</option>
              <option value="submitted">SUBMITTED</option>
              <option value="accepted">ACCEPTED</option>
              <option value="rejected">REJECTED</option>
            </select>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl">
            <button className="p-1.5 rounded-lg bg-ocean-600 text-white"><Grid className="h-4 w-4" /></button>
            <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300"><ListIcon className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[280px] rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-red-400 font-bold text-lg">Lab Connection Error</h3>
          <p className="text-slate-500 mt-2">{error.message}</p>
        </div>
      )}

      {/* Proposals Grid */}
      {!isLoading && !error && proposals && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {proposals.map((proposal, i) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProposalCard proposal={proposal} />
              </motion.div>
            ))}
          </AnimatePresence>

          {proposals.length === 0 && (
            <div className="col-span-full py-40 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center">
              <div className="p-6 bg-white/5 rounded-full mb-6 relative">
                <div className="absolute inset-0 bg-ocean-500/10 blur-xl rounded-full" />
                <Search className="h-10 w-10 text-slate-600 relative" />
              </div>
              <h2 className="text-white font-bold text-2xl tracking-tight">No Experiments Found</h2>
              <p className="text-slate-500 mt-2 max-w-sm">The laboratory is ready. Start by sourcing a project from Upwork or LinkedIn to begin simulation.</p>
              <div className="mt-10">
                <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
