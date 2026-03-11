import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Task } from '@monorepo/types';
import { v4 as uuidv4 } from 'uuid';
import { tasksRegistry, setTasksRegistry } from '../../lib/state';

const taskCreateSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional().default(''),
    status: z.enum(['todo', 'in-progress', 'review', 'done']).default('todo'),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    assignedAgent: z.string().optional(),
    proposalId: z.string().optional(),
    dueDate: z.string().optional().or(z.date().optional()),
    tags: z.array(z.string()).default([]),
});

const taskUpdateSchema = taskCreateSchema.partial().extend({
    id: z.string(),
});

export const tasksRouter = router({
    list: publicProcedure
        .input(z.object({
            status: z.enum(['todo', 'in-progress', 'review', 'done', 'all']).default('all'),
            assignedAgent: z.string().optional(),
            proposalId: z.string().optional(),
        }))
        .query(async ({ input }) => {
            if (!supabase) {
                let filtered = tasksRegistry;
                if (input.status !== 'all') filtered = filtered.filter(t => t.status === input.status);
                if (input.assignedAgent) filtered = filtered.filter(t => t.assignedAgent === input.assignedAgent);
                if (input.proposalId) filtered = filtered.filter(t => t.proposalId === input.proposalId);
                return filtered;
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
            if (!supabase) {
                const newTask: Task = {
                    id: uuidv4(),
                    ...input,
                    dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } as Task;
                setTasksRegistry([newTask, ...tasksRegistry]);
                return newTask;
            }

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
            if (!supabase) {
                const index = tasksRegistry.findIndex(t => t.id === id);
                if (index === -1) throw new Error('Task not found');

                const updatedTask = {
                    ...tasksRegistry[index],
                    ...updates,
                    dueDate: updates.dueDate ? new Date(updates.dueDate) : tasksRegistry[index].dueDate,
                    updatedAt: new Date()
                } as Task;

                const newTasksRegistry = [...tasksRegistry];
                newTasksRegistry[index] = updatedTask;
                setTasksRegistry(newTasksRegistry);

                return updatedTask;
            }

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
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            if (!supabase) {
                setTasksRegistry(tasksRegistry.filter(t => t.id !== input.id));
                return { success: true };
            }
            const { error } = await supabase.from('tasks').delete().eq('id', input.id);
            if (error) throw new Error(error.message);
            return { success: true };
        }),
});
