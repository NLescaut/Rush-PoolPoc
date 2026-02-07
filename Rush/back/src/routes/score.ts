import { Router } from "express";
import { prisma } from "../prisma";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

// submit score final -> update bestScore si meilleur
router.post("/submit", auth, async (req: AuthRequest, res) => {
  const { score } = req.body as { score: number };
  if (typeof score !== "number") return res.status(400).json({ error: "Invalid score" });

  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (score > user.bestScore) {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { bestScore: score }
    });
    return res.json({ bestScore: updated.bestScore, improved: true });
  }

  return res.json({ bestScore: user.bestScore, improved: false });
});

// top 10 scoreboard
router.get("/top", async (req, res) => {
  const top = await prisma.user.findMany({
    orderBy: { bestScore: "desc" },
    take: 10,
    select: { username: true, bestScore: true }
  });
  res.json(top);
});

export default router;
