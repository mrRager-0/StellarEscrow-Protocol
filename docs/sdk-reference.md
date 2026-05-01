# SDK Reference

## Installation

```bash
pnpm add @stellar-escrow/sdk
```

## Quick Start

```typescript
import { EscrowClient } from "@stellar-escrow/sdk";

const client = new EscrowClient({
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
  vaultContractId: "C...",
});

// Create escrow
const id = await client.createEscrow({
  depositor: "G...",
  beneficiary: "G...",
  amount: 1_000_000_000n,  // 100 XLM in stroops
  asset: "native",
  conditions: { timelock: Math.floor(Date.now() / 1000) + 86400 }, // 24h
}, signerKeypair);

// Release
await client.release(id, signerKeypair);

// Read state
const state = await client.getEscrow(id);
console.log(state.status); // "Released"
```

## API

### `new EscrowClient(config: EscrowClientConfig)`

| Field | Type | Required | Description |
|---|---|---|---|
| `rpcUrl` | string | ✅ | Soroban RPC endpoint |
| `networkPassphrase` | string | ✅ | Stellar network passphrase |
| `vaultContractId` | string | ✅ | Deployed escrow-vault contract ID |
| `arbiterContractId` | string | ⬜ | Arbiter contract ID |
| `oracleContractId` | string | ⬜ | Oracle adapter contract ID |

### Methods

- `createEscrow(params, keypair): Promise<bigint>`
- `release(escrowId, keypair): Promise<void>`
- `refund(escrowId, keypair): Promise<void>`
- `dispute(escrowId, raiser): Promise<void>`
- `getEscrow(escrowId): Promise<EscrowState>`

<!-- TODO: add error handling section and ScVal encoding notes -->
