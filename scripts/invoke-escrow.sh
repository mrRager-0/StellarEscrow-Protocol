#!/usr/bin/env bash
# invoke-escrow.sh — Manually invoke escrow-vault contract functions.
# Usage: ./scripts/invoke-escrow.sh <function> [args...]
set -euo pipefail

FUNCTION="${1:-}"
[[ -z "$FUNCTION" ]] && { echo "Usage: $0 <function> [args...]"; exit 1; }

: "${ESCROW_VAULT_CONTRACT_ID:?ESCROW_VAULT_CONTRACT_ID env var required}"
: "${STELLAR_NETWORK:=testnet}"
: "${SECRET_KEY:?SECRET_KEY env var required}"

echo "==> Invoking $FUNCTION on $ESCROW_VAULT_CONTRACT_ID ($STELLAR_NETWORK)..."
# TODO: stellar contract invoke --id "$ESCROW_VAULT_CONTRACT_ID" --network "$STELLAR_NETWORK" \
#         --source "$SECRET_KEY" -- "$FUNCTION" "${@:2}"
echo "[stub] stellar contract invoke -- $FUNCTION ${*:2}"
