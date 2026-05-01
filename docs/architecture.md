# Architecture

## Three-Layer Design

```
Client Application
      │ TypeScript SDK
Off-chain Coordinator  (Node.js + PostgreSQL)
      │ Soroban RPC / Horizon API
Soroban Smart Contracts  (escrow-vault · arbiter · oracle-adapter · multisig-escrow)
      Stellar Network
```

## Contract Interactions

- **escrow-vault** — core fund locking; calls oracle-adapter for condition checks; emits lifecycle events
- **arbiter** — receives dispute signals; cross-calls vault to release or refund
- **oracle-adapter** — stores relayer-submitted confirmations; queried by vault conditions evaluator
- **multisig-escrow** — standalone M-of-N variant; auto-releases when approval threshold is reached

## Off-chain Coordinator

The Node.js backend polls Soroban events via Horizon, caches escrow state in PostgreSQL, and exposes a REST API for frontends. It does not hold funds or signing keys for production escrows.

## Data Flow: Happy Path

1. Depositor calls `EscrowClient.createEscrow()` → SDK builds and submits tx → vault stores state, emits `funded`
2. Horizon listener picks up `funded` event → backend upserts DB record
3. Conditions are met (timelock expires / oracle confirms)
4. Beneficiary (or backend automation) calls `release()` → vault transfers funds, emits `released`
5. Horizon listener updates DB status to `Released`

## Data Flow: Dispute Path

1. Party calls `dispute()` → vault status → `Disputed`, emits `disputed`
2. Arbiter reviews off-chain evidence
3. Arbiter calls `arbiter.resolve(escrow_id, release_to_beneficiary)` → arbiter cross-calls vault
4. Vault transfers funds to winner, emits `resolved`

<!-- TODO: add sequence diagrams -->
