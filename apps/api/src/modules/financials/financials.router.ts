import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';

export const financialsRouter = router({
    getStats: publicProcedure.query(async () => {
        if (!supabase) {
            return {
                netProfitYTD: 142500,
                grossRevenue: 185000,
                totalExpenses: 42500,
                taxEstimate: 12400,
                currentBalance: 52400,
            };
        }
        return null;
    }),
    listTransactions: publicProcedure.query(async () => {
        if (!supabase) {
            return [
                { id: 't1', label: 'Upwork Payout', amount: 4500, type: 'income', status: 'paid', date: new Date().toISOString() },
                { id: 't2', label: 'AWS Infrastructure', amount: -240, type: 'expense', status: 'paid', date: new Date().toISOString() },
            ];
        }
        return [];
    })
});
