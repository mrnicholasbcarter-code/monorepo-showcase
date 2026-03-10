'use client';

import { AgentCard, Button, AgentSpawner } from '@monorepo/ui';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Plus, Users, Cpu, Activity, Star, Shield, Bot, Zap } from 'lucide-react';

export default function AgentsPage() {
  const utils = trpc.useContext();

  const { data: agents, isLoading, error } = trpc.agents.list.useQuery({
    status: 'all',
    limit: 50,
  });

  const { data: stats } = trpc.agents.getStats.useQuery();

  const spawnMutation = trpc.agents.spawn.useMutation({
    onSuccess: () => {
      utils.agents.list.invalidate();
      utils.agents.getStats.invalidate();
    },
  });

  return (
    <div className="flex flex-col gap-10 p-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
            <Bot className="h-10 w-10 text-ocean-400" /> Neural Workforce
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5" /> Distributed Intelligence Layer v4.0.1
          </p>
        </div>
        <AgentSpawner onSpawn={(config) => spawnMutation.mutate(config)} />
      </div>

      {/* Agent Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Fleet", value: stats.totalAgents, icon: Users, color: "text-ocean-400" },
            { label: "Active Now", value: stats.activeAgents, icon: Activity, color: "text-emerald-400" },
            { label: "Processed", value: stats.totalTasksCompleted, icon: Cpu, color: "text-violet-400" },
            { label: "Win Rate", value: `${(stats.avgSuccessRate * 100).toFixed(0)}%`, icon: Star, color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-3xl p-6 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widestAlpha font-black">{stat.label}</span>
                <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="text-3xl font-black text-white uppercase tracking-tighterAlpha">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-ocean-500/20 blur-3xl animate-pulse rounded-full" />
            <div className="w-16 h-16 border-4 border-ocean-500/20 border-t-ocean-500 rounded-full animate-spin relative z-10" />
          </div>
          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Accessing Agent Registry...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] p-12 text-center text-rose-400">
          <Shield className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <h3 className="font-black uppercase tracking-widestAlpha">Registry Connection Failed</h3>
          <p className="text-[10px] font-bold uppercase tracking-widestAlpha mt-2 opacity-60">{error.message}</p>
        </div>
      )}

      {/* Agents Grid */}
      {!isLoading && !error && agents && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </AnimatePresence>

          {agents.length === 0 && (
            <div className="col-span-full py-48 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center group">
              <div className="p-8 bg-white/5 rounded-full mb-8 relative">
                <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Cpu className="h-12 w-12 text-slate-700 relative group-hover:text-violet-400 transition-colors" />
              </div>
              <h2 className="text-white font-black text-3xl uppercase tracking-widestAlpha">Workforce Depleted</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widestAlpha text-[10px] mt-4 max-w-sm mx-auto">Deploy your first autonomous unit to start gathering intelligence and streamlining your workflow.</p>
              <div className="mt-12 scale-110">
                <AgentSpawner onSpawn={(config) => spawnMutation.mutate(config)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
