import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Task } from '@monorepo/types';

const taskCreateSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().default(''),
    status: z.enum(['todo', 'in-progress', 'review', 'done']).default('todo'),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    assignedAgent: z.string().uuid().optional(),
    proposalId: z.string().uuid().optional(),
    dueDate: z.string().optional(),
    tags: z.array(z.string()).default([]),
});

const taskUpdateSchema = taskCreateSchema.partial().extend({
    id: z.string().uuid(),
});

export const tasksRouter = router({
    list: publicProcedure
        .input(z.object({
            status: z.enum(['todo', 'in-progress', 'review', 'done', 'all']).default('all'),
            assignedAgent: z.string().uuid().optional(),
            proposalId: z.string().uuid().optional(),
        }))
        .query(async ({ input }) => {
            if (!supabase) {
                // Mock Intelligence: Synthetic Task Registry
                const mockTasks: Task[] = [
                    { id: 't1', title: 'Architect Edge Functions', description: 'Design serverless runtime for agent orchestration', status: 'in-progress', priority: 'high', tags: ['infra', 'backend'], dueDate: '2024-03-15', created_at: '2024-03-01', updated_at: '2024-03-01' },
                    { id: 't2', title: 'Optimize LLM Context', description: 'Implement sliding window for long-running threads', status: 'todo', priority: 'urgent', tags: ['ai', 'perf'], dueDate: '2024-03-12', created_at: '2024-03-02', updated_at: '2024-03-02' },
                    { id: 't3', title: 'UI Glassmorphism Audit', description: 'Review backdrop-blur values across orbit dashboards', status: 'review', priority: 'medium', tags: ['ui', 'ux'], dueDate: '2024-03-10', created_at: '2024-03-03', updated_at: '2024-03-03' },
                    { id: 't4', title: 'Stripe API Webhooks', description: 'Handle autonomous subscription lifecycle events', status: 'done', priority: 'high', tags: ['fintech'], dueDate: '2024-03-09', created_at: '2024-03-04', updated_at: '2024-03-04' },
                    { id: 't5', title: 'Neural Threading Analysis', description: 'Analyze multi-agent collision patterns in sandbox', status: 'in-progress', priority: 'high', tags: ['ai-safety'], dueDate: '2024-03-18', created_at: '2024-03-05', updated_at: '2024-03-05' },
                    { id: 't6', title: 'Cloudflare D1 Migration', description: 'Migrate local storage to serverless SQL network', status: 'todo', priority: 'medium', tags: ['db'], dueDate: '2024-03-22', created_at: '2024-03-06', updated_at: '2024-03-06' },
                ];

                return mockTasks.filter(t => input.status === 'all' || t.status === input.status);
            }

            let query = supabase.from('tasks').select('*').order('created_at', { ascending: false });

            if (input.status !== 'all') {
                query = query.eq('status', input.status);
            }
            if (input.assignedAgent) {
                query = query.eq('assigned_agent', input.assignedAgent);
            }
            if (input.proposalId) {
                query = query.eq('proposal_id', input.proposalId);
            }

            const { data, error } = await query;
            if (error) throw new Error(error.message);
            return data as Task[];
        }),

    create: publicProcedure
        .input(taskCreateSchema)
        .mutation(async ({ input }) => {
            if (!supabase) return { id: 'mock-id', ...input, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Task;

            const { data, error } = await supabase
                .from('tasks')
                .insert({
                    ...input,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();
            if (error) throw new Error(error.message);
            return data as Task;
        }),

    update: publicProcedure
        .input(taskUpdateSchema)
        .mutation(async ({ input }) => {
            const { id, ...updates } = input;
            if (!supabase) return { id, ...updates, updated_at: new Date().toISOString() } as Task;

            const { data, error } = await supabase
                .from('tasks')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id)
                .select()
                .single();
            if (error) throw new Error(error.message);
            return data as Task;
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input }) => {
            if (!supabase) return { success: true };
            const { error } = await supabase.from('tasks').delete().eq('id', input.id);
            if (error) throw new Error(error.message);
            return { success: true };
        }),
});
