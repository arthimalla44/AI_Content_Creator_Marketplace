# CreatorHub AI — Known Issues & Architectural Audit Notes

## 1. Supabase Database Configuration & Architecture
- **Supabase Host**: `aws-0-ap-southeast-1.pooler.supabase.com`
- **Port Usage**:
  - **Port 5432 (Session Mode)**: Used for Prisma ORM queries and transactional operations. Verified with active connections, CRUD operations, and transaction rollbacks.
  - **Port 6543 (Transaction Pooler)**: Recommended for serverless high-concurrency environments.
- **Row Level Security (RLS)**:
  - All application queries currently route through Prisma ORM over a secure server-side connection string.
  - If direct client-side Supabase JavaScript SDK access (`@supabase/supabase-js`) is introduced in the future, Supabase RLS policies must be explicitly defined on tables such as `User`, `Project`, and `SavedAIContent`.

## 2. AI Provider Integration Status
- **Current Behavior**:
  - The application provides an intelligent, structured local AI generation engine in [`frontend/lib/aiService.ts`](file:///c:/Users/arthi/OneDrive/Desktop/ML/creatorhub-ai/frontend/lib/aiService.ts). It generates video scripts, social copy, ad headlines, and content quality analytics without requiring paid external API credits.
- **External Provider Status**:
  - Live external LLM calls (e.g. OpenAI GPT-4o, Claude 3.5 Sonnet API) are marked as **BLOCKED / OPTIONAL** pending user provisioning of `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` in `frontend/.env`.
  - The local generation engine ensures that all user flows (AI Studio, Copilot, matching) remain 100% functional and responsive even without external credentials.

## 3. Stripe Payment Gateway
- **Checkout Webhooks & Payment Intents**:
  - Prepared for Stripe keys (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).
  - Active sandbox mode prevents real financial transactions during testing.
