# Contract API Reference

## escrow-vault

| Function | Args | Returns | Description |
|---|---|---|---|
| `create_escrow` | depositor, beneficiary, amount, asset, conditions | `u64` escrow_id | Lock funds; emit `funded` |
| `release` | escrow_id | — | Release to beneficiary if conditions met |
| `refund` | escrow_id | — | Return funds to depositor |
| `dispute` | escrow_id, raiser | — | Mark escrow as disputed |
| `get_escrow` | escrow_id | `EscrowState` | Read current state |

### Conditions struct

```rust
pub struct Conditions {
    pub timelock: u64,           // Unix timestamp; 0 = disabled
    pub preimage_hash: Bytes,    // SHA-256 hash; empty = disabled
    pub oracle: Option<Address>, // oracle-adapter contract; None = disabled
}
```

## arbiter

| Function | Args | Returns | Description |
|---|---|---|---|
| `init` | admin, arbiter | — | Set authorized arbiter address |
| `open_dispute` | escrow_id, vault_contract | — | Record dispute |
| `resolve` | escrow_id, release_to_beneficiary | — | Trigger vault release or refund |

## oracle-adapter

| Function | Args | Returns | Description |
|---|---|---|---|
| `init` | admin, relayer | — | Set trusted relayer |
| `submit_confirmation` | escrow_id, confirmed | — | Relayer posts off-chain result |
| `is_confirmed` | escrow_id | `bool` | Queried by vault conditions |

## multisig-escrow

| Function | Args | Returns | Description |
|---|---|---|---|
| `create` | depositor, signers, threshold, beneficiary, amount, asset | `u64` | Create M-of-N escrow |
| `approve` | escrow_id, signer | — | Record approval; auto-release at threshold |

<!-- TODO: add ScVal encoding examples for each function -->
