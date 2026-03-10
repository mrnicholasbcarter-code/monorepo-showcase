import { router } from './trpc';
import { proposalsRouter } from './modules/proposals/proposals.router';
import { agentsRouter } from './modules/agents/agents.router';
import { tasksRouter } from './modules/tasks/tasks.router';
import { analyticsRouter } from './modules/analytics/analytics.router';
import { communicationsRouter } from './modules/communications/communications.router';
import { financialsRouter } from './modules/financials/financials.router';
import { repositoriesRouter } from './modules/repositories/repositories.router';

export const appRouter = router({
  proposals: proposalsRouter,
  agents: agentsRouter,
  tasks: tasksRouter,
  analytics: analyticsRouter,
  communications: communicationsRouter,
  financials: financialsRouter,
  repositories: repositoriesRouter,
});

export type AppRouter = typeof appRouter;
