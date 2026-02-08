"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
router.get("/random", async (_req, res) => {
    const count = await prisma_1.prisma.imageCard.count();
    if (count === 0)
        return res.status(404).json({ error: "No images in DB" });
    const skip = Math.floor(Math.random() % count);
    const card = await prisma_1.prisma.imageCard.findFirst({ skip, take: 1 });
    if (card === null)
        return res.status(500).json({ error: "Couldn't find a card" });
    return res.json({ id: card.id, url: card.url });
});
// body: { cardId: number, answer: "LINKEDIN"|"INTERPOL" }
router.post("/answer", async (req, res) => {
    const { cardId, answer } = req.body;
    if (!cardId || !answer)
        return res.status(400).json({ error: "Missing fields" });
    const up = answer.toUpperCase();
    if (up !== "P_DIDDY" && up !== "EPSTEIN") {
        return res.status(400).json({ error: "Invalid answer" });
    }
    const card = await prisma_1.prisma.imageCard.findUnique({ where: { id: cardId } });
    if (!card)
        return res.status(404).json({ error: "Card not found" });
    const correct = card.label === up;
    const points = correct ? 10 : 0;
    return res.json({ correct, points, correctLabel: card.label });
});
exports.default = router;
