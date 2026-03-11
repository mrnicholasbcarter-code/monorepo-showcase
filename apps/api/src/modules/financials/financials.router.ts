import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';
import { proposalsRegistry, tasksRegistry } from '../../lib/state';

export const financialsRouter = router({
    getStats: publicProcedure.query(async () => {
        // Base numbers for showcase
        const baseProfit = 142500;
        const acceptedProposals = proposalsRegistry.filter(p => p.status === 'accepted').length;
        const completedTasks = tasksRegistry.filter(t => t.status === 'done').length;

        // Dynamic adjustment for realism
        const netProfitYTD = baseProfit + (acceptedProposals * 5000) + (completedTasks * 200);

        return {
            netProfitYTD,
            grossRevenue: netProfitYTD * 1.25,
            totalExpenses: netProfitYTD * 0.25,
            taxEstimate: netProfitYTD * 0.15,
            currentBalance: netProfitYTD * 0.4,
        };
    }),
    listTransactions: publicProcedure.query(async () => {
        return [
            { id: 't1', label: 'Upwork Payout', amount: 4500, type: 'income', status: 'paid', date: new Date().toISOString() },
            { id: 't2', label: 'AWS Infrastructure', amount: -240, type: 'expense', status: 'paid', date: new Date().toISOString() },
            { id: 't3', label: `Proposal Payout: ${proposalsRegistry[0]?.title || 'Alpha Project'}`, amount: 8000, type: 'income', status: 'paid', date: new Date().toISOString() },
        ];
    })
});
