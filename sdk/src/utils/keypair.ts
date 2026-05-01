import { Keypair } from "@stellar/stellar-sdk";

/** Load a Keypair from a secret key string (env var or config). */
export function keypairFromSecret(secret: string): Keypair {
  return Keypair.fromSecret(secret);
}

/** Derive the public key (account ID) from a secret. */
export function publicKeyFromSecret(secret: string): string {
  return keypairFromSecret(secret).publicKey();
}
