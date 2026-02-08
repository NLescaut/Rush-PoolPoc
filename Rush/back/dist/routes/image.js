"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    const { filename, label } = req.body;
    if (!filename)
        return res.status(400).json({ error: "filename missing" });
    const up = (label || "").toUpperCase();
    if (up !== "LINKEDIN" && up !== "INTERPOL") {
        return res.status(400).json({ error: "Invalid label (LINKEDIN | INTERPOL)" });
    }
    const url = `/uploads/${filename}`;
    try {
        const card = await prisma_1.prisma.imageCard.create({
            data: { url, label: up },
        });
        return res.status(201).json(card);
    }
    catch (e) {
        if (e?.code === "P2002")
            return res.status(409).json({ error: "Already registered" });
        console.error(e);
        return res.status(500).json({ error: "DB error" });
    }
});
exports.default = router;
