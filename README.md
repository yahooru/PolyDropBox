# 🚀 PolyDropBox

**Decentralized File Sharing Platform with Cross-Chain Payments on Polygon**

PolyDropBox is a revolutionary decentralized file-sharing application that combines blockchain technology, IPFS storage, and cross-chain payment capabilities to create a secure, transparent, and accessible file-sharing ecosystem.

 


## 📖 What is PolyDropBox?

PolyDropBox is a **decentralized file-sharing platform** that allows users to upload, share, and monetize files with complete control over access permissions. Unlike traditional file-sharing services, PolyDropBox leverages:

- **Blockchain Technology (Polygon)** - For transparent, immutable access control and payment verification
- **IPFS (InterPlanetary File System)** - For decentralized, censorship-resistant file storage
- **SideShift API** - For accepting payments in any cryptocurrency, automatically converted to USDC on Polygon
- **Smart Contracts** - For automated access control, payment processing, and download tracking

---

## 📋 See [CHANGELOG.md](CHANGELOG.md) for full update history for the wave 5

**Latest updates include:**
- File Preview (PDF first page, blurred images) before payment
- Multi-file upload (up to 10 files)
- Password-protected share links
- Expiring share links
- Download audit logs with transaction hashes

---

## 🎯 What Does PolyDropBox Do?

### For Content Creators:
1. **Upload Files Securely** - Encrypt and store files on IPFS with blockchain-based access control
2. **Set Access Rules** - Configure pricing, expiry times, download limits, and burn-after-download options
3. **Accept Payments** - Receive payments in USDC on Polygon or any cryptocurrency via SideShift
4. **Track Performance** - Monitor downloads, payments, and file analytics through the dashboard
5. **Share Links** - Generate shareable links with blockchain-enforced access control

### For File Accessors:
1. **Access Files** - Use shareable links to access files
2. **Pay Securely** - Pay directly with USDC on Polygon or use any cryptocurrency (BTC, ETH, SOL, BNB, LTC, etc.) via SideShift
3. **Download Files** - Download files after payment verification on the blockchain
4. **Verify Access** - All access permissions are recorded on-chain for transparency

---

## 🔧 How PolyDropBox Works

### Architecture Overview

```
┌─────────────────┐
│   User Uploads  │
│      File       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│  AES-256 Encrypt│────▶│  IPFS/Pinata │
│      File       │     │   Storage    │
└────────┬────────┘     └──────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│  Polygon Smart  │────▶│  Blockchain  │
│    Contract     │     │   Record     │
└────────┬────────┘     └──────────────┘
         │
         ▼
┌─────────────────┐
│  Generate Share │
│      Link       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│  User Pays via  │────▶│  SideShift   │
│  Polygon/Side   │     │  (Optional)   │
│     Shift       │     └──────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Access Granted │
│  & Download     │
└─────────────────┘
```

### Step-by-Step Flow

1. **File Upload**
   - User selects a file and sets access rules (price, expiry, download limits)
   - File is encrypted with AES-256 encryption
   - Encrypted file is uploaded to IPFS via Pinata
   - File metadata and access rules are recorded on Polygon smart contract

2. **Share Link Generation**
   - System generates a unique shareable link
   - Link contains file ID and access control parameters
   - Access permissions are enforced by the smart contract

3. **Payment Processing**
   - **Direct Polygon Payment**: User pays USDC directly on Polygon
   - **Cross-Chain Payment**: User pays with any cryptocurrency via SideShift
     - SideShift converts payment to USDC on Polygon
     - Payment is automatically recorded on the blockchain

4. **File Access**
   - Smart contract verifies payment and access permissions
   - Encrypted file is retrieved from IPFS
   - File is decrypted and downloaded by the user
   - Download is recorded on-chain

---

## ⛓️ How PolyDropBox Uses Polygon Blockchain

### Smart Contract Integration

PolyDropBox uses **Polygon Amoy Testnet** (compatible with Ethereum) for:

1. **Access Control**
   - File metadata stored on-chain (IPFS hash, creator, price, expiry, limits)
   - Payment verification through smart contract functions
   - Download tracking and access history

2. **Payment Processing**
   - USDC payments processed directly on Polygon
   - Payment records stored immutably on the blockchain
   - Automatic access grant after payment verification

3. **Transparency & Security**
   - All transactions are publicly verifiable on PolygonScan
   - No centralized authority controls access
   - Smart contract code is open and auditable

### Smart Contract Functions

- `createFile()` - Record file metadata on-chain
- `payForAccess()` - Process USDC payments and grant access
- `hasAccess()` - Check if a user has access to a file
- `recordCrossChainPayment()` - Record SideShift payments on-chain
- `recordDownload()` - Track file downloads

### Deployed Contracts

- **PolyDropBox Contract**: `0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938`
- **MockUSDC Contract**: `0xC2266E725B5f2d657ba76D992630968272bb5ebc`

[View on PolygonScan Amoy](https://amoy.polygonscan.com/address/0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938)

---

## 🔄 How PolyDropBox Uses SideShift API

### What is SideShift?

SideShift is a **non-custodial cryptocurrency exchange** that enables instant swaps between different cryptocurrencies and blockchains without requiring users to create accounts or provide KYC.

### SideShift Integration in PolyDropBox

PolyDropBox integrates SideShift to allow users to pay for file access using **any cryptocurrency**, which is then automatically converted to USDC on Polygon.

### SideShift API Flow

#### 1. Get Quote (`POST /v2/quotes`)

When a user wants to pay with a non-Polygon cryptocurrency:

```javascript
// Request
POST https://api.sideshift.ai/v2/quotes
{
  "depositMethodId": "btc",           // Input cryptocurrency
  "settleMethodId": "usdc-polygon",   // Output: USDC on Polygon
  "depositAmount": "0.001"            // Amount to deposit
}

// Response
{
  "id": "quote-id",
  "depositAmount": "0.001",
  "settleAmount": "10.5",
  "rate": "10500",
  "expiresAt": "2024-01-01T00:00:00Z"
}
```

#### 2. Create Fixed Shift (`POST /v2/shifts/fixed`)

After getting a quote, create the actual swap:

```javascript
// Request
POST https://api.sideshift.ai/v2/shifts/fixed
{
  "quoteId": "quote-id",
  "depositMethodId": "btc",
  "settleMethodId": "usdc-polygon",
  "settleAddress": "0x..."  // Polygon address to receive USDC
}

// Response
{
  "id": "shift-id",
  "depositAddress": "bc1q...",  // BTC address to send payment
  "depositAmount": "0.001",
  "settleAmount": "10.5",
  "status": "pending"
}
```

#### 3. Check Status (`GET /v2/shifts/{id}`)

Poll the status until payment is complete:

```javascript
// Request
GET https://api.sideshift.ai/v2/shifts/{shift-id}

// Response (when complete)
{
  "id": "shift-id",
  "status": "complete",
  "depositAmount": "0.001",
  "settleAmount": "10.5",
  "settleTxHash": "0x..."  // Polygon transaction hash
}
```

#### 4. Record Payment on Blockchain

Once SideShift confirms the payment, PolyDropBox:
- Records the payment on the Polygon smart contract
- Grants access to the file
- Updates the payment status in the database

### Supported Cryptocurrencies

PolyDropBox supports payments via SideShift in:
- **Bitcoin (BTC)**
- **Ethereum (ETH)**
- **Solana (SOL)**
- **Binance Coin (BNB)**
- **Litecoin (LTC)**
- **And 100+ other cryptocurrencies**

All payments are automatically converted to **USDC on Polygon**.

---

## ✨ Key Features

### 🔐 Security
- **AES-256 Encryption** - Military-grade file encryption
- **IPFS Storage** - Decentralized, censorship-resistant storage
- **Blockchain Verification** - All access permissions verified on-chain

### 💸 Payment Options
- **Direct USDC Payment** - Pay directly on Polygon
- **Cross-Chain Payments** - Pay with any cryptocurrency via SideShift
- **Automatic Conversion** - All payments converted to USDC on Polygon

### ⏰ Access Control
- **Expiry Times** - Set time limits for file access
- **Download Limits** - Control maximum number of downloads
- **Burn After Download** - Files can be deleted after first download
- **NFT Gating** - (Future feature) Restrict access to NFT holders

### 📊 Analytics
- **Download Tracking** - Monitor file downloads
- **Payment History** - Track all payments received
- **Performance Metrics** - Analyze file performance

### 🤖 AI Features
- **Smart Pricing** - AI-suggested pricing based on file type and size
- **File Analysis** - Automatic file type detection and categorization
- **Access Recommendations** - Intelligent suggestions for access rules

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud)
- MetaMask or compatible Web3 wallet
- Polygon Amoy testnet MATIC (for gas fees)
- Pinata account (for IPFS storage)
- SideShift API key (optional, for enhanced features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Polydropbox
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Setup environment variables**

   Create `frontend/.env.local`:
   ```env
   # Deployed Contracts
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x570c2d5Eda88e64dC13eBB2e062C00F799dD6938
   NEXT_PUBLIC_USDC_ADDRESS=0xC2266E725B5f2d657ba76D992630968272bb5ebc

   # Blockchain
   PRIVATE_KEY=your_private_key_here
   NEXT_PUBLIC_POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology

   # IPFS (Pinata)
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key

   # Database
   MONGODB_URI=mongodb://localhost:27017/polydropbox

   # Optional
   SIDESHIFT_SECRET=your_sideshift_secret
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:3000
   - Connect your MetaMask wallet (Polygon Amoy network)
   - Start uploading and sharing files!

---

## 🚀 Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for full deployment instructions.

**Quick deploy to Vercel:**
1. Push to GitHub and import to Vercel
2. Set root directory to `frontend`
3. Add environment variables from `frontend/.env.example`
4. Deploy

---

## 🧪 Testing

### Test APIs

Run the PowerShell test scripts:

```powershell
# Test all APIs
.\test-all-apis.ps1

# Test Polygon integration
.\test-polygon-direct.ps1

# Test SideShift integration
.\test-sideshift-direct.ps1
```

### Manual API Testing

```bash
# Health check
curl http://localhost:3000/api/health

# Test SideShift quote
curl -X POST https://api.sideshift.ai/v2/quotes \
  -H "Content-Type: application/json" \
  -d '{"depositMethodId":"btc","settleMethodId":"usdc-polygon","depositAmount":"0.001"}'

# Test Polygon RPC
curl -X POST https://rpc-amoy.polygon.technology \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

---

## 📋 API Endpoints

All APIs are in `frontend/app/api/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check and service status |
| `/api/upload` | POST | Upload and encrypt file, store on IPFS |
| `/api/files?creator=0x...` | GET | List files uploaded by a creator |
| `/api/file/[fileId]` | GET | Get file metadata and access info |
| `/api/sideshift/create` | POST | Create SideShift order for cross-chain payment |
| `/api/sideshift/status/[orderId]` | GET | Check SideShift payment status |
| `/api/download` | POST | Download file (requires payment verification) |

---

## 🎯 Use Cases

### Content Creators
- **Sell Digital Products** - E-books, courses, software, music, videos
- **Premium Content Access** - Exclusive content behind paywall
- **Time-Limited Access** - Grant temporary access to files
- **One-Time Downloads** - Burn-after-download for sensitive files

### Businesses
- **Secure File Sharing** - Share confidential documents with clients
- **Payment-Gated Content** - Monetize premium content
- **Access Control** - Blockchain-enforced access permissions
- **Audit Trail** - Transparent download and payment records

### Developers
- **API Documentation** - Share API docs with payment gating
- **Software Distribution** - Distribute software with access control
- **Beta Access** - Grant limited-time access to beta products

---

## 🏗️ Project Structure

```
polydropbox/
├── contracts/              # Smart contracts (Solidity)
│   ├── PolyDropBox.sol     # Main contract
│   └── MockUSDC.sol        # Test USDC token
├── frontend/               # Next.js application
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── upload/     # File upload endpoint
│   │   │   ├── download/   # File download endpoint
│   │   │   ├── files/      # File listing endpoint
│   │   │   ├── file/       # File details endpoint
│   │   │   ├── sideshift/  # SideShift integration
│   │   │   └── health/     # Health check
│   │   ├── page.tsx        # Homepage
│   │   ├── upload/         # Upload page
│   │   ├── file/           # File access page
│   │   └── dashboard/      # Creator dashboard
│   ├── components/         # React components
│   └── package.json
├── scripts/                 # Deployment scripts
│   └── deploy.js           # Contract deployment
├── test-*.ps1              # API test scripts
└── README.md
```

---

## 🔒 Security Features

- **End-to-End Encryption** - Files encrypted before upload
- **Blockchain Verification** - All access verified on-chain
- **Non-Custodial Payments** - SideShift handles swaps without custody
- **IPFS Storage** - Decentralized, no single point of failure
- **Smart Contract Security** - OpenZeppelin audited contracts

---

## 🌟 Future Enhancements

- [ ] NFT-gated file access
- [x] Multi-file uploads
- [x] File preview without download
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Subscription-based access
- [ ] Social sharing features
- [ ] Referral program

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
 

**Everything is working!** 🎉

---

**Built with ❤️ using Polygon, SideShift, IPFS, and Next.js**
