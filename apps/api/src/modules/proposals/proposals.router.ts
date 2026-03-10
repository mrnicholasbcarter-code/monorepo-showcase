import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Proposal } from '@monorepo/types';

const proposalCreateSchema = z.object({
  title: z.string().min(1),
  platform: z.enum(['upwork', 'freelancer', 'guru', 'fiverr', 'linkedin', 'other']),
  jobUrl: z.string().url(),
  description: z.string(),
  budget: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
    currency: z.string().default('USD'),
  }),
  tags: z.array(z.string()).default([]),
  clientName: z.string().optional(),
});

const proposalUpdateSchema = proposalCreateSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['draft', 'submitted', 'pending', 'accepted', 'rejected', 'withdrawn']).optional(),
  mlScore: z.number().min(0).max(1).optional(),
});

export const proposalsRouter = router({
  list: publicProcedure
    .input(z.object({
      status: z.enum(['draft', 'submitted', 'pending', 'accepted', 'rejected', 'withdrawn', 'all']).default('all'),
      platform: z.enum(['upwork', 'freelancer', 'guru', 'fiverr', 'linkedin', 'other', 'all']).default('all'),
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      if (!supabase) {
        // High-fidelity mock data for showcase
        return [
          {
            id: 'p1',
            title: 'Next.js 14 Enterprise SaaS Infrastructure',
            platform: 'upwork',
            status: 'accepted',
            budget: { min: 5000, max: 8000, currency: 'USD' },
            mlScore: 0.94,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'p2',
            title: 'AI Trading Bot with TensorFlow.js Integration',
            platform: 'freelancer',
            status: 'pending',
            budget: { min: 2500, max: 4000, currency: 'USD' },
            mlScore: 0.88,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ] as any[];
      }

      let query = supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

      if (input.status !== 'all') {
        query = query.eq('status', input.status);
      }

      if (input.platform !== 'all') {
        query = query.eq('platform', input.platform);
      }

      const { data, error } = await query;

      if (error) throw new Error(error.message);

      return data as Proposal[];
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', input.id)
        .single();

      if (error) throw new Error(error.message);

      return data as Proposal;
    }),

  create: publicProcedure
    .input(proposalCreateSchema)
    .mutation(async ({ input }) => {
      const proposal = {
        ...input,
        status: 'draft' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('proposals')
        .insert(proposal)
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data as Proposal;
    }),

  update: publicProcedure
    .input(proposalUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;

      const { data, error } = await supabase
        .from('proposals')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      return data as Proposal;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', input.id);

      if (error) throw new Error(error.message);

      return { success: true };
    }),

  getStats: publicProcedure.query(async () => {
    if (!supabase) {
      return {
        totalProposals: 142,
        acceptedProposals: 85,
        winRate: 59.8,
        byPlatform: { upwork: { total: 80, accepted: 50 }, freelancer: { total: 62, accepted: 35 } }
      };
    }

    const { data: proposals, error } = await supabase
      .from('proposals')
      .select('status, platform');

    if (error) throw new Error(error.message);

    const total = proposals.length;
    const accepted = proposals.filter((p: any) => p.status === 'accepted').length;
    const winRate = total > 0 ? (accepted / total) * 100 : 0;

    const byPlatform = proposals.reduce((acc: any, p: any) => {
      if (!acc[p.platform]) {
        acc[p.platform] = { total: 0, accepted: 0 };
      }
      acc[p.platform].total++;
      if (p.status === 'accepted') {
        acc[p.platform].accepted++;
      }
      return acc;
    }, {} as Record<string, { total: number; accepted: number }>);

    return {
      totalProposals: total,
      acceptedProposals: accepted,
      winRate: Math.round(winRate * 10) / 10,
      byPlatform,
    };
  }),
});
