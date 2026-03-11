import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import { proposalsRegistry, agentsRegistry } from '../../lib/state';

export const analyticsRouter = router({
    getOverview: publicProcedure.query(async () => {
        // Dynamic stats based on actual registry counts for interactive showcase
        const totalProposals = proposalsRegistry.length;
        const activeAgents = agentsRegistry.filter(a => a.status === 'active').length;
        const acceptedProposals = proposalsRegistry.filter(p => p.status === 'accepted').length;
        const winRate = totalProposals > 0 ? (acceptedProposals / totalProposals) * 100 : 64;

        // Simulating efficiency with a base and jitter
        const baseEfficiency = 94.2;
        const jitter = (Math.random() * 2) - 1;

        return {
            revenue: {
                total: 124500 + (acceptedProposals * 5000),
                growth: 12.5,
                history: [
                    { date: 'JAN', value: 38200 },
                    { date: 'FEB', value: 42100 },
                    { date: 'MAR', value: 52400 },
                ]
            },
            proposals: {
                sent: 142 + totalProposals,
                conversion: Math.round(winRate),
            },
            efficiency: parseFloat((baseEfficiency + jitter).toFixed(1)),
        };
    }),
});
