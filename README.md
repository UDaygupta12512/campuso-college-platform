# Campuso — College Discovery & Decision Platform

A production-grade platform to help students explore, compare, and decide on Indian colleges.

## Features

- **College Listing & Search** — Browse 50+ colleges with filters for state, fees, course, and sorting by rating/placement/fees
- **College Detail Pages** — Deep-dive into any college: overview, courses, placements, reviews
- **Compare Colleges** — Side-by-side comparison table with a weighted scoring verdict
- **Rank Predictor** — Enter your JEE / CAT / NEET rank and see which colleges you're eligible for
- **Q&A Discussion** — Ask questions, get answers from the community; linked to specific colleges

## Tech Stack

- **Frontend**: Next.js 16 (App Router, Turbopack), Tailwind CSS v4
- **Backend**: Next.js API Routes (REST)
- **Database**: SQLite via Prisma ORM (local dev) — swap to PostgreSQL for production
- **Language**: TypeScript

## Getting Started

```bash
npm install
npx prisma db push
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

The app uses SQLite locally (`prisma/dev.db`). To switch to PostgreSQL:
1. Update `prisma/schema.prisma` → change provider to `postgresql` and set array fields back to `String[]`
2. Set `DATABASE_URL` in `.env`
3. Run `npx prisma db push` and re-seed

## Deployment

Frontend and API routes deploy together on **Vercel** (see `vercel.json`).  
For production, use a hosted PostgreSQL database (e.g. [Neon](https://neon.tech)).
