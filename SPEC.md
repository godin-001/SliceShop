# SliceShop — Build Spec

## Product Vision
Build a Web3 commerce platform called "SliceShop" — a tool that lets anyone create an onchain store with an ENS name, accept stablecoin payments via Celo, and process orders autonomously using Slice commerce infrastructure.

The problem: setting up an onchain store today requires knowing Solidity, managing contracts, and handling payments manually. SliceShop makes it as easy as filling a form — the agent handles the rest.

Three things the agent does autonomously:
1. Creates a Slice store and links it to an ENS subdomain
2. Accepts cUSD / USDC payments on Celo automatically
3. Processes and confirms orders without human intervention

## Visual Design
Aesthetic: clean editorial commerce — think Stripe meets onchain.
- Background: #0a0a0a (near black)
- Accent: #22c55e (green — money, go, success)
- Secondary accent: #a78bfa (purple — web3, identity)
- Font display: "Syne" (headings) — bold, geometric
- Font body: "DM Mono" (labels, addresses, code)
- Borders: 0.5px solid rgba(255,255,255,0.08)
- No gradients, no shadows, no rounded corners on containers
- Cards: white bg in light sections, #111 in dark sections
- Crosshair cursor throughout
- Subtle grid texture on hero background

Key visual metaphor: a storefront window — clean glass, what's inside is what matters.

## Pages

### 1. Landing Page (/)
Hero section:
- Headline (Syne, huge): "OpeN A sToRe. GeT pAiD oNcHaIn." (chaos-casing — alternate upper/lowercase on each character)
- Subheadline: "ENS name. Celo payments. Slice commerce. No code required."
- Two CTAs: "Create my store ↗" (filled green) + "See how it works" (ghost)
- Animated ticker: cUSD · ENS · Slice · Celo · USDC · Base · Orders · Payments
- Floating store preview card on the right (mockup)

How it works (3 steps):
- Step 01: "Name your store" → ENS subdomain (yourstore.sliceshop.eth)
- Step 02: "Add your products" → Slice product manager
- Step 03: "Get paid" → cUSD/USDC direct to your wallet on Celo

Featured stores section:
- 3 mock store cards showing different categories
- Each card: store ENS name, product count, total sales, "Visit store →" link

### 2. Store Creator (/create)
Multi-step form (3 steps, progress indicator at top):

Step 1 — Store identity:
- Store name input → auto-generates ENS preview: "yourname.sliceshop.eth"
- Description textarea
- Category selector (Digital goods / Physical / Services / Memberships)
- Store avatar upload (optional)
- Connect wallet button (wagmi + ConnectKit)

Step 2 — Products:
- "Add product" button → opens inline form
- Name, description, price in USD, stock quantity (or unlimited toggle), digital delivery URL (optional)
- Products list with edit/delete
- Minimum 1 product required to continue

Step 3 — Payment settings:
- Payment currency selector: cUSD (default) / USDC / CELO
- Wallet address (auto-filled from connected wallet)
- Order confirmation: Automatic (agent handles) / Manual review
- Preview of store before deploying

Confirmation screen:
- "Your store is live"
- ENS name display: yourstore.sliceshop.eth
- Links: Visit store / Share / Go to dashboard

### 3. Store Page (/store/[ensName])
Public storefront that anyone can visit:
- Header: store name, description, owner ENS, "Powered by SliceShop" badge
- Product grid: name, description, price in cUSD, "Buy now" button, stock indicator
- Purchase flow modal (4 steps: review → connect wallet → approve payment → confirmation with tx hash)
- Order confirmation toast: green, "Order #1234 confirmed", Celoscan link

### 4. Store Dashboard (/dashboard/[ensName])
Private dashboard for store owners:
- Metric cards: Total revenue (cUSD), Orders count, Active products, Store visitors (mock)
- Orders table: ID, Product, Amount, Buyer ENS/address, Status pill, Tx Hash, Date
- Products manager: list with edit/delete, add product, toggle active/inactive
- Payment history: all cUSD transactions with Celoscan links, export CSV (mock)
- Agent activity log: autonomous actions taken (order confirmed, ENS updated, low stock alert)

## Tech Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS (dark theme, custom design tokens)
- wagmi v2 + viem
- ConnectKit
- Celo chain config (chainId: 42220, cUSD: 0x765DE816845861e75A25fCA122bb6898B8B1282a, RPC: https://forno.celo.org)
- ENS resolution via wagmi hooks (useEnsName, useEnsAddress)
- Framer Motion (ticker animation, page transitions, modal animations)

## Component Structure
/app
  /page.tsx → landing
  /create/page.tsx → store creator wizard
  /store/[ensName]/page.tsx → public storefront
  /dashboard/[ensName]/page.tsx → owner dashboard
/components
  /landing - Hero.tsx, Ticker.tsx, HowItWorks.tsx, FeaturedStores.tsx
  /create - StoreCreatorWizard.tsx, StepIdentity.tsx, StepProducts.tsx, StepPayments.tsx, ConfirmationScreen.tsx
  /store - ProductGrid.tsx, ProductCard.tsx, PurchaseModal.tsx, OrderConfirmation.tsx
  /dashboard - MetricCards.tsx, OrdersTable.tsx, ProductsManager.tsx, AgentActivityLog.tsx
  /ui - NavBar.tsx, Footer.tsx, ENSAddress.tsx, WalletInput.tsx, StatusPill.tsx
/lib
  celo.ts → Celo chain config + cUSD helpers
  ens.ts → ENS subdomain helpers
  agent.ts → autonomous order processing logic
/hooks
  useStore.ts, useOrders.ts, useCeloPayment.ts, useENS.ts

## Mock Data
Featured stores:
- "pixeldrops.sliceshop.eth" — Digital Art, 12 products, $840 sales
- "merklemerch.sliceshop.eth" — Physical goods, 5 products, $1,240 sales
- "zeroknowledge.sliceshop.eth" — Courses, 3 products, $2,100 sales

Sample products:
- "Genesis NFT Pack" — $25 cUSD — Digital — 47 remaining
- "Protocol Hoodie" — $65 cUSD — Physical — 12 remaining
- "ZK Fundamentals Course" — $99 cUSD — Digital — Unlimited

Sample orders: mix of Confirmed/Pending/Fulfilled with realistic Celo tx hashes and ENS buyer names

## Design Rules — NON NEGOTIABLE
- Chaos-casing on ALL h1 and h2: alternate uppercase/lowercase on each character
- Outline text on second line of hero: -webkit-text-stroke, transparent fill
- Ticker loops infinitely — duplicate items to avoid gaps
- Section labels: small tag like "[01] — How it works"
- Step numbers: huge faded number (opacity 0.06) behind content
- Status pills: colored background matching semantic meaning
- All CTAs: uppercase, letter-spacing 0.1em, DM Mono font
- Hover on cards: border brightens to rgba(255,255,255,0.2)
- No gradients on containers — flat fills only
- No rounded corners on cards — only on pills and badges
- Crosshair cursor on all interactive elements

## Build Order
1. Landing page with full design system
2. Store Creator wizard (3 steps)
3. Public store page with purchase modal
4. Owner dashboard with orders + agent log
5. Wire up wagmi + ConnectKit
6. Add ENS resolution throughout
7. Add Celo chain config + cUSD helpers
8. Add autonomous agent logic (API routes)

Make it production-quality. Prioritize UX — this is a product, not a prototype. Every screen should feel finished and shippable. Use mock data where real integrations would need API keys. The wagmi/ConnectKit wallet connection should be real/functional.
