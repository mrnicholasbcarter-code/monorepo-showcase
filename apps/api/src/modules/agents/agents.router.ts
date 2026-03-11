import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Agent } from '@monorepo/types';
import { v4 as uuidv4 } from 'uuid';
import { agentsRegistry, setAgentsRegistry } from '../../lib/state';

const agentCreateSchema = z.object({
  name: z.string().min(1),
  role: z.enum(['architecture', 'graphic-design', 'marketing', 'sales', 'qa', 'devops', 'orchestrator']),
  capabilities: z.array(z.string()).default([]),
});

const agentUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  status: z.enum(['idle', 'active', 'busy', 'error', 'offline']).optional(),
  currentTask: z.string().optional().nullable(),
});

export const agentsRouter = router({
  list: publicProcedure
    .input(z.object({
      status: z.enum(['idle', 'active', 'busy', 'error', 'offline', 'all']).default('all'),
      limit: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ input }) => {
      if (!supabase) {
        let filtered = agentsRegistry;
        if (input.status !== 'all') filtered = filtered.filter(a => a.status === input.status);
        return filtered.slice(0, input.limit);
      }

      let query = supabase
        .from('agents')
        .select('*')
        .order('spawned_at', { ascending: false })
        .limit(input.limit);

      if (input.status !== 'all') {
        query = query.eq('status', input.status);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return data as Agent[];
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      if (!supabase) {
        const agent = agentsRegistry.find(a => a.id === input.id);
        if (!agent) throw new Error('Agent not found');
        return agent;
      }
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', input.id)
        .single();

      if (error) throw new Error(error.message);

      return data as Agent;
    }),

  spawn: publicProcedure
    .input(agentCreateSchema)
    .mutation(async ({ input }) => {
      if (!supabase) {
        const newAgent: Agent = {
          id: uuidv4(),
          ...input,
          status: 'idle',
          completedTasks: 0,
          successRate: 1.0,
          spawnedAt: new Date(),
          lastActive: new Date(),
        };
        setAgentsRegistry([newAgent, ...agentsRegistry]);
        return newAgent;
      }

      const agent = {
        ...input,
        status: 'idle' as const,
        completed_tasks: 0,
        success_rate: 1.0,
        spawned_at: new Date().toISOString(),
        last_active: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('agents')
        .insert(agent)
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data as Agent;
    }),

  update: publicProcedure
    .input(agentUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      if (!supabase) {
        const index = agentsRegistry.findIndex(a => a.id === id);
        if (index === -1) throw new Error('Agent not found');

        agentsRegistry[index] = {
          ...agentsRegistry[index],
          ...updates,
          lastActive: new Date()
        } as Agent;

        return agentsRegistry[index];
      }

      const { data, error } = await supabase
        .from('agents')
        .update({
          ...updates,
          last_active: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data as Agent;
    }),

  terminate: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      if (!supabase) {
        const index = agentsRegistry.findIndex(a => a.id === input.id);
        if (index !== -1) agentsRegistry[index].status = 'offline';
        return { success: true };
      }
      const { error } = await supabase
        .from('agents')
        .update({ status: 'offline' })
        .eq('id', input.id);

      if (error) throw new Error(error.message);

      return { success: true };
    }),

  getStats: publicProcedure.query(async () => {
    if (!supabase) {
      const totalAgents = agentsRegistry.length;
      const activeAgents = agentsRegistry.filter(a => a.status === 'active').length;
      const totalTasks = agentsRegistry.reduce((sum, a) => sum + (a.completedTasks || 0), 0);
      const avgSuccessRate = agentsRegistry.length > 0
        ? agentsRegistry.reduce((sum, a) => sum + (a.successRate || 0), 0) / agentsRegistry.length
        : 0;

      return {
        totalAgents,
        activeAgents,
        totalTasksCompleted: totalTasks,
        avgSuccessRate: Math.round(avgSuccessRate * 100) / 100,
      };
    }

    const { data: agents, error } = await supabase
      .from('agents')
      .select('status, completed_tasks, success_rate');

    if (error) throw new Error(error.message);

    const totalAgents = agents.length;
    const activeAgents = agents.filter((a: any) => a.status === 'active').length;
    const totalTasks = agents.reduce((sum: number, a: any) => sum + (a.completed_tasks || 0), 0);
    const avgSuccessRate = agents.length > 0
      ? agents.reduce((sum: number, a: any) => sum + (a.success_rate || 0), 0) / agents.length
      : 0;

    return {
      totalAgents,
      activeAgents,
      totalTasksCompleted: totalTasks,
      avgSuccessRate: Math.round(avgSuccessRate * 100) / 100,
    };
  }),
});
