import { router } from './trpc';
import { proposalsRouter } from './modules/proposals/proposals.router';
import { agentsRouter } from './modules/agents/agents.router';

export const appRouter = router({
  proposals: proposalsRouter,
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
