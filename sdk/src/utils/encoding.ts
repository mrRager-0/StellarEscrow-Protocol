import { xdr, Address, nativeToScVal } from "@stellar/stellar-sdk";
import type { Conditions } from "../types";

/** Encode a Stellar address string to ScVal. */
export function addressToScVal(address: string): xdr.ScVal {
  return new Address(address).toScVal();
}

/** Encode a bigint amount to i128 ScVal. */
export function amountToScVal(amount: bigint): xdr.ScVal {
  return nativeToScVal(amount, { type: "i128" });
}

/** Encode Conditions struct to ScVal map. */
export function conditionsToScVal(conditions: Conditions): xdr.ScVal {
  // TODO: build ScVal map with timelock, preimage_hash, oracle fields
  return nativeToScVal(conditions);
}

/** Decode a u64 ScVal to bigint. */
export function scValToU64(val: xdr.ScVal): bigint {
  // TODO: handle ScVal u64 decoding
  return BigInt(0);
}
