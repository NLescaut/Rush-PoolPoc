import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.post("/register", async (req, res) => {
  const { filename, label } = req.body as { filename?: string; label?: string };

  if (!filename) return res.status(400).json({ error: "filename missing" });

  const up = (label || "").toUpperCase();
  if (up !== "LINKEDIN" && up !== "INTERPOL") {
    return res.status(400).json({ error: "Invalid label (LINKEDIN | INTERPOL)" });
  }

  const url = `/uploads/${filename}`;

  try {
    const card = await prisma.imageCard.create({
      data: { url, label: up as any },
    });
    return res.status(201).json(card);
  } catch (e: any) {
    if (e?.code === "P2002") return res.status(409).json({ error: "Already registered" });
    console.error(e);
    return res.status(500).json({ error: "DB error" });
  }
});

export default router;
