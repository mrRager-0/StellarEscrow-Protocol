/**
 * Integration tests — require a running local Stellar node (Quickstart).
 *
 * PSEUDO test plan:
 *   1. Deploy escrow-vault to local network
 *   2. create_escrow → assert Funded status
 *   3. release → assert Released status + beneficiary balance increased
 *   4. create_escrow → dispute → resolve via arbiter → assert Resolved
 *   5. create_escrow with timelock → attempt early release → assert failure
 *      → advance ledger past timelock → release → assert Released
 */

import { EscrowClient } from "../../sdk/src";

describe("EscrowVault integration", () => {
  let client: EscrowClient;

  beforeAll(() => {
    // TODO: deploy contracts to local network, populate env vars
    client = new EscrowClient({
      rpcUrl: process.env.SOROBAN_RPC_URL!,
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE!,
      vaultContractId: process.env.ESCROW_VAULT_CONTRACT_ID!,
    });
  });

  test.todo("create escrow → status is Funded");
  test.todo("release escrow → status is Released, beneficiary receives funds");
  test.todo("dispute escrow → arbiter resolves → status is Resolved");
  test.todo("timelock: early release fails; release after expiry succeeds");
  test.todo("multisig: funds release only after threshold approvals");
});
