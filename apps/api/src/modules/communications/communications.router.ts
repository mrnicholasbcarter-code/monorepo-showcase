import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { v4 as uuidv4 } from 'uuid';
import { threadsRegistry, messagesRegistry } from '../../lib/state';

export const communicationsRouter = router({
    listThreads: publicProcedure.query(async () => {
        return threadsRegistry;
    }),

    getThreadMessages: publicProcedure
        .input(z.object({ threadId: z.string() }))
        .query(async ({ input }) => {
            return messagesRegistry[input.threadId] || [];
        }),

    sendMessage: publicProcedure
        .input(z.object({
            threadId: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ input }) => {
            const newMessage = {
                id: uuidv4(),
                from: 'You',
                content: input.content,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                self: true,
            };

            if (!messagesRegistry[input.threadId]) {
                messagesRegistry[input.threadId] = [];
            }
            messagesRegistry[input.threadId].push(newMessage);

            // Update thread preview
            const thread = threadsRegistry.find(t => t.id === input.threadId);
            if (thread) {
                thread.preview = input.content;
                thread.time = 'Just now';
            }

            return newMessage;
        }),
});
