use soroban_sdk::Env;

pub fn funded(env: &Env, escrow_id: u64) {
    env.events().publish(("escrow", "funded"), escrow_id);
}

pub fn released(env: &Env, escrow_id: u64) {
    env.events().publish(("escrow", "released"), escrow_id);
}

pub fn refunded(env: &Env, escrow_id: u64) {
    env.events().publish(("escrow", "refunded"), escrow_id);
}

pub fn disputed(env: &Env, escrow_id: u64) {
    env.events().publish(("escrow", "disputed"), escrow_id);
}

pub fn resolved(env: &Env, escrow_id: u64) {
    env.events().publish(("escrow", "resolved"), escrow_id);
}
