import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { supabase } from '../../config/supabase';

export const communicationsRouter = router({
    listThreads: publicProcedure
        .query(async () => {
            if (!supabase) {
                return [
                    { id: '1', name: 'Sarah M.', platform: 'upwork', preview: 'The dashboard looks great! Can we schedule a call?', time: '2m ago', unread: 2, starred: true, avatar: 'SM' },
                    { id: '2', name: 'James T.', platform: 'freelancer', preview: 'I reviewed your proposal. Very impressive, but we need...', time: '1h ago', unread: 0, starred: false, avatar: 'JT' },
                    { id: '3', name: 'CryptoVault Inc.', platform: 'direct', preview: 'Following up on the smart contract audit project', time: '3h ago', unread: 1, starred: true, avatar: 'CV' },
                    { id: '4', name: 'Alicia R.', platform: 'fiverr', preview: 'Milestone 2 complete — files are in the shared drive', time: '1d ago', unread: 0, starred: false, avatar: 'AR' },
                    { id: '5', name: 'Tech Stack Co.', platform: 'upwork', preview: 'Genesis AI submitted the first draft. Looks solid.', time: '2d ago', unread: 0, starred: false, avatar: 'TS' },
                ];
            }
            return [];
        }),

    getThreadMessages: publicProcedure
        .input(z.object({ threadId: z.string() }))
        .query(async ({ input }) => {
            if (!supabase) {
                return [
                    { id: '1', from: 'Sarah M.', content: 'Hi! I reviewed your proposal for the Next.js SaaS platform — really impressive work!', time: '10:24 AM', self: false },
                    { id: '2', from: 'You', content: 'Thanks Sarah! Happy to answer any questions. I have built 3 similar platforms this quarter.', time: '10:27 AM', self: true },
                    { id: '3', from: 'Sarah M.', content: 'The dashboard looks great! Can we schedule a call for tomorrow?', time: '10:31 AM', self: false },
                    { id: '4', from: 'Genesis (AI)', content: '📌 I have pre-filled a meeting link for 9 AM tomorrow based on your calendar availability.', time: '10:31 AM', self: false, isAI: true },
                ];
            }
            return [];
        }),
});
