'use client';

import { motion } from 'framer-motion';
import type { Agent } from '@monorepo/types';
import { cn } from '../utils/cn';
import { Shield, Activity, Cpu, Star, Zap, Bot } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const statusColors = {
  idle: { bg: 'bg-slate-500/20', dot: 'bg-slate-400', text: 'text-slate-400', label: 'Idle' },
  active: { bg: 'bg-emerald-500/20', dot: 'bg-emerald-500', text: 'text-emerald-400', label: 'Active' },
  busy: { bg: 'bg-amber-500/20', dot: 'bg-amber-500', text: 'text-amber-400', label: 'Processing' },
  error: { bg: 'bg-rose-500/20', dot: 'bg-rose-500', text: 'text-rose-400', label: 'Critical Error' },
  offline: { bg: 'bg-slate-800/20', dot: 'bg-slate-600', text: 'text-slate-600', label: 'Offline' },
};

const roleIcons: Record<string, any> = {
  architecture: { icon: Shield, color: 'text-ocean-400' },
  'graphic-design': { icon: Bot, color: 'text-pink-400' },
  marketing: { icon: Zap, color: 'text-amber-400' },
  sales: { icon: Activity, color: 'text-emerald-400' },
  qa: { icon: Cpu, color: 'text-violet-400' },
  devops: { icon: Shield, color: 'text-ocean-400' },
  orchestrator: { icon: Star, color: 'text-indigo-400' },
};

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const status = statusColors[agent.status] || statusColors.idle;
  const role = roleIcons[agent.role] || { icon: Bot, color: 'text-slate-400' };
  const Icon = role.icon;

  return (
    <motion.div
      className="group relative bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      {/* Background Glow */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 blur-[60px] rounded-full opacity-20 transition-opacity group-hover:opacity-40 ${role.color.replace('text-', 'bg-')}`} />

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${role.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-widestAlpha text-sm group-hover:text-ocean-400 transition-colors">{agent.name}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widestAlpha mt-0.5">{agent.role.replace('-', ' ')}</p>
          </div>
        </div>
        <div className={cn('px-3 py-1 rounded-full border border-white/5 flex items-center gap-2', status.bg)}>
          <div className={cn('w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]', status.dot, status.text)} />
          <span className={cn('text-[8px] font-black uppercase tracking-widestAlpha', status.text)}>{status.label}</span>
        </div>
      </div>

      {agent.currentTask ? (
        <div className="mb-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group/task">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-ocean-500 shadow-glow group-hover/task:w-1 transition-all" />
          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widestAlpha block mb-1.5">Processing Workflow</span>
          <span className="text-[11px] text-slate-200 font-bold uppercase tracking-tight line-clamp-1">{agent.currentTask}</span>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-2xl border border-dashed border-white/5 flex items-center justify-center">
          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widestAlpha italic">Node Standby</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
          <p className="text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha mb-1">Signals Processed</p>
          <p className="text-sm font-black text-white uppercase tracking-tighterAlpha">{agent.completedTasks}</p>
        </div>
        <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
          <p className="text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha mb-1">Neural Fidelity</p>
          <p className={cn(
            'text-sm font-black uppercase tracking-tighterAlpha',
            agent.successRate >= 0.8 ? 'text-emerald-400' : agent.successRate >= 0.6 ? 'text-amber-400' : 'text-rose-400'
          )}>
            {(agent.successRate * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {agent.capabilities.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2 relative z-10">
          {agent.capabilities.slice(0, 3).map(cap => (
            <span key={cap} className="px-2 py-1 bg-white/5 border border-white/5 text-[8px] font-black text-slate-400 rounded-md uppercase tracking-widestAlpha group-hover:border-ocean-500/20 group-hover:text-ocean-400 transition-all">
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="px-2 py-1 text-[8px] text-slate-600 font-black uppercase tracking-widestAlpha">+{agent.capabilities.length - 3}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
