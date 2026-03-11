import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import type { Proposal, Platform, ProposalStatus } from '@monorepo/types';
import { v4 as uuidv4 } from 'uuid';
import { proposalsRegistry, setProposalsRegistry } from '../../lib/state';

const proposalCreateSchema = z.object({
  title: z.string().min(1),
  platform: z.enum(['upwork', 'freelancer', 'guru', 'fiverr', 'linkedin', 'other']),
  jobUrl: z.string().url().optional(),
  description: z.string(),
  budget: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    currency: z.string().default('USD'),
  }),
  tags: z.array(z.string()).default([]),
  clientName: z.string().optional(),
});

const proposalUpdateSchema = proposalCreateSchema.partial().extend({
  id: z.string(),
  status: z.enum(['draft', 'submitted', 'pending', 'accepted', 'rejected', 'withdrawn']).optional(),
  mlScore: z.number().min(0).max(1).optional(),
});

const simulateMLScore = (platform: string, budgetMax: number) => {
  // Sophisticated rules for showcase
  let score = 0.5 + Math.random() * 0.3;
  if (platform === 'upwork') score += 0.1;
  if (budgetMax > 5000) score += 0.05;
  return Math.min(score, 0.99);
};

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
        let filtered = proposalsRegistry;
        if (input.status !== 'all') filtered = filtered.filter(p => p.status === input.status);
        if (input.platform !== 'all') filtered = filtered.filter(p => p.platform === input.platform);
        return filtered.slice(input.offset, input.offset + input.limit);
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
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      if (!supabase) {
        const proposal = proposalsRegistry.find(p => p.id === input.id);
        if (!proposal) throw new Error('Proposal not found');
        return proposal;
      }
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
      if (!supabase) {
        const newProposal: Proposal = {
          id: uuidv4(),
          ...input,
          status: 'submitted',
          mlScore: simulateMLScore(input.platform, input.budget.max),
          createdAt: new Date(),
          updatedAt: new Date(),
          jobUrl: input.jobUrl || '',
        };
        setProposalsRegistry([newProposal, ...proposalsRegistry]);
        return newProposal;
      }

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
      if (!supabase) {
        const index = proposalsRegistry.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Proposal not found');

        const updatedProposal = {
          ...proposalsRegistry[index],
          ...updates,
          updatedAt: new Date()
        } as Proposal;

        const newRegistry = [...proposalsRegistry];
        newRegistry[index] = updatedProposal;
        setProposalsRegistry(newRegistry);

        return updatedProposal;
      }

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
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      if (!supabase) {
        setProposalsRegistry(proposalsRegistry.filter(p => p.id !== input.id));
        return { success: true };
      }
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', input.id);

      if (error) throw new Error(error.message);

      return { success: true };
    }),

  getStats: publicProcedure.query(async () => {
    if (!supabase) {
      const total = proposalsRegistry.length;
      const accepted = proposalsRegistry.filter(p => p.status === 'accepted').length;
      const winRate = total > 0 ? (accepted / total) * 100 : 0;

      const byPlatform = proposalsRegistry.reduce((acc, p) => {
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
