
# 🔐 StellarEscrow Protocol

> **Programmable, trustless escrow infrastructure for the Stellar blockchain — powered by Soroban smart contracts.**

[![Build Status](https://img.shields.io/github/actions/workflow/status/stellar-oss/stellar-escrow-protocol/ci.yml?branch=main&style=flat-square&logo=github)](https://github.com/stellar-oss/stellar-escrow-protocol/actions)
[![Soroban](https://img.shields.io/badge/Soroban-Smart%20Contracts-blueviolet?style=flat-square&logo=stellar)](https://soroban.stellar.org)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/github/v/release/stellar-oss/stellar-escrow-protocol?style=flat-square)](https://github.com/stellar-oss/stellar-escrow-protocol/releases)
[![Coverage](https://img.shields.io/codecov/c/github/stellar-oss/stellar-escrow-protocol?style=flat-square)](https://codecov.io/gh/stellar-oss/stellar-escrow-protocol)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-orange?style=flat-square)]()

---

## 📖 Overview

**StellarEscrow Protocol** is a modular, open-source escrow engine built on Soroban — Stellar's smart contract platform. It enables developers to embed conditional payment logic directly into any Stellar-based application, eliminating the need for trusted intermediaries while preserving full auditability on-chain.

From freelance marketplaces to cross-border trade finance, StellarEscrow provides a composable suite of Soroban contracts that handle fund locking, multi-party approval workflows, dispute arbitration, and automated release — all governed by programmable conditions expressed in Rust.

---

## ✨ Key Features

- 🔒 **Trustless Fund Locking** — Lock XLM or any Stellar asset into a Soroban escrow vault with cryptographic guarantees
- 🔀 **Multi-Condition Release** — Support for time-locks, oracle-based triggers, multi-sig approvals, and hash-preimage conditions
- ⚖️ **On-Chain Dispute Arbitration** — Built-in arbitrator role with configurable resolution windows and appeal flows
- 🧩 **Composable Contract Architecture** — Modular contract design; deploy only what you need (vault, arbiter, oracle adapter)
- 🌐 **SEP-6 / SEP-24 Compatible** — Integrates seamlessly with Stellar anchor deposit/withdrawal flows
- 📡 **Event Streaming** — Full Soroban event emission for escrow lifecycle stages (funded, released, disputed, resolved)
- 🔑 **Multi-Party Support** — Supports 2-of-3 and M-of-N signer configurations for enterprise workflows
- 🧪 **Battle-tested** — Comprehensive test suite with fuzzing coverage via `cargo-fuzz`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Rust · Soroban SDK |
| Contract Testing | Soroban Test Harness · `cargo test` · `cargo-fuzz` |
| Frontend SDK | TypeScript · `@stellar/stellar-sdk` |
| CLI Tooling | Rust · `stellar-cli` |
| Off-chain Backend | Node.js · Express · PostgreSQL |
| Event Indexing | Horizon API · Custom Soroban Event Listener |
| CI/CD | GitHub Actions |
| Deployment | Stellar Testnet · Mainnet via `stellar contract deploy` |

---

## 🗂 Project Structure

```
stellar-escrow-protocol/
│
├── contracts/                      # Soroban smart contracts (Rust)
│   ├── escrow-vault/               # Core fund locking & release logic
│   │   ├── src/
│   │   │   ├── lib.rs              # Contract entry points
│   │   │   ├── storage.rs          # Persistent state management
│   │   │   ├── conditions.rs       # Release condition evaluators
│   │   │   └── events.rs           # Event emission definitions
│   │   └── Cargo.toml
│   ├── arbiter/                    # Dispute arbitration contract
│   │   └── src/lib.rs
│   ├── oracle-adapter/             # External oracle data bridge
│   │   └── src/lib.rs
│   └── multisig-escrow/            # M-of-N signer escrow variant
│       └── src/lib.rs
│
├── sdk/                            # TypeScript client SDK
│   ├── src/
│   │   ├── EscrowClient.ts         # Main SDK entry point
│   │   ├── types.ts                # Shared TypeScript types
│   │   └── utils/                  # Encoding, keypair helpers
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                        # Off-chain escrow coordinator service
│   ├── src/
│   │   ├── api/                    # REST API routes
│   │   ├── services/               # Escrow state sync, Horizon listener
│   │   ├── db/                     # PostgreSQL migrations & models
│   │   └── index.ts
│   └── package.json
│
├── scripts/                        # Deployment & management scripts
│   ├── deploy.sh                   # Contract deployment script
│   ├── invoke-escrow.sh            # Manual contract invocation
│   └── seed-testnet.sh             # Testnet seed helpers
│
├── tests/                          # Integration & fuzz tests
│   ├── integration/
│   └── fuzz/
│
├── docs/                           # Extended documentation
│   ├── architecture.md
│   ├── contract-api.md
│   └── sdk-reference.md
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
│
├── Cargo.toml                      # Workspace manifest
├── Cargo.lock
├── .env.example
└── README.md
```

---

## 🏗 Architecture Overview

StellarEscrow Protocol follows a **three-layer architecture**:

```
┌─────────────────────────────────────┐
│         Client Application          │  ← dApp / Marketplace / API consumer
└────────────────┬────────────────────┘
                 │ TypeScript SDK
┌────────────────▼────────────────────┐
│        Off-chain Coordinator        │  ← Node.js backend (state sync, events)
│     (backend/ + Horizon listener)   │
└────────────────┬────────────────────┘
                 │ Soroban RPC / Horizon API
┌────────────────▼────────────────────┐
│       Soroban Smart Contracts       │  ← On-chain trustless logic
│  [vault] [arbiter] [oracle-adapter] │
└─────────────────────────────────────┘
                Stellar Network
```

- **Escrow Vault Contract** — Holds assets; evaluates release conditions atomically on-chain
- **Arbiter Contract** — Receives dispute signals and emits resolution instructions back to the vault
- **Oracle Adapter** — Bridges off-chain data (price feeds, delivery proofs) into Soroban via cross-contract calls
- **Off-chain Coordinator** — Listens to Soroban events via Horizon, syncs state to PostgreSQL, and surfaces REST APIs for frontends

---

## 🔗 Inter-Project Dependencies

| Dependency | Type | Repository | Notes |
|---|---|---|---|
| `SEPStack` | Internal | `stellar-oss/sepstack` | Used for SEP-6/SEP-24 anchor interop in release flows |
| `AnchorHub` | Internal | `stellar-oss/anchorhub` | Escrow release can trigger anchor withdrawal |
| `Soroban Starter Kit` | Internal | `stellar-oss/soroban-starter-kit` | Contract scaffolding & shared macros |
| `@stellar/stellar-sdk` | External | npm | Horizon & Soroban RPC client |
| `stellar-cli` | External | Stellar Dev Tools | Contract deployment & invocation |

---

## ✅ Prerequisites

- **Rust** `>= 1.76` with `wasm32-unknown-unknown` target
- **stellar-cli** `>= 20.x` — [Install guide](https://developers.stellar.org/docs/tools/developer-tools/cli/install-cli)
- **Node.js** `>= 20.x` and `pnpm >= 9.x`
- **PostgreSQL** `>= 15`
- **Docker** (optional, for local Stellar network via Quickstart)

```bash
# Install Rust WASM target
rustup target add wasm32-unknown-unknown

# Install stellar-cli
cargo install --locked stellar-cli --features opt

# Verify
stellar --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/stellar-oss/stellar-escrow-protocol.git
cd stellar-escrow-protocol
```

### 2. Install Dependencies

```bash
# Rust workspace deps (contracts)
cargo build

# TypeScript SDK & backend
pnpm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment Variables](#environment-variables) below).

### 4. Start Local Stellar Network (Optional)

```bash
docker run --rm -it \
  -p 8000:8000 \
  --name stellar \
  stellar/quickstart:latest \
  --testnet \
  --enable-soroban-rpc
```

### 5. Deploy Contracts to Testnet

```bash
./scripts/deploy.sh --network testnet
```

### 6. Start the Off-chain Backend

```bash
pnpm --filter backend run dev
```

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `STELLAR_NETWORK` | ✅ | `testnet` | Target network (`testnet` / `mainnet`) |
| `SOROBAN_RPC_URL` | ✅ | — | Soroban RPC endpoint URL |
| `HORIZON_URL` | ✅ | — | Horizon API base URL |
| `SECRET_KEY` | ✅ | — | Stellar keypair secret for contract deployment |
| `DATABASE_URL` | ✅ | — | PostgreSQL connection string |
| `ESCROW_VAULT_CONTRACT_ID` | ✅ | — | Deployed escrow vault contract address |
| `ARBITER_CONTRACT_ID` | ⬜ | — | Deployed arbiter contract address (optional) |
| `ORACLE_ADAPTER_CONTRACT_ID` | ⬜ | — | Oracle adapter contract address (optional) |
| `BACKEND_PORT` | ⬜ | `3001` | Port for the coordinator REST API |
| `LOG_LEVEL` | ⬜ | `info` | Logging verbosity (`debug`/`info`/`warn`/`error`) |

> ⚠️ **Security Note:** Never commit `.env` to version control. Use secret management (e.g., Doppler, AWS Secrets Manager) for production deployments.

---

## ▶️ Running the Project

### Development

```bash
# Run backend in dev mode (hot reload)
pnpm --filter backend run dev

# Run SDK tests in watch mode
pnpm --filter sdk run test:watch
```

### Production

```bash
# Build SDK
pnpm --filter sdk run build

# Build & start backend
pnpm --filter backend run build
pnpm --filter backend run start
```

### Contract Interaction

```bash
# Invoke escrow creation
stellar contract invoke \
  --id $ESCROW_VAULT_CONTRACT_ID \
  --network testnet \
  -- create_escrow \
  --depositor GABC...XYZ \
  --beneficiary GDEF...UVW \
  --amount 1000000000 \
  --asset native
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `build:contracts` | `cargo build --release --target wasm32-unknown-unknown` | Compile Soroban WASM contracts |
| `test:contracts` | `cargo test` | Run contract unit tests |
| `fuzz` | `cargo +nightly fuzz run escrow_fuzz` | Run fuzz tests |
| `sdk:build` | `pnpm --filter sdk run build` | Compile TypeScript SDK |
| `sdk:test` | `pnpm --filter sdk run test` | Run SDK tests (Jest) |
| `backend:dev` | `pnpm --filter backend run dev` | Start backend in dev mode |
| `backend:build` | `pnpm --filter backend run build` | Build backend for production |
| `deploy:testnet` | `./scripts/deploy.sh --network testnet` | Deploy all contracts to testnet |
| `deploy:mainnet` | `./scripts/deploy.sh --network mainnet` | Deploy all contracts to mainnet |
| `db:migrate` | `pnpm --filter backend run db:migrate` | Run PostgreSQL migrations |
| `lint` | `pnpm run lint` | Run ESLint + `cargo clippy` |

---

## 🧪 Testing

### Contract Tests

```bash
# Unit tests for all contracts
cargo test

# Test a specific contract
cargo test -p escrow-vault

# Run with verbose output
cargo test -- --nocapture
```

### Fuzz Testing

```bash
cargo +nightly fuzz run escrow_fuzz -- -max_total_time=60
```

### SDK & Backend Tests

```bash
# All TypeScript tests
pnpm run test

# Coverage report
pnpm run test:coverage
```

### Integration Tests (requires local Stellar node)

```bash
pnpm run test:integration
```

> Coverage reports are published automatically to Codecov on each PR merge.

---

## 🚢 Deployment

### Testnet Deployment

```bash
# Automated via script
./scripts/deploy.sh --network testnet --signer $SECRET_KEY
```

### Mainnet Deployment

```bash
# Requires production keypair with sufficient XLM for fees
./scripts/deploy.sh --network mainnet --signer $MAINNET_SECRET_KEY
```

> ⚠️ Perform a full audit before mainnet deployment. See `docs/security-checklist.md`.

### Backend (Docker)

```bash
docker build -t stellar-escrow-backend ./backend
docker run -d \
  --env-file .env \
  -p 3001:3001 \
  stellar-escrow-backend
```

### Backend (Kubernetes)

Helm chart available at `deploy/helm/`. See `docs/kubernetes-deployment.md` for full instructions.

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting pull requests.

### Steps to Contribute

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add oracle adapter for Pyth'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

We follow [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.

> All contributors must agree to our [Contributor License Agreement (CLA)](CLA.md).

---

## 📋 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this standard. Please report unacceptable behavior to **conduct@stellar-oss.dev**.

---

## 📄 License

Licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

> **Why Apache 2.0?** This license is ideal for open-source infrastructure and protocol layers. It provides a strong patent grant (critical for blockchain projects), is compatible with most downstream licenses, and is widely accepted in the enterprise and developer communities.

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org) — for Soroban and the broader ecosystem
- [Soroban Examples](https://github.com/stellar/soroban-examples) — reference contract implementations
- [OpenZeppelin](https://openzeppelin.com) — inspiration for modular contract design patterns

---

## 🗺 Roadmap

- [ ] **v1.0** — Stable vault + arbiter contracts, full audit report
- [ ] **v1.1** — Oracle adapter for Pyth and Reflector price feeds
- [ ] **v1.2** — Subscription escrow (recurring payments)
- [ ] **v1.3** — DAO-governed arbitration module
- [ ] **v2.0** — Cross-chain escrow bridge (Stellar ↔ EVM via Axelar)

See [ROADMAP.md](ROADMAP.md) for the full backlog.

---

## 📝 Changelog

All notable changes to this project are documented in [CHANGELOG.md](CHANGELOG.md).

---

## 💬 Support & Contact

- 📚 **Docs:** [docs.stellar-escrow.dev](https://docs.stellar-escrow.dev)
- 💬 **Discord:** [discord.gg/stellar-oss](https://discord.gg/stellar-oss)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/stellar-oss/stellar-escrow-protocol/issues)
- 📧 **Security Vulnerabilities:** security@stellar-oss.dev *(do not open public issues for security bugs)*
