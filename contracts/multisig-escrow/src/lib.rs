#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Vec};

/// M-of-N multisig escrow variant.
///
/// PSEUDO flow:
///   create(depositor, signers, threshold, beneficiary, amount, asset) →
///       validate threshold <= signers.len()
///       transfer funds to contract
///       store MultisigEscrow state
///   approve(escrow_id, signer) →
///       assert signer in signers
///       record approval
///       if approvals >= threshold → release funds to beneficiary

#[contract]
pub struct MultisigEscrow;

#[contractimpl]
impl MultisigEscrow {
    /// Create a multisig-gated escrow.
    pub fn create(
        env: Env,
        depositor: Address,
        signers: Vec<Address>,
        threshold: u32,
        beneficiary: Address,
        amount: i128,
        asset: Address,
    ) -> u64 {
        depositor.require_auth();
        assert!(threshold > 0 && threshold <= signers.len() as u32, "invalid threshold");
        // TODO: transfer amount of asset from depositor to contract
        let id: u64 = env.storage().instance().get(&"counter").unwrap_or(0u64);
        env.storage().instance().set(&"counter", &(id + 1));
        env.storage().persistent().set(&("signers", id), &signers);
        env.storage().persistent().set(&("threshold", id), &threshold);
        env.storage().persistent().set(&("beneficiary", id), &beneficiary);
        env.storage().persistent().set(&("amount", id), &amount);
        env.storage().persistent().set(&("asset", id), &asset);
        env.storage().persistent().set(&("approvals", id), &0u32);
        env.events().publish(("multisig", "created"), id);
        id
    }

    /// A signer approves release. Funds auto-release when threshold is reached.
    /// PSEUDO:
    ///   assert signer in signers list
    ///   assert signer hasn't already approved
    ///   increment approval count
    ///   if approvals >= threshold → transfer to beneficiary → emit Released
    pub fn approve(env: Env, escrow_id: u64, signer: Address) {
        signer.require_auth();
        // TODO: verify signer is in stored signers list
        // TODO: verify signer hasn't already approved (track per-signer bitmap)
        let approvals: u32 = env
            .storage()
            .persistent()
            .get(&("approvals", escrow_id))
            .unwrap_or(0);
        let threshold: u32 = env
            .storage()
            .persistent()
            .get(&("threshold", escrow_id))
            .expect("escrow not found");
        let new_approvals = approvals + 1;
        env.storage()
            .persistent()
            .set(&("approvals", escrow_id), &new_approvals);
        env.events()
            .publish(("multisig", "approved"), (escrow_id, new_approvals));
        if new_approvals >= threshold {
            // TODO: transfer funds to beneficiary
            env.events().publish(("multisig", "released"), escrow_id);
        }
    }
}
