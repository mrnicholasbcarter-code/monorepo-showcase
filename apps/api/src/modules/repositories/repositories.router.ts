import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';

export const repositoriesRouter = router({
    list: publicProcedure.query(async () => {
        if (!supabase) {
            return [
                {
                    id: 'r1',
                    name: 'enterprise-saas-core',
                    platform: 'github',
                    url: 'https://github.com/org/saas',
                    status: 'active',
                    reviewStatus: 'approved',
                    lastCommit: new Date().toISOString()
                },
                {
                    id: 'r2',
                    name: 'ai-aggregator-ml',
                    platform: 'gitlab',
                    url: 'https://gitlab.com/org/ai',
                    status: 'active',
                    reviewStatus: 'pending',
                    lastCommit: new Date(Date.now() - 86400000).toISOString()
                }
            ];
        }
        return [];
    }),
});
