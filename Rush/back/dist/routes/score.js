"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// submit score final -> update bestScore si meilleur
router.post("/submit", auth_1.auth, async (req, res) => {
    const { score } = req.body;
    if (typeof score !== "number")
        return res.status(400).json({ error: "Invalid score" });
    const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    if (score > user.bestScore) {
        const updated = await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { bestScore: score }
        });
        return res.json({ bestScore: updated.bestScore, improved: true });
    }
    return res.json({ bestScore: user.bestScore, improved: false });
});
// top 10 scoreboard
router.get("/top", async (req, res) => {
    const top = await prisma_1.prisma.user.findMany({
        orderBy: { bestScore: "desc" },
        take: 10,
        select: { username: true, bestScore: true }
    });
    res.json(top);
});
exports.default = router;
