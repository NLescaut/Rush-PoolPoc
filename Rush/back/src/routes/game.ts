import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/random", async (_req, res) => {
  const count = await prisma.imageCard.count();
  if (count === 0) return res.status(404).json({ error: "No images in DB" });

  const skip = Math.floor(Math.random() * count);
  const card = await prisma.imageCard.findFirst({ skip, take: 1 });

  return res.json({ id: card!.id, url: card!.url });
});

// body: { cardId: number, answer: "LINKEDIN"|"INTERPOL" }
router.post("/answer", async (req, res) => {
  const { cardId, answer } = req.body as { cardId?: number; answer?: string };

  if (!cardId || !answer) return res.status(400).json({ error: "Missing fields" });

  const up = answer.toUpperCase();
  if (up !== "LINKEDIN" && up !== "INTERPOL") {
    return res.status(400).json({ error: "Invalid answer" });
  }

  const card = await prisma.imageCard.findUnique({ where: { id: cardId } });
  if (!card) return res.status(404).json({ error: "Card not found" });

  const correct = card.label === up;
  const points = correct ? 10 : 0;

  return res.json({ correct, points, correctLabel: card.label });
});

export default router;
