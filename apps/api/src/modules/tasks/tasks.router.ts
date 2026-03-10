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
            const { error } = await supabase.from('tasks').delete().eq('id', input.id);
            if (error) throw new Error(error.message);
            return { success: true };
        }),
});
