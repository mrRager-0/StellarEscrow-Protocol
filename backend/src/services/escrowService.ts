import { EscrowClient } from "../../../sdk/src/EscrowClient";
import { db } from "../db/client";
import type { CreateEscrowParams, EscrowState } from "../../../sdk/src/types";

/**
 * EscrowService — coordinates between the SDK (on-chain) and the PostgreSQL state cache.
 *
 * PSEUDO:
 *   createEscrow → call SDK → persist to DB → return id
 *   getEscrow    → query DB cache; fall back to on-chain read
 *   release      → call SDK → update DB status
 *   dispute      → call SDK → update DB status
 */
export class EscrowService {
  private client: EscrowClient;

  constructor() {
    this.client = new EscrowClient({
      rpcUrl: process.env.SOROBAN_RPC_URL!,
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE!,
      vaultContractId: process.env.ESCROW_VAULT_CONTRACT_ID!,
      arbiterContractId: process.env.ARBITER_CONTRACT_ID,
      oracleContractId: process.env.ORACLE_ADAPTER_CONTRACT_ID,
    });
  }

  async createEscrow(params: CreateEscrowParams): Promise<bigint> {
    // TODO: load signer keypair from env/secrets
    // TODO: call this.client.createEscrow(params, keypair)
    // TODO: insert record into db.escrows table
    throw new Error("not implemented");
  }

  async getEscrow(id: bigint): Promise<EscrowState> {
    // TODO: SELECT * FROM escrows WHERE id = $1
    // TODO: if not found, fall back to this.client.getEscrow(id)
    throw new Error("not implemented");
  }

  async release(id: bigint): Promise<void> {
    // TODO: this.client.release(id, keypair)
    // TODO: UPDATE escrows SET status = 'Released' WHERE id = $1
    throw new Error("not implemented");
  }

  async dispute(id: bigint, raiser: string): Promise<void> {
    // TODO: this.client.dispute(id, raiser)
    // TODO: UPDATE escrows SET status = 'Disputed' WHERE id = $1
    throw new Error("not implemented");
  }
}
