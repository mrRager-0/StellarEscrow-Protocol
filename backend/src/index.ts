import express from "express";
import { escrowRouter } from "./api/escrow";
import { startHorizonListener } from "./services/horizonListener";

const app = express();
app.use(express.json());

app.use("/api/escrows", escrowRouter);

const PORT = process.env.BACKEND_PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`StellarEscrow backend running on port ${PORT}`);
  startHorizonListener();
});
