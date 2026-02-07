import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import { prisma } from "../prisma";

const router = Router();

const uploadDir = process.env.UPLOAD_DIR || path.resolve("uploads");

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = crypto.randomBytes(16).toString("hex") + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const label = (req.body.label as string)?.toUpperCase();
  if (!req.file) return res.status(400).json({ error: "No file" });
  if (label !== "LINKEDIN" && label !== "INTERPOL") return res.status(400).json({ error: "Invalid label" });

  const url = `/uploads/${req.file.filename}`;

  const card = await prisma.imageCard.create({
    data: { url, label }
  });

  res.status(201).json({ id: card.id, url: card.url, label: card.label });
});

export default router;
