import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Agent } from '@monorepo/types';

const agentCreateSchema = z.object({
  name: z.string().min(1),
  role: z.enum(['architecture', 'graphic-design', 'marketing', 'sales', 'qa', 'devops', 'orchestrator']),
  capabilities: z.array(z.string()).default([]),
});

const agentUpdateSchema = z.object({
  id: z.string().uuid(),
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
        // High-fidelity mock data for showcase
        return [
          {
            id: '1',
            name: 'Architecture-Prime',
            role: 'architecture',
            status: 'active',
            completedTasks: 142,
            successRate: 0.98,
            capabilities: ['system-design', 'security-audit'],
            spawnedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            lastActive: new Date().toISOString()
          },
          {
            id: '2',
            name: 'UX-Guardian',
            role: 'graphic-design',
            status: 'idle',
            completedTasks: 85,
            successRate: 0.95,
            capabilities: ['figma-sync', 'component-gen'],
            spawnedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            lastActive: new Date().toISOString()
          }
        ] as any[];
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
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
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
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const { error } = await supabase
        .from('agents')
        .update({ status: 'offline' })
        .eq('id', input.id);

      if (error) throw new Error(error.message);

      return { success: true };
    }),

  getStats: publicProcedure.query(async () => {
    if (!supabase) {
      return {
        totalAgents: 2,
        activeAgents: 1,
        totalTasksCompleted: 227,
        avgSuccessRate: 0.965,
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
