# SliceShop 🛒

**Web3 commerce platform that lets anyone create an onchain store with an ENS identity, authenticate via ERC-8128, accept stablecoin payments via Celo, and process orders autonomously — no code required.**

Built for [The Synthesis Hackathon](https://synthesis.devfolio.co) by Jennifer Gabriela (@gabrululu) + Gabs (AI agent, claude-sonnet-4-6 on OpenClaw).

---

## What it does

SliceShop removes every barrier between a creator and their first onchain store:

1. **Pick an ENS name** — your store gets a human-readable subdomain like `yourstore.sliceshop.eth` instead of a hex address. ENS names power identity, discovery, and trust across the platform.
2. **Authenticate with ERC-8128** — sign in with your wallet using a signed message (no passwords, no OAuth). Sessions are verified on-chain and expire automatically.
3. **List products with Slice** — use Slice commerce infrastructure to create products, set prices in cUSD/USDC, and configure your storefront in minutes.
4. **Accept Celo stablecoin payments** — customers pay with cUSD on Celo (fast, ~$0.001 fees). No credit cards, no banks, no borders.
5. **x402 payment protocol** — every premium content or product request goes through an HTTP 402 payment gate. The agent verifies the cUSD payment header before granting access.
6. **Autonomous order agent** — monitors incoming Slice orders, verifies cUSD payments on Celo, auto-confirms purchases, manages inventory, and logs all activity. Store owners don't have to do anything after setup.

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
| `/auth` | ERC-8128 wallet authentication flow |
| `/create` | 3-step store creator wizard |
| `/store/[ensName]` | Public storefront for any ENS store |
| `/dashboard/[ensName]` | Owner dashboard — orders, products, agent log |
| `/dashboard` | Auto-redirects to demo store |

---

## Architecture & New Implementations

### 🔐 ERC-8128 Authentication

**Files:** `app/auth/page.tsx` · `app/api/auth/erc8128/route.ts` · `lib/erc8128.ts` · `hooks/useERC8128.ts`

ERC-8128 is a wallet-native authentication standard. Instead of passwords, users sign a structured message with their wallet. SliceShop implements the full flow:

- **Message generation** — builds a structured auth message with domain, address, nonce, and expiration
- **Signature verification** — server-side `verifyMessage` via `viem` validates the signature cryptographically
- **Session management** — issues a UUID session token on success; sessions expire after 30 minutes
- **Redirect on auth** — once authenticated, users are sent to their dashboard automatically

```
POST /api/auth/erc8128
Body: { message, signature, address }
Returns: { success, token, address }
```

---

### 💳 x402 Payment Protocol

**Files:** `app/api/agent/x402/route.ts` · `lib/x402.ts`

x402 is an HTTP-native payment protocol — when a resource requires payment, the server responds with `HTTP 402 Payment Required` and a payment request header. The client pays in cUSD and retries with the payment proof in the `X-Payment` header.

SliceShop's agent uses x402 to gate premium content and product access:

- **Payment request** — returns a structured JSON with amount, cUSD token address, Celo chainId (42220), and recipient wallet
- **Payment verification** — decodes the base64 `X-Payment` header, checks amount ≥ required, verifies recipient and token addresses match, confirms Celo chain
- **On success** — grants access to the gated resource with transaction hash reference

```
GET /api/agent/x402
→ 402 + X-Payment-Request header (if no payment)
→ 200 + { content } (if X-Payment header is valid)
```

cUSD contract: `0x765DE816845861e75A25fCA122bb6898B8B1282a` (Celo mainnet)

---

### 🤖 Autonomous Order Agent

**Files:** `app/api/agent/process/route.ts` · `lib/agent.ts`

The order agent runs server-side and handles the post-purchase lifecycle autonomously:

- **GET `/api/agent/process`** — returns a live activity log of agent actions: ERC-8128 auth events, x402 payments processed/rejected, orders confirmed, inventory updates
- **POST `/api/agent/process`** — confirms an order given `{ storeEns, orderId, txHash }` and returns a celoscan.io verification link

Activity types tracked:
| Type | Description |
|---|---|
| `erc8128` | Auth sign-ins and session expirations |
| `x402` | Payments processed or rejected via x402 |
| `order` | Order confirmations and delivery triggers |
| `inventory` | Stock updates |

---

### 💚 Celo Stablecoin Payments

**Files:** `lib/celo.ts` · `lib/web3-config.ts` · `hooks/useCeloPayment.ts`

All payments on SliceShop run on Celo:

- **Chain config** — Celo mainnet (chainId `42220`) configured in wagmi
- **cUSD hook** — `useCeloPayment` handles ERC-20 transfers to store wallets, tracks tx status, surfaces celoscan links
- **Token** — cUSD (`0x765DE816845861e75A25fCA122bb6898B8B1282a`) is the default; USDC also supported

---

### 🌐 ENS Identity

**Files:** `lib/ens.ts` · `hooks/useENS.ts`

Every store on SliceShop has a human-readable ENS identity:

- **Store ENS** — format: `storename.sliceshop.eth`
- **Address resolution** — `useENS` hook resolves ENS ↔ address bidirectionally via wagmi
- **ENS metadata** — agent syncs store metadata (avatar, description, url) to ENS text records on updates
- **Display** — `ENSAddress` component shows resolved names throughout the UI with fallback to truncated hex

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design system |
| Animations | Framer Motion |
| Web3 | wagmi v2 + viem + ConnectKit |
| Auth | ERC-8128 (wallet signature + server verification) |
| Payments | x402 protocol + Celo (chainId 42220) — cUSD |
| Identity | ENS — `yourstore.sliceshop.eth` |
| Commerce | Slice protocol infrastructure |
| Deploy | Vercel |

---

## Design system

- `#0a0a0a` background — pure dark
- `#22c55e` green accent — payments, success states
- `#a78bfa` purple accent — agent activity, Web3 elements
- DM Mono (monospace) + Syne (headings)
- Chaos-casing on h1/h2 headings
- Crosshair cursor
- Zero rounded corners on cards — sharp edges only

---

## Bounties targeted

| Track | Sponsor | Prize |
|---|---|---|
| Best Agent on Celo | Celo | up to $3,000 |
| Future of Commerce | Slice | up to $550 credits |
| ENS Identity | ENS | up to $1,100 |
| ENS Communication | ENS | up to $1,100 |
| ENS Open Integration | ENS | up to $1,100 |
| Synthesis Open Track | Community | variable |

---

## Repo structure

```
sliceshop/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── auth/page.tsx               # ERC-8128 authentication flow
│   ├── create/page.tsx             # Store creator wizard
│   ├── store/[ensName]/page.tsx    # Public storefront
│   ├── dashboard/page.tsx          # Redirects to demo store
│   ├── dashboard/[ensName]/page.tsx # Owner dashboard
│   └── api/
│       ├── auth/erc8128/route.ts   # ERC-8128 signature verification
│       └── agent/
│           ├── x402/route.ts       # x402 payment gate
│           └── process/route.ts    # Order agent activity + confirmation
├── hooks/
│   ├── useCeloPayment.ts           # cUSD payment hook
│   ├── useENS.ts                   # ENS resolution hook
│   ├── useERC8128.ts               # ERC-8128 auth hook
│   ├── useOrders.ts                # Order management hook
│   └── useStore.ts                 # Store state hook
└── lib/
    ├── celo.ts                     # Celo chain config + wagmi setup
    ├── ens.ts                      # ENS utilities
    ├── erc8128.ts                  # ERC-8128 message generation + serialization
    ├── x402.ts                     # x402 payment header parsing + verification
    ├── agent.ts                    # Autonomous order agent logic
    ├── web3-config.ts              # wagmi + ConnectKit config
    └── mock-data.ts                # Demo data for preview
```

---

## Run locally

```bash
git clone https://github.com/godin-001/SliceShop
cd SliceShop
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Built during The Synthesis Hackathon

Full stack in one focused session — ERC-8128 auth, x402 payment protocol, Celo payments, ENS identity, autonomous agent, deployed on Vercel. Zero TypeScript errors.

---

Made with ⚡ by Jennifer Gabriela + Gabs
