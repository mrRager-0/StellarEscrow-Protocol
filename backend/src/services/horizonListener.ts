import { Horizon } from "@stellar/stellar-sdk";
import { db } from "../db/client";

/**
 * Horizon event listener — polls Soroban contract events and syncs state to PostgreSQL.
 *
 * PSEUDO:
 *   connect to Horizon
 *   poll getEvents({ contractId: VAULT_CONTRACT_ID, cursor }) every N seconds
 *   for each event:
 *     parse topic (funded | released | refunded | disputed | resolved)
 *     upsert escrow status in DB
 *     advance cursor
 */
export function startHorizonListener(): void {
  const server = new Horizon.Server(process.env.HORIZON_URL!);
  let cursor = "now";

  const poll = async () => {
    try {
      // TODO: server.getEvents({ contractId, cursor }) → process events → update cursor
    } catch (err) {
      console.error("Horizon listener error:", err);
    }
    setTimeout(poll, 5000);
  };

  poll();
  console.log("Horizon event listener started");
}
