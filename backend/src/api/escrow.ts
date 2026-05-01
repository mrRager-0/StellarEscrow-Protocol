import { Router, Request, Response } from "express";
import { EscrowService } from "../services/escrowService";

export const escrowRouter = Router();
const service = new EscrowService();

// GET /api/escrows/:id — fetch escrow state
escrowRouter.get("/:id", async (req: Request, res: Response) => {
  // PSEUDO: parse id → service.getEscrow(id) → return JSON
  try {
    const escrow = await service.getEscrow(BigInt(req.params.id));
    res.json(escrow);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// POST /api/escrows — create escrow
escrowRouter.post("/", async (req: Request, res: Response) => {
  // PSEUDO: validate body → service.createEscrow(params) → return { id }
  try {
    const id = await service.createEscrow(req.body);
    res.status(201).json({ id: id.toString() });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/escrows/:id/release
escrowRouter.post("/:id/release", async (req: Request, res: Response) => {
  // PSEUDO: service.release(id) → 200 OK
  try {
    await service.release(BigInt(req.params.id));
    res.sendStatus(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/escrows/:id/dispute
escrowRouter.post("/:id/dispute", async (req: Request, res: Response) => {
  // PSEUDO: service.dispute(id, raiser) → 200 OK
  try {
    await service.dispute(BigInt(req.params.id), req.body.raiser);
    res.sendStatus(200);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
