# ClawPM API

NestJS + tRPC backend for the ClawPM freelance management platform.

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Set up Supabase database:**
   - Create a new Supabase project at https://supabase.com
   - Run the migration SQL in the Supabase SQL Editor:
     ```sql
     -- Copy contents of supabase/migrations/20260309_initial_schema.sql
     ```
   - (Optional) Run seed data:
     ```sql
     -- Copy contents of supabase/seed.sql
     ```

4. **Start the API:**
   ```bash
   pnpm dev
   ```

   Server will run on http://localhost:3001

## Endpoints

### tRPC API
Base URL: `http://localhost:3001/trpc`

#### Proposals
- `proposals.list` - Get all proposals (with filters)
- `proposals.getById` - Get single proposal
- `proposals.create` - Create new proposal
- `proposals.update` - Update proposal
- `proposals.delete` - Delete proposal
- `proposals.getStats` - Get proposal statistics

#### Agents
- `agents.list` - Get all agents (with filters)
- `agents.getById` - Get single agent
- `agents.spawn` - Spawn new agent
- `agents.update` - Update agent status/task
- `agents.terminate` - Terminate agent
- `agents.getStats` - Get agent statistics

### Health Check
- `GET /health` - API health status

## Database Schema

### Tables
- **proposals** - Freelance proposals
- **agents** - AI agents
- **tasks** - Project tasks (Agile/Scrum)
- **communications** - Client communications
- **code_repositories** - Git repositories

See `supabase/migrations/20260309_initial_schema.sql` for full schema.

## Type Safety

The API uses tRPC for end-to-end type safety with the frontend. Types are automatically inferred from the router definitions.

## Development

```bash
# Watch mode
pnpm dev

# Build
pnpm build

# Production
pnpm start
```

## TODO

- [ ] Add authentication (Supabase Auth)
- [ ] Implement tasks router
- [ ] Implement communications router
- [ ] Implement repositories router
- [ ] Add ML prediction endpoints
- [ ] Add platform integration endpoints (Upwork, Freelancer, etc.)
- [ ] Add real-time subscriptions
- [ ] Add rate limiting
- [ ] Add request validation middleware
- [ ] Add error logging (Sentry)
