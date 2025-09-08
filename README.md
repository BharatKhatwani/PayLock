![Hero](apps/user-app/public/home.png)

## PayLock
A modern, fast, and secure peer‑to‑peer wallet. Send money, add funds, and track every transaction with confidence.

### Why PayLock?
- **Simple**: Clean flows for adding money and sending payments
- **Fast**: Built on Next.js App Router with server components
- **Secure**: Authenticated with NextAuth (JWT) and validated inputs
- **Scalable**: Turborepo monorepo with shared packages and Docker support

---

## Features
- **Wallet & Balance**: Real‑time available and locked balance
- **Add Funds**: Simulated bank flows (HDFC, Axis) with on‑ramp transactions
- **P2P Transfers**: Transfer with clear status (success, pending, failed)
- **Insights**: Recent transactions and running totals
- **Auth & Sessions**: NextAuth with JWT sessions
- **Shared UI & DB**: Reusable UI kit and Prisma schema shared across apps

---

Tech Stack

Frontend:
Next.js , React , Tailwind CSS, Framer Motion

Authentication:
NextAuth.js with JWT strategy

Database:
PostgreSQL managed via Prisma ORM

State Management:
Recoil (used for client-side state where needed)

Tooling & Development:
Turborepo monorepo, TypeScript, ESLint, Prettier

Infrastructure & Deployment:

Local development with Docker on AWS EC2

Production-ready deployment on Vercel

💡 Optional polish for a one-liner summary at the top:

“Modern full-stack application using Next.js, PostgreSQL, and Prisma, with JWT-based authentication, state management via Recoil, and production-ready deployment on Vercel.”

If you want, I can also write a “Project Overview + Tech Stack” section for your README that looks professional and investor/employer-ready, not just a list. It will make your repository shine.

Do you want me to do that?

---

## Quick Start
1) Clone
```bash
git clone https://github.com/BharatKhatwani/PayLock.git
cd PayLock
```

2) Install dependencies (root)
```bash
npm install
```

3) Environment variables (root)
Create a `.env` file (or `.env.local`) and set:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
NEXTAUTH_URL=http://localhost:3001
JWT_SECRET=your_long_random_secret
```

4) Generate Prisma and run dev
```bash
npm run db:generate
npm run dev
```

- User app: http://localhost:3001
- Merchant app (optional): http://localhost:3000

---

## Scripts (root)
- `npm run dev`: Start all apps in parallel (Turborepo)
- `npm run build`: Build the user app (and dependencies)
- `npm run lint`: Lint all workspaces
- `npm run db:generate`: Prisma generate for shared DB package
- `npm run db:migrate`: Create or apply a development migration
- `npm run start-user-app`: Start the user app in production mode

---

## Folder Structure
```text
PayLock/
├─ apps/
│  ├─ user-app/
│  │  ├─ app/                     # Next.js App Router (routes, layouts, server components)
│  │  │  └─ (dashboard)/
│  │  │     
│  │  ├─ components/             
│  │  ├─ public/                  # Static assets served from root (/)
│  │  │  ├─ home.png              # Default hero image used in README
│  │  │  ├─ HDFC-Bank-Logo.png
│  │  │  ├─ axisLogo.png
│  │  │  ├─ circles.svg
│  │  │  ├─ next.svg
│  │  │  ├─ pexels-maitree-rimthong-444156-1602726.jpg
│  │  │  ├─ turborepo.svg
│  │  │  └─ vercel.svg
│  │  ├─ types/
│  │  ├─ provider.tsx             # Global client providers (Recoil, SessionProvider)
│  │  ├─ next.config.js
│  │  ├─ tailwind.config.js
│  │  ├─ postcss.config.js
│  │  ├─ package.json
│  │  └─ vercel.json              # Optional Vercel build config for this app
│  ├─ merchant-app/               # Optional merchant-facing app (Next.js)
│  └─ bank_webhook_handler/       # Placeholder for webhook/Express handlers
│     └─ src/
│        └─ index.ts
├─ packages/
│  ├─ db/                         # Prisma schema + generated client
│  │  └─ prisma/
│  │     └─ schema.prisma
│  ├─ ui/                         # Shared UI primitives/components
│  ├─ store/                      # Shared state utilities
│  ├─ eslint-config/              # Shared ESLint config
│  └─ typescript-config/          # Shared tsconfig bases
├─ docker/
│  └─ Dockerfile.user             # Image for user-app
├─ .github/                       # CI workflows (if any)
├─ .turbo/                        # Turborepo cache (generated)
├─ node_modules/                  # Root deps (generated)
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ turbo.json
└─ README.md
```

---

## Development Notes
- The user app listens on port `3001` by default (`apps/user-app/package.json`).
- Server components fetch session via `getServerSession` and decide navigation (e.g., dashboard vs home).
- Use `/public` assets in the user app via absolute paths like `/home.png`.
- Database schema is centralized in `packages/db/prisma/schema.prisma`.

---

## Building & Running
- Development (all workspaces):
```bash
npm run dev
```

- Production build (user app):
```bash
npm run build
npm run start-user-app
```

- Docker (user app image): see `docker/Dockerfile.user`.

---

## Security
- Use strong `JWT_SECRET` and keep it private
- Never commit `.env*` files
- Validate all inputs server‑side before DB writes

---

## License
MIT — do what you love, be kind in attribution, and contribute back when you can.

##Contact

Email: bharatkhatwani06@gmail.com

LinkedIn: Bharat Khatwani

Twitter: @BharatKhatwan13