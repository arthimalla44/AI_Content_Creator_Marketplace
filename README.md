# CreatorHub AI — AI Content Creator Marketplace 🚀

> **Discover AI creators. Build better content. Grow faster.**

**CreatorHub AI** is an AI-native marketplace connecting brands with vetted AI video creators, generative image artists, prompt directors, and voice synthesizers. It features an **Autonomous AI Project Copilot**, an **AI Content Studio**, simulated escrow protection, and specialized dashboards for Clients, Creators, and Platform Admins.

---

## 📁 Repository Structure (Matches Format)

```
creatorhub-ai/
  ├── frontend/          # Next.js App Router, Tailwind CSS, Lucide Icons, Client/Creator/Admin UI
  ├── backend/           # API routes, Auth system, service layer & escrow handlers
  ├── ai-ml/             # Python recommendation engine & neural scoring algorithms
  ├── database/          # Prisma schema & PostgreSQL data models
  ├── tests/             # Unit and integration test suites
  ├── docs/              # System architecture & deployment manuals
  ├── README.md          # Project guide and demo instructions
  ├── .env.example       # Environment template
  └── .gitignore         # Git ignore configuration
```

---

## ⚡ Quick Start (Local Run)

### 1. Navigate to the Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎭 Demo Accounts & Role Switcher
In development mode, you can toggle between accounts directly from the **Role Switcher** in the top navigation bar:
- **Client**: `client@example.com` (Aarav Mehta - Brand Manager)
- **Creator**: `creator@example.com` (Elena Rostova - Runway Gen-3 Filmmaker)
- **Admin**: `admin@example.com` (Platform Trust & Safety Lead)

---

## 🌟 Hackathon Demo Flow Walkthrough

1. **Homepage Hero**: Click **"Find My Perfect Creator"** or type:
   > *"I need a 30-second AI product advertisement for a new smartphone launch with a budget of ₹5,000."*
2. **AI Project Copilot**: View the decomposed creative brief, timeline milestones, required AI toolchain, and **Compatibility Match Scores (94% Match)**.
3. **Creator Profile**: Click **Hire Creator** on Elena Rostova to review her portfolio case studies and AI tools.
4. **Instant Project & Simulated Escrow**: Enter your brief and click **"Confirm & Start Project"** to lock simulated escrow.
5. **Direct Messaging**: Open `/messages` to chat with the creator and see real-time workspace updates.
6. **AI Studio**: Visit `/ai-studio` to generate a 30s video script or evaluate copy using the **Content Quality Analyzer**.
7. **Creator & Admin Dashboards**: Switch roles in the navbar to test the Creator Studio Hub (`/dashboard/creator`) and Admin Console (`/admin`).

---

## 🚀 Deployment to Vercel
1. Push the code to GitHub.
2. Import the `frontend` folder as the root directory on Vercel.
3. Add the environment variables from `.env.example` in Vercel Project Settings.
4. Deploy!
