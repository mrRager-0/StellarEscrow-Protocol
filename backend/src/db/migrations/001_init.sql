-- Migration 001: initial escrow table
CREATE TABLE IF NOT EXISTS escrows (
    id          BIGINT PRIMARY KEY,
    depositor   TEXT NOT NULL,
    beneficiary TEXT NOT NULL,
    amount      NUMERIC NOT NULL,
    asset       TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'Funded',
    conditions  JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TODO: add index on status for event listener queries
-- TODO: add disputes table for arbiter tracking
