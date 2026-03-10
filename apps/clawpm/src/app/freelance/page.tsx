'use client';

import { StatsCard, Button } from '@monorepo/ui';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import {
  Zap,
  Target,
  Bot,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Shield,
  Activity
} from 'lucide-react';

export default function FreelanceDashboard() {
  const { data: proposalStats } = trpc.proposals.getStats.useQuery();
  const { data: agentStats } = trpc.agents.getStats.useQuery();

  const stats = [
    { title: "Active Proposals", value: proposalStats?.totalProposals ?? 0, icon: Target, color: "text-ocean-400", trend: "+12%" },
    { title: "Accepted Signals", value: proposalStats?.acceptedProposals ?? 0, icon: CheckCircle2, color: "text-emerald-400", trend: "High" },
    { title: "Mission Success Rate", value: `${proposalStats?.winRate ?? 0}%`, icon: TrendingUp, color: "text-violet-400", trend: "Optimal" },
    { title: "Autonomous Units", value: agentStats?.activeAgents ?? 0, icon: Bot, color: "text-ocean-400", trend: "2 Tasking" },
    { title: "Global Workforce", value: agentStats?.totalAgents ?? 0, icon: Users, color: "text-slate-400", trend: "Ready" },
    { title: "Registry Operations", value: agentStats?.totalTasksCompleted ?? 0, icon: Zap, color: "text-amber-400", trend: "Sync" },
  ];

  return (
    <div className="flex flex-col gap-10 p-10 max-w-7xl mx-auto">
      {/* Header section with glassmorphism */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-0.5 rounded bg-ocean-500/10 border border-ocean-500/20 text-[9px] font-black text-ocean-400 uppercase tracking-widestAlpha">System Status: Nominal</div>
            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widestAlpha">Uplink: Active</div>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
            Command Center
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5" /> Neural Network Orchestration Layer v4.2
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/freelance/agents/spawn">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 uppercase font-black text-[10px] tracking-widestAlpha h-12 px-6 gap-2">
              <Bot className="h-3.5 w-3.5" /> Spawn Unit
            </Button>
          </Link>
          <Link href="/freelance/proposals/new">
            <Button className="bg-ocean-600 hover:bg-ocean-500 text-white shadow-xl shadow-ocean-950/50 uppercase font-black text-[10px] tracking-widestAlpha h-12 px-8 gap-2 group">
              <Sparkles className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              Initiate Proposal
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid with framer-motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-2xl relative overflow-hidden flex flex-col gap-6 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-[9px] font-black uppercase tracking-widestAlpha text-slate-600 bg-white/5 px-2 py-1 rounded-md border border-white/5 group-hover:text-ocean-400 transition-colors">
                  {stat.trend}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widestAlpha mb-1">{stat.title}</div>
                <div className="text-4xl font-black text-white tracking-tighterAlpha">{stat.value}</div>
              </div>
              <div className="absolute bottom-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <stat.icon className="h-24 w-24" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Link href="/freelance/proposals" className="lg:col-span-2 group">
          <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-ocean-500/10 border border-ocean-500/20 flex items-center justify-center text-ocean-400">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-widestAlpha">Strategic Assets</h3>
                </div>
                <p className="text-slate-400 font-medium leading-relaxed italic">
                  "Deploy multi-variant proposals with neural scoring to maximize win probabilities across global marketplaces."
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widestAlpha">92% Precision</div>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widestAlpha">Edge Ready</div>
                </div>
              </div>
              <div className="w-full md:w-64 aspect-square rounded-3xl bg-gradient-to-br from-ocean-500/20 to-ocean-950/40 border border-ocean-500/30 flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <Activity className="h-20 w-20 text-ocean-400/30 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-1 bg-ocean-400/20 blur-xl rotate-45" />
                  <div className="h-32 w-1 bg-violet-400/20 blur-xl -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/freelance/agents" className="group">
          <div className="h-full p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-widestAlpha leading-tight">Neural<br />Workforce</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widestAlpha leading-relaxed">
                Managed autonomous units for design, architecture, and marketing analysis.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha">Review Fleet</span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
