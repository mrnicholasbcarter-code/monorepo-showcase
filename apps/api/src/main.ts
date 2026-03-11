import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { startSimulation } from './lib/state';

const app = express();
const port = process.env.PORT || 3001;

// tRPC endpoint
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port}`);
  console.log(`📡 tRPC endpoint: http://localhost:${port}/trpc`);

  // Start the background simulation loop for the showcase
  startSimulation();
});
