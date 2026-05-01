#!/usr/bin/env bash
# deploy.sh — Build and deploy all Soroban contracts to the target network.
# Usage: ./scripts/deploy.sh --network testnet [--signer <SECRET_KEY>]
set -euo pipefail

NETWORK="testnet"
SIGNER="${SECRET_KEY:-}"

while [[ $# -gt 0 ]]; do
  case $1 in
    --network) NETWORK="$2"; shift 2 ;;
    --signer)  SIGNER="$2";  shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

[[ -z "$SIGNER" ]] && { echo "ERROR: --signer or SECRET_KEY env var required"; exit 1; }

echo "==> Building contracts (wasm32)..."
cargo build --release --target wasm32-unknown-unknown

CONTRACTS=(escrow-vault arbiter oracle-adapter multisig-escrow)

for CONTRACT in "${CONTRACTS[@]}"; do
  WASM="target/wasm32-unknown-unknown/release/${CONTRACT//-/_}.wasm"
  echo "==> Deploying $CONTRACT to $NETWORK..."
  # TODO: stellar contract deploy --wasm "$WASM" --network "$NETWORK" --source "$SIGNER"
  echo "    [stub] would deploy $WASM"
done

echo "==> Deployment complete. Update .env with the returned contract IDs."
