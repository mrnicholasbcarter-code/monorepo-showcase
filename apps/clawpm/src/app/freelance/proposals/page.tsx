'use client';

import { useState } from 'react';
import { ProposalCard, Button, ProposalWizard } from '@monorepo/ui';
import type { Platform, ProposalStatus } from '@monorepo/types';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Search,
  Grid,
  List as ListIcon,
  SlidersHorizontal,
  Sparkles,
  Target,
  Shield,
  Zap,
  LayoutGrid,
  SearchCode,
  Telescope
} from 'lucide-react';
import { cn } from '@monorepo/ui';

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
    <div className="flex flex-col gap-10 p-10 max-w-[1600px] mx-auto pb-32">
      {/* Massive OS Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-br from-slate-900/40 to-black border border-white/5 backdrop-blur-3xl rounded-[3rem] p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-ocean-500/5 blur-[100px] rounded-full -mr-40 -mt-40 pointer-events-none group-hover:bg-ocean-500/10 transition-all duration-700" />
        <div className="relative z-10 flex items-center gap-8">
          <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center transform transition-transform hover:-rotate-12 duration-500 shadow-2xl">
            <Target className="h-12 w-12 text-ocean-400 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
          </div>
          <div>
            <h1 className="text-6xl font-black text-white uppercase tracking-tighterAlpha">
              Strategic <span className="text-ocean-500 text-glow-ocean">Assets</span>
            </h1>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <Shield className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widestAlpha">Deployment Lab v2.04</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="text-[10px] font-black text-ocean-400 uppercase tracking-[0.2em] animate-pulse">Neural Signal Active</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 scale-110 lg:translate-x-[-10px]">
          <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
        </div>
      </div>

      {/* Futuristic Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 px-10 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <SearchCode className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-ocean-400 transition-colors" />
            <input
              placeholder="SCAN REGISTRY FOR SIGNALS..."
              className="bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-8 text-[10px] font-black text-white placeholder:text-slate-700 focus:outline-none focus:border-ocean-500/40 w-96 uppercase tracking-widestAlpha transition-all shadow-inner"
            />
          </div>
          <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:border-ocean-500/40 hover:bg-ocean-500/5 transition-all group">
            <SlidersHorizontal className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all cursor-pointer">
            <Filter className="h-4 w-4 text-ocean-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProposalStatus | 'all')}
              className="bg-transparent text-[11px] font-black text-slate-400 uppercase tracking-widestAlpha focus:outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="all" className="bg-slate-950">ALL PROTOCOLS</option>
              <option value="draft" className="bg-slate-950">DRAFT NODES</option>
              <option value="submitted" className="bg-slate-950">SUBMITTED NODES</option>
              <option value="accepted" className="bg-slate-950">AUTHORIZED</option>
              <option value="rejected" className="bg-slate-950">TERMINATED</option>
            </select>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center p-2 bg-black/40 border border-white/5 rounded-2xl shadow-inner">
            <button className="p-3 rounded-xl bg-ocean-500 text-white shadow-glow transition-all"><LayoutGrid className="h-4 w-4" /></button>
            <button className="p-3 rounded-xl text-slate-600 hover:text-slate-300 transition-all"><ListIcon className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[400px] rounded-[3rem] bg-white/[0.01] border border-white/5 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-[3rem] p-24 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
          <div className="w-24 h-24 bg-rose-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-rose-500/20 text-rose-500 group-hover:scale-110 transition-transform">
            <Shield className="h-10 w-10" />
          </div>
          <h3 className="text-white font-black text-4xl uppercase tracking-tighterAlpha">Protocol Breach</h3>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-6 max-w-sm mx-auto leading-relaxed">External database uplink severed. Re-keying encryption sequences...</p>
          <Button variant="outline" className="mt-12 border-rose-500/20 text-rose-400 hover:bg-rose-500/10 px-10 rounded-2xl h-14 uppercase tracking-widestAlpha font-black text-[11px]">Reconnect System</Button>
        </div>
      )}

      {!isLoading && !error && proposals && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence>
            {proposals.map((proposal, i) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
              >
                <ProposalCard proposal={proposal} />
              </motion.div>
            ))}
          </AnimatePresence>

          {proposals.length === 0 && (
            <div className="col-span-full py-64 rounded-[4rem] border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-ocean-500/[0.01] to-transparent pointer-events-none" />
              <div className="p-12 bg-white/5 rounded-[2.5rem] mb-10 relative group transform transition-transform group-hover:scale-105 duration-500 border border-white/5">
                <div className="absolute inset-0 bg-ocean-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Telescope className="h-16 w-16 text-slate-700 relative group-hover:text-ocean-400 transition-colors" />
              </div>
              <h2 className="text-white font-black text-5xl uppercase tracking-tighterAlpha">No Assets Engaged</h2>
              <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] mt-6 max-w-md mx-auto leading-relaxed italic opacity-60">The neural grid is awaiting deployment signals. Initialize a new simulation to engage.</p>
              <div className="mt-16 scale-125 hover:scale-[1.3] transition-transform">
                <ProposalWizard onCreate={(data) => createMutation.mutate(data)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
