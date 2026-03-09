# Monorepo Showcase

AI-first freelance management platform built with modern tooling.

## Structure

- `apps/` - Applications (ClawPM dashboard, playground)
- `packages/` - Shared libraries (UI components, utilities)
- `projects/` - Integrated example projects

## Tech Stack

- **Monorepo:** TurboRepo
- **Frontend:** Next.js 14+ (App Router, RSC)
- **Backend:** NestJS + tRPC
- **Database:** Supabase (PostgreSQL + Realtime)
- **UI:** React + Tailwind + Framer Motion
- **AI:** OpenAI/Anthropic via Vercel AI SDK
- **Deployment:** Vercel (frontend), Railway/Fly.io (backend)

## Getting Started

\`\`\`bash
# Install dependencies
pnpm install

# Start development
pnpm dev
\`\`\`

## Features

### Freelance Management (v0.2.0)
- **Proposal Tracking** - Multi-platform support (Upwork, Freelancer, Guru, Fiverr, LinkedIn)
- **AI Agents** - Spawn and manage specialized agents (Architecture, QA, DevOps, Sales, Marketing, Graphic Design)
- **ML Predictions** - Proposal success scoring and optimization
- **Real-time Analytics** - Win rates, response times, platform performance
- **A/B Testing** - Multi-variant proposal optimization
- **Status Dashboard** - Live stats and agent monitoring

### UI Components
- Animated cards with Framer Motion
- Responsive layouts
- Oceanic blue theme
- Dark mode ready

## Status

🚧 **Active Development** - v0.2.0

Built by [Nick Carter](https://github.com/mrnicholasbcarter-code)
