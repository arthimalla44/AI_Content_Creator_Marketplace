# CreatorHub AI - Backend Architecture

The backend architecture is structured around Next.js App Router API endpoints and server actions backed by Prisma ORM and PostgreSQL.

### Core Endpoints:
- `POST /api/ai/copilot`: Intelligent project decomposition, milestone estimation, and creator compatibility ranking.
- `POST /api/ai/studio`: Neural generation for scripts, social hooks, ad copy, and content quality auditing.
- `GET /api/creators`: Directory query with category, toolstack, and verification status filters.
- `GET /api/services`: Turnkey AI service packages with pricing tiers.
- `POST /api/projects`: Milestone escrow allocation and project workflow lifecycle.

### Mock & Live Providers:
The system automatically defaults to `MockAIProvider` for local hackathon demonstrations without requiring external API keys. It seamlessly transitions to OpenAI, Google Gemini, or OpenRouter when environment variables are supplied.
