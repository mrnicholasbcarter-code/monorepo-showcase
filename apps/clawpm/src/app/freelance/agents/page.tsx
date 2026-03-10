'use client';

import { AgentCard, Button, AgentSpawner } from '@monorepo/ui';
import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Plus, Users, Cpu, Activity, Star } from 'lucide-react';

export default function AgentsPage() {
  const utils = trpc.useContext();

  // Fetch agents from API
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
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Agent Workforce</h1>
          <p className="text-slate-400 mt-1">Autonomous units specialized across your development lifecycle.</p>
        </div>
        <AgentSpawner onSpawn={(config) => spawnMutation.mutate(config)} />
      </div>

      {/* Agent Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Fleet</span>
              <Users className="h-4 w-4 text-ocean-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalAgents}</div>
          </div>
          <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active Now</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.activeAgents}</div>
          </div>
          <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Processed</span>
              <Cpu className="h-4 w-4 text-violet-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalTasksCompleted}</div>
          </div>
          <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Win Rate</span>
              <Star className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">{(stats.avgSuccessRate * 100).toFixed(0)}%</div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Accessing Agent Registry...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400">
          <h3 className="font-bold mb-1">Registry Connection Failed</h3>
          <p className="text-sm opacity-80">{error.message}</p>
        </div>
      )}

      {/* Agents Grid */}
      {!isLoading && !error && agents && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}

          {agents.length === 0 && (
            <div className="col-span-full py-32 rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <Cpu className="h-8 w-8 text-slate-600" />
              </div>
              <h2 className="text-white font-bold text-xl">No Agents Found</h2>
              <p className="text-slate-500 mt-2 max-w-sm">Deploy your first autonomous unit to start gathering intelligence and streamlining your workflow.</p>
              <div className="mt-8">
                <AgentSpawner onSpawn={(config) => spawnMutation.mutate(config)} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
