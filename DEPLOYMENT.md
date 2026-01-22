sdfsdf# PolyDropBox — Deployment Guide

This guide covers deploying PolyDropBox to production.

---

## Prerequisites

Before deploying, ensure you have:

- [ ] **MongoDB** — MongoDB Atlas (recommended) or self-hosted
- [ ] **Pinata** — IPFS pinning service account
- [ ] **Wallet** — Polygon Amoy testnet MATIC for gas (or mainnet for production)
- [ ] **Deployed contracts** — PolyDropBox and MockUSDC on Polygon
- [ ] **SideShift** — API secret for cross-chain payments (optional)

---

## Build & Test Locally

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run build
npm run start
```

Visit `http://localhost:3000` and verify upload, payment, and download flows.

---

## Deploy to Vercel

### 1. Connect Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js via `vercel.json`

### 2. Configure Project

- **Root Directory**: `frontend` (set in vercel.json)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 3. Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Yes | PolyDropBox contract address |
| `NEXT_PUBLIC_USDC_ADDRESS` | Yes | MockUSDC/USDC contract address |
| `PRIVATE_KEY` | Yes | Wallet private key (for blockchain tx) |
| `NEXT_PUBLIC_POLYGON_AMOY_RPC` | Yes | Polygon RPC URL |
| `PINATA_API_KEY` | Yes | Pinata API key |
| `PINATA_SECRET_KEY` | Yes | Pinata secret key |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `NEXT_PUBLIC_FRONTEND_URL` | Yes | Your app URL (e.g. https://polydropbox.vercel.app) |
| `SIDESHIFT_SECRET` | Optional | SideShift API secret |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Optional | WalletConnect project ID |

### 4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

---

## Deploy with Docker

### Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
```

Build and run:

```bash
cd frontend
docker build -t polydropbox .
docker run -p 3000:3000 --env-file .env.local polydropbox
```

For a smaller image with `output: 'standalone'` in next.config.js, see [Next.js standalone output](https://nextjs.org/docs/advanced-features/output-file-tracing).

---

## Deploy to Other Platforms

### Railway / Render / Fly.io

1. Set root directory to `frontend`
2. Use `npm run build` and `npm run start`
3. Configure all environment variables from `.env.example`

### Netlify

Netlify supports Next.js via the Next.js runtime. Set:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/.next`

---

## Post-Deployment Checklist

- [ ] Set `NEXT_PUBLIC_FRONTEND_URL` to your production URL
- [ ] Verify MongoDB is accessible from the deployment region
- [ ] Test upload flow (file → IPFS → contract)
- [ ] Test payment flow (Polygon USDC + SideShift)
- [ ] Test download flow (access check → decrypt → serve)
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS (usually automatic on Vercel/Railway)

---

## Troubleshooting

### Build fails with "Module not found"

- Ensure `sharp` and `pdf-lib` are in `dependencies` (not devDependencies)
- Run `npm install` before build

### MongoDB connection timeout

- Whitelist deployment IP/host in MongoDB Atlas (Network Access)
- Or use `0.0.0.0/0` for development (not recommended for production)

### Blockchain transactions fail

- Ensure `PRIVATE_KEY` has MATIC for gas
- Verify contract addresses are correct for your network
- Check RPC URL is reachable

---

**Built with ❤️ using Polygon, SideShift, IPFS, and Next.js**
