"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../prisma");
const router = (0, express_1.Router)();
const uploadDir = process.env.UPLOAD_DIR || path_1.default.resolve("uploads");
const storage = multer_1.default.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const name = crypto_1.default.randomBytes(16).toString("hex") + ext;
        cb(null, name);
    }
});
const upload = (0, multer_1.default)({ storage });
router.post("/", upload.single("image"), async (req, res) => {
    const label = req.body.label?.toUpperCase();
    if (!req.file)
        return res.status(400).json({ error: "No file" });
    if (label !== "LINKEDIN" && label !== "INTERPOL")
        return res.status(400).json({ error: "Invalid label" });
    const url = `/uploads/${req.file.filename}`;
    const card = await prisma_1.prisma.imageCard.create({
        data: { url, label }
    });
    res.status(201).json({ id: card.id, url: card.url, label: card.label });
});
exports.default = router;
