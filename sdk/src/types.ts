export type EscrowStatus = "Funded" | "Released" | "Refunded" | "Disputed" | "Resolved";

export interface Conditions {
  timelock: number;       // Unix timestamp; 0 = disabled
  preimageHash?: string;  // hex-encoded SHA-256 hash; undefined = disabled
  oracle?: string;        // oracle-adapter contract ID; undefined = disabled
}

export interface EscrowState {
  id: bigint;
  depositor: string;
  beneficiary: string;
  amount: bigint;
  asset: string;
  conditions: Conditions;
  status: EscrowStatus;
}

export interface CreateEscrowParams {
  depositor: string;
  beneficiary: string;
  amount: bigint;
  asset: string;
  conditions: Conditions;
}

export interface EscrowClientConfig {
  rpcUrl: string;
  networkPassphrase: string;
  vaultContractId: string;
  arbiterContractId?: string;
  oracleContractId?: string;
}
