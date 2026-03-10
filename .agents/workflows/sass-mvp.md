---
description: Build and ship a fully featured and production-minded SaaS product.
---

Prerequisites
Local repository and runtime configured.
Clear user problem and MVP scope.
Basic deployment target selected.
Steps
Plan the scope

Goal: Define MVP boundaries and acceptance criteria.
Skills: @brainstorming, @concise-planning, @writing-plans
Prompt example: Usa @concise-planning per definire milestones e criteri di accettazione del mio MVP SaaS.
Build backend and API

Goal: Implement core entities, APIs, and auth baseline.
Skills: @backend-dev-guidelines, @api-patterns, @database-design
Prompt example: Usa @backend-dev-guidelines per creare API e servizi del dominio billing.
Build frontend

Goal: Ship core user flow with clear UX states.
Skills: @frontend-developer, @react-patterns, @frontend-design
Prompt example: Usa @frontend-developer per implementare onboarding, empty state e dashboard iniziale.
Test and validate

Goal: Cover critical user journeys before release.
Skills: @test-driven-development, @browser-automation, @go-playwright (optional, Go stack)
Prompt example: Usa @browser-automation per creare test E2E sui flussi signup e checkout.
Go note: Se il progetto QA e tooling sono in Go, preferisci @go-playwright.
Ship safely

Goal: Release with observability and rollback plan.
Skills: @deployment-procedures, @observability-engineer
Prompt example: Usa @deployment-procedures per una checklist di rilascio con rollback.
