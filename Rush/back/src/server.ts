import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import scoreRoutes from "./routes/score";
import uploadRoutes from "./routes/upload";
import imagesRoutes from "./routes/image";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const uploadDir = process.env.UPLOAD_DIR || path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(uploadDir));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/images", imagesRoutes);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));