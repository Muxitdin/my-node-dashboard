## My Node Dashboard

A small Next.js dashboard that connects a MetaMask wallet, authenticates a user via signature, and shows investor/node stats stored in PostgreSQL via Prisma.

---

## 🚀 How to Install & Run

### 1. Clone the repo

```bash
git clone https://github.com/Muxitdin/my-node-dashboard.git
cd my-node-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a ***.env*** file in the project root:

```.dotenv
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/mydashboarddb
```

If you haven’t created the **DataBase** yet:

```sql
psql -U postgres -c "CREATE DATABASE mydashboarddb;"
```

Apply Prisma migrations
```bash
npx prisma migrate dev --name init
```

You can also inspect the DB using Prisma Studio:

```bash
npx prisma studio
```

Run the dev server

```bash
npm run dev
```

## 🗄️ Database Schema

```postgresql
model Investor {
  id            String   @id @default(cuid())
  walletAddress String   @unique
  nodes         Int
  startedAt     DateTime
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Notes
- **walletAddress** – the user’s EVM address (MetaMask, etc.), unique per investor.
- **nodes** – how many nodes this investor owns ( randomly 0-20 ).
- **startedAt** – when they started accumulating points (used to calculate total points over time).
- **createdAt** / **updatedAt** – managed by Prisma.

## 🧱 Architecture Summary

#### **Tech Stack**:
* Framework: Next.js (App Router)
* Language: TypeScript
* UI: React, Tailwind CSS
* Web3: Wagmi, MetaMask
* ORM: Prisma
* DB: PostgreSQL

### High-Level Flow

1. User visits the app
   * Root page is a client component (app/page.tsx with 'use client').
   * Layout: fixed Sidebar on the left, main content area on the right.
2. Wallet connection
   * Sidebar shows MetaMask status (connected / not connected).
   * ConnectWalletModal is opened from both:
     * Sidebar button (if not connected),
     * “Connect Wallet” CTA in the main dashboard area.
   * Wagmi is used to:
     * Detect available connectors (Injected / MetaMask),
     * Connect to wallet,
     * Request message signature for authentication.
   * On successful signature:
     * The app saves the authenticated wallet address.
3. API layer
   * **app/api/investor/route.ts** exposes:
     * GET request to  **/api/investor?walletAddress=0x...**
       * Uses Prisma to upsert the Investor row by walletAddress.
       * Initializes it if it doesn’t exist.
   * The API runs **server-side**, using the **DATABASE_URL** from environment variables.
4. Logout behavior
   * Sidebar has a Logout button that calls **disconnect()** from **Wagmi**.
   * On disconnect:
     * **Wagmi** clears session.
     * Parent component clears any persisted address in localStorage, so the dashboard hides and the "Connect Wallet" CTA shows again.
