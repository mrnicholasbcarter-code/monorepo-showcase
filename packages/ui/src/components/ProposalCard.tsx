'use client';

import { motion } from 'framer-motion';
import type { Proposal } from '@monorepo/types';
import { cn } from '../utils/cn';
import { Globe, Target, Zap, DollarSign, Clock, Shield } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
  onClick?: () => void;
}

const statusColors = {
  draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  submitted: 'bg-ocean-500/10 text-ocean-400 border-ocean-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  withdrawn: 'bg-slate-800/10 text-slate-500 border-slate-800/20',
};

const platformIcons: Record<string, any> = {
  upwork: { icon: Globe, color: 'text-emerald-400' },
  freelancer: { icon: Globe, color: 'text-ocean-400' },
  guru: { icon: Shield, color: 'text-violet-400' },
  fiverr: { icon: Zap, color: 'text-pink-400' },
  linkedin: { icon: Globe, color: 'text-blue-500' },
  other: { icon: Target, color: 'text-slate-400' },
};

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const platform = platformIcons[proposal.platform] || platformIcons.other;
  const PlatformIcon = platform.icon;

  return (
    <motion.div
      className="group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-[2.5rem] p-8 cursor-pointer transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("p-1.5 rounded-lg bg-white/5 border border-white/5", platform.color)}>
              <PlatformIcon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widestAlpha">{proposal.platform}</span>
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighterAlpha group-hover:text-ocean-400 transition-colors line-clamp-1">{proposal.title}</h3>
        </div>
        <div className={cn('px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widestAlpha', statusColors[proposal.status] || statusColors.draft)}>
          {proposal.status}
        </div>
      </div>

      <p className="text-[13px] text-slate-400 font-bold uppercase tracking-tight line-clamp-2 mb-8 italic">
        "{proposal.description}"
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha">Budget Range</span>
          <div className="flex items-center gap-1.5 text-white font-black text-sm uppercase tracking-tighterAlpha">
            <DollarSign className="h-3 w-3 text-emerald-400" />
            {proposal.budget.min.toLocaleString()} - {proposal.budget.max.toLocaleString()}
          </div>
        </div>
        {proposal.mlScore && (
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha">ML Win Index</span>
            <div className={cn(
              'flex items-center gap-1.5 font-black text-sm uppercase tracking-tighterAlpha',
              proposal.mlScore >= 0.7 ? 'text-emerald-400' : proposal.mlScore >= 0.4 ? 'text-amber-400' : 'text-rose-400'
            )}>
              <Zap className="h-3 w-3" />
              {(proposal.mlScore * 100).toFixed(0)}%
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
        <div className="flex flex-wrap gap-2">
          {proposal.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/5 text-[8px] font-black text-slate-500 rounded-md uppercase tracking-widestAlpha">
              {tag}
            </span>
          ))}
          {proposal.tags.length > 2 && (
            <span className="px-2.5 py-1 text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha">+{proposal.tags.length - 2}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black text-slate-600 uppercase tracking-widestAlpha">
          <Clock className="h-3 w-3" />
          2H AGO
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-ocean-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[100px] pointer-events-none" />
    </motion.div>
  );
}
