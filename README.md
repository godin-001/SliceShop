# SliceShop 🛒

**Web3 commerce platform that lets anyone create an onchain store with an ENS identity, accept stablecoin payments via Celo, and process orders autonomously — no code required.**

Built for [The Synthesis Hackathon](https://synthesis.devfolio.co) by Jennifer Gabriela (@gabrululu) + Gabs (AI agent, claude-sonnet-4-6 on OpenClaw).

---

## What it does

SliceShop removes every barrier between a creator and their first onchain store:

1. **Pick an ENS name** — your store gets a human-readable subdomain like `yourstore.sliceshop.eth` instead of a hex address. ENS names power identity, discovery, and trust across the platform.
2. **List products with Slice** — use Slice commerce infrastructure to create products, set prices in cUSD/USDC, and configure your storefront in minutes.
3. **Accept Celo stablecoin payments** — customers pay with cUSD or USDC on Celo (fast, low-fee Ethereum L2). No credit cards, no banks, no borders.
4. **Autonomous order agent** — an onchain agent monitors incoming Slice orders, verifies cUSD payments on Celo, auto-confirms purchases, manages inventory, and syncs ENS metadata. Store owners don't have to do anything after setup.

## Who it's for

Small businesses and creators in emerging markets (Latin America, Africa, Southeast Asia) who want to sell online without:
- A bank account
- Solidity expertise
- Complex payment integrations
- Platform lock-in fees

## Live demo

🌐 **[sliceshop-phi.vercel.app](https://sliceshop-phi.vercel.app)**

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, live store feed |
| `/create` | 3-step store creator wizard |
| `/store/[ensName]` | Public storefront for any ENS store |
| `/dashboard/[ensName]` | Owner dashboard — orders, products, agent log |
| `/dashboard` | Auto-redirects to demo store |

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design system |
| Animations | Framer Motion |
| Web3 | wagmi v2 + viem + ConnectKit |
| Payments | Celo (chainId 42220) — cUSD `0x765DE816845861e75A25fCA122bb6898B8B1282a` |
| Identity | ENS names via wagmi hooks — `yourstore.sliceshop.eth` |
| Commerce | Slice protocol infrastructure |
| Deploy | Vercel |

## Design system

- `#0a0a0a` background — pure dark
- `#22c55e` green accent — payments, success states
- `#a78bfa` purple accent — agent activity, Web3 elements
- DM Mono (monospace) + Syne (headings)
- Chaos-casing on h1/h2 headings
- Crosshair cursor
- Zero rounded corners on cards — sharp edges only

## Bounties targeted

| Track | Sponsor | Prize |
|---|---|---|
| Best Agent on Celo | Celo | up to $3,000 |
| Future of Commerce | Slice | up to $550 credits |
| ENS Identity | ENS | up to $1,100 |
| ENS Communication | ENS | up to $1,100 |
| ENS Open Integration | ENS | up to $1,100 |
| Synthesis Open Track | Community | variable |

## Repo structure

```
sliceshop/
├── app/
│   ├── page.tsx              # Landing page
│   ├── create/page.tsx       # Store creator wizard
│   ├── store/[ensName]/      # Public storefront
│   └── dashboard/[ensName]/  # Owner dashboard
├── components/
│   ├── ui/                   # NavBar, Footer, ENSAddress, WalletInput, StatusPill
│   ├── dashboard/            # MetricCards, OrdersTable, ProductsManager, AgentActivityLog
│   └── store/                # StoreHeader, ProductGrid, PurchaseModal
├── hooks/
│   ├── useCeloPayment.ts     # cUSD payment hook
│   ├── useENS.ts             # ENS resolution hook
│   ├── useOrders.ts          # Order management hook
│   └── useStore.ts           # Store state hook
└── lib/
    ├── celo.ts               # Celo chain config + wagmi setup
    ├── ens.ts                # ENS utilities
    ├── agent.ts              # Autonomous order agent logic
    └── mock-data.ts          # Demo data for preview
```

## Run locally

```bash
git clone https://github.com/godin-001/SliceShop
cd SliceShop
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Built in 1 hour

This project was built during The Synthesis hackathon in a single focused session — full stack, deployed, zero TypeScript errors.

---

Made with ⚡ by Jennifer Gabriela + Gabs
