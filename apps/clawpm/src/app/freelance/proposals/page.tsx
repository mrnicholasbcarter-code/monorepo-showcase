'use client';

import { useState } from 'react';
import { ProposalCard, Button, ProposalWizard } from '@monorepo/ui';
import type { Platform, ProposalStatus } from '@monorepo/types';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Grid, List as ListIcon, SlidersHorizontal, Sparkles, Target, Shield } from 'lucide-react';

export default function ProposalsPage() {
  const utils = trpc.useContext();
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');

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
    <div className="flex flex-col gap-10 p-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
            <Target className="h-10 w-10 text-ocean-400" /> Strategic Assets
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5" /> Simulation & Deployment Lab v2.0
          </p>
        </div>
        <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2rem] p-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-ocean-400 transition-colors" />
            <input
              placeholder="Filter registry..."
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-ocean-500/30 w-72 uppercase tracking-widestAlpha transition-all"
            />
          </div>
          <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <Filter className="h-3.5 w-3.5 text-ocean-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'all')}
              className="bg-transparent text-[10px] font-black text-slate-400 uppercase tracking-widestAlpha focus:outline-none cursor-pointer appearance-none pr-2"
            >
              <option value="all" className="bg-slate-900">All States</option>
              <option value="draft" className="bg-slate-900">Draft</option>
              <option value="submitted" className="bg-slate-900">Submitted</option>
              <option value="accepted" className="bg-slate-900">Accepted</option>
              <option value="rejected" className="bg-slate-900">Rejected</option>
            </select>
          </div>

          <div className="h-6 w-px bg-white/5" />

          <div className="flex items-center p-1.5 bg-white/5 border border-white/10 rounded-2xl">
            <button className="p-2.5 rounded-xl bg-ocean-600 text-white shadow-lg shadow-ocean-950/20 transition-all"><Grid className="h-4 w-4" /></button>
            <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-all"><ListIcon className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[320px] rounded-[2.5rem] bg-white/[0.01] border border-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] p-16 text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20 text-rose-500">
            <Shield className="h-8 w-8" />
          </div>
          <h3 className="text-white font-black text-2xl uppercase tracking-widestAlpha">Protocol Breach</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widestAlpha text-[10px] mt-4 max-w-xs mx-auto">Database uplink interrupted. Neural connection unstable.</p>
        </div>
      )}

      {/* Proposals Grid */}
      {!isLoading && !error && proposals && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {proposals.map((proposal, i) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProposalCard proposal={proposal} />
              </motion.div>
            ))}
          </AnimatePresence>

          {proposals.length === 0 && (
            <div className="col-span-full py-48 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center">
              <div className="p-8 bg-white/5 rounded-full mb-8 relative group">
                <div className="absolute inset-0 bg-ocean-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="h-12 w-12 text-slate-700 relative group-hover:text-ocean-400 transition-colors" />
              </div>
              <h2 className="text-white font-black text-3xl uppercase tracking-widestAlpha">Zero Signals Found</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widestAlpha text-[10px] mt-4 max-w-sm">The registry is currently empty. Initiate a new proposal simulation to begin optimization.</p>
              <div className="mt-12 scale-110">
                <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
