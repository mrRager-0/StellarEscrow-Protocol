use soroban_sdk::Env;

use crate::storage::Conditions;

/// Assert all release conditions are satisfied; panics otherwise.
/// PSEUDO:
///   if timelock set → assert env.ledger().timestamp() >= timelock
///   if preimage_hash set → assert caller supplied matching preimage (TODO: pass preimage as arg)
///   if oracle set → cross-contract call oracle.is_confirmed(escrow_id) → assert true
pub fn assert_satisfied(env: &Env, conditions: &Conditions) {
    // Timelock check
    if conditions.timelock > 0 {
        assert!(
            env.ledger().timestamp() >= conditions.timelock,
            "timelock not expired"
        );
    }

    // Preimage check
    // TODO: accept preimage argument, hash it, compare to conditions.preimage_hash

    // Oracle check
    // TODO: if conditions.oracle.is_some() → invoke oracle adapter contract
}
