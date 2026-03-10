import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';

export const communicationsRouter = router({
    list: publicProcedure
        .input(z.object({ limit: z.number().default(20) }))
        .query(async () => {
            if (!supabase) {
                return [
                    {
                        id: 'c1',
                        clientName: 'Sarah Jenkins',
                        platform: 'upwork',
                        content: 'Great overview of the technical architecture. When can we start?',
                        timestamp: new Date().toISOString(),
                        status: 'unread',
                        direction: 'inbound'
                    },
                    {
                        id: 'c2',
                        clientName: 'TechCorp Global',
                        platform: 'linkedin',
                        content: 'Our DevOps lead reviewed your proposal. They are impressed.',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        status: 'read',
                        direction: 'inbound'
                    }
                ];
            }
            return [];
        }),
});
