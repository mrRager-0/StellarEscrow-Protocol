use soroban_sdk::{contracttype, Address, Env};

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum Status {
    Funded,
    Released,
    Refunded,
    Disputed,
    Resolved,
}

/// Conditions that must be met before funds can be released.
#[contracttype]
#[derive(Clone)]
pub struct Conditions {
    /// Unix timestamp after which release is allowed (0 = no timelock)
    pub timelock: u64,
    /// Optional hash preimage condition (zero bytes = disabled)
    pub preimage_hash: soroban_sdk::Bytes,
    /// Optional oracle contract that must confirm delivery
    pub oracle: Option<Address>,
}

#[contracttype]
#[derive(Clone)]
pub struct EscrowState {
    pub depositor: Address,
    pub beneficiary: Address,
    pub amount: i128,
    pub asset: Address,
    pub conditions: Conditions,
    pub status: Status,
}

const ESCROW_KEY: &str = "escrow";
const COUNTER_KEY: &str = "counter";

pub fn next_escrow_id(env: &Env) -> u64 {
    let id: u64 = env.storage().instance().get(&COUNTER_KEY).unwrap_or(0u64);
    env.storage().instance().set(&COUNTER_KEY, &(id + 1));
    id
}

pub fn save_escrow(env: &Env, id: u64, state: EscrowState) {
    env.storage().persistent().set(&(ESCROW_KEY, id), &state);
}

pub fn load_escrow(env: &Env, id: u64) -> EscrowState {
    env.storage()
        .persistent()
        .get(&(ESCROW_KEY, id))
        .expect("escrow not found")
}
