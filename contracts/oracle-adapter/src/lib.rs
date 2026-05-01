#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env};

/// Oracle Adapter — bridges off-chain data into Soroban via a trusted relayer.
///
/// PSEUDO flow:
///   init(admin, relayer) → store authorized relayer
///   submit_confirmation(escrow_id, confirmed) →
///       assert caller == relayer
///       store confirmation result
///       emit OracleConfirmed event
///   is_confirmed(escrow_id) → bool  ← called by escrow-vault conditions check

#[contract]
pub struct OracleAdapter;

#[contractimpl]
impl OracleAdapter {
    /// Initialize with a trusted relayer address.
    pub fn init(env: Env, admin: Address, relayer: Address) {
        admin.require_auth();
        env.storage().instance().set(&"relayer", &relayer);
    }

    /// Relayer submits an off-chain confirmation for an escrow condition.
    /// PSEUDO: assert caller == relayer → store (escrow_id → confirmed) → emit event
    pub fn submit_confirmation(env: Env, escrow_id: u64, confirmed: bool) {
        let relayer: Address = env
            .storage()
            .instance()
            .get(&"relayer")
            .expect("not initialized");
        relayer.require_auth();
        env.storage()
            .persistent()
            .set(&("confirmed", escrow_id), &confirmed);
        env.events()
            .publish(("oracle", "confirmation"), (escrow_id, confirmed));
    }

    /// Called by escrow-vault conditions evaluator.
    pub fn is_confirmed(env: Env, escrow_id: u64) -> bool {
        env.storage()
            .persistent()
            .get(&("confirmed", escrow_id))
            .unwrap_or(false)
    }
}
