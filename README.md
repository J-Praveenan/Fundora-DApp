# 🚀 Fundora - Cardano Crowdfunding DApp

<div align="center">

![Fundora Banner](https://img.shields.io/badge/Fundora-Cardano%20Crowdfunding-00D4AA?style=for-the-badge)

### 🌍 Decentralized Crowdfunding Powered by Cardano Blockchain

Fundora enables creators, startups, charities, and innovators to raise funds transparently through smart contracts on the Cardano blockchain.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Cardano](https://img.shields.io/badge/Cardano-Blockchain-blue?style=flat-square&logo=cardano)](https://cardano.org/)
[![MeshJS](https://img.shields.io/badge/MeshJS-Web3-green?style=flat-square)](https://meshjs.dev/)
[![Aiken](https://img.shields.io/badge/Aiken-Smart%20Contracts-purple?style=flat-square)](https://aiken-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)

</div>

---

## ✨ Features

### 🎯 Campaign Management

- ✅ Create crowdfunding campaigns
- ✅ Set funding goals
- ✅ Configure campaign deadlines
- ✅ Upload campaign images
- ✅ View campaign details
- ✅ Track fundraising progress

### 💰 Decentralized Contributions

- ✅ Contribute ADA securely
- ✅ Transparent on-chain transactions
- ✅ Real-time funding updates
- ✅ Smart contract secured funds
- ✅ No intermediaries

### 🏦 Fund Withdrawal

- ✅ Campaign creators can withdraw funds
- ✅ Withdrawal only after successful fundraising
- ✅ Smart contract validation
- ✅ Secure transaction execution

### 🔍 Transparency

- ✅ View campaign contributors
- ✅ On-chain verification
- ✅ Immutable campaign records
- ✅ Public blockchain proof

### 👛 Wallet Integration

- ✅ Lace Wallet
- ✅ Eternl Wallet
- ✅ Nami Wallet
- ✅ MeshJS Wallet Support

---

# 🏗️ Architecture

```text
┌─────────────────────┐
│     Next.js UI      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      MeshJS         │
│ Wallet Integration  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Aiken Validator    │
│ Smart Contract      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Cardano Blockchain  │
└─────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- ⚛️ Next.js 15
- 🎨 Tailwind CSS
- 🎭 Framer Motion
- 🔷 TypeScript
- 🧩 Lucide Icons

## Blockchain

- 🔵 Cardano
- 🟣 Aiken Smart Contracts
- 🟢 MeshJS
- 🟠 Blockfrost API

## Wallets

- 👛 Lace
- 👛 Eternl
- 👛 Nami

---


# ⚙️ Smart Contract Logic

## Create Campaign

```aiken
Campaign Creator
        │
        ▼
Lock Campaign UTxO
        │
        ▼
Store Campaign Datum
```

---

## Contribute

```aiken
Contributor
      │
      ▼
Spend Campaign UTxO
      │
      ▼
Update Raised Amount
      │
      ▼
Create New Campaign UTxO
```

---

## Withdraw

```aiken
Campaign Successful
         │
         ▼
Deadline Passed
         │
         ▼
Creator Withdraws Funds
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/J-Praveenan/Fundora-DApp.git
cd ui
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create:

```bash
.env.local
```

```env
NEXT_PUBLIC_BLOCKFROST_API_KEY=YOUR_BLOCKFROST_KEY
PINATA_JWT=YOUR_PINATA_JWT
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs
```

---

## Start Development Server

```bash
npm run dev
```

Application:

```bash
http://localhost:3000
```

---

# 🧪 Smart Contract Deployment

Compile Aiken Contract:

```bash
aiken build
```

Generate:

```bash
plutus.json
```

Update:

```ts
src/config/contract.ts
```

with generated script.

---

# 🔐 Security

Fundora uses:

- Smart contract controlled funds
- On-chain validation
- Wallet signature verification
- Immutable Cardano UTxO model
- Transparent transaction records

---

# 🌟 Key Benefits

### For Creators

- Raise funds globally
- Transparent fundraising
- No centralized platform control

### For Contributors

- Fully auditable campaigns
- Secure blockchain transactions
- Transparent fund allocation

### For Communities

- Decentralized crowdfunding
- Open participation
- Trustless funding ecosystem

---

# 📈 Future Improvements

- 📱 Mobile Optimized DApp
- 🏆 Campaign Categories
- 📊 Analytics Dashboard
- 💬 Campaign Updates
- 🏅 NFT Rewards for Contributors
- 🔔 Notifications
- 🌍 Multi-language Support

---


<div align="center">

### 💙 Built with Aiken, MeshJS and Cardano

**Funding Ideas. Empowering Communities. Decentralized Forever.**

⭐ If you like this project, consider giving it a star!

</div>
