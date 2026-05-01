#!/usr/bin/env bash
# seed-testnet.sh — Fund test accounts and create sample escrows on testnet.
set -euo pipefail

: "${ESCROW_VAULT_CONTRACT_ID:?required}"
: "${SECRET_KEY:?required}"

echo "==> Funding test accounts via Friendbot..."
# TODO: curl "https://friendbot.stellar.org?addr=<DEPOSITOR_PUBLIC_KEY>"
# TODO: curl "https://friendbot.stellar.org?addr=<BENEFICIARY_PUBLIC_KEY>"

echo "==> Creating sample escrow..."
# TODO: ./scripts/invoke-escrow.sh create_escrow \
#         --depositor <DEPOSITOR> --beneficiary <BENEFICIARY> \
#         --amount 1000000000 --asset native

echo "==> Seed complete."
