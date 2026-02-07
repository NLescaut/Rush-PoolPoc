import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body as {
      username?: string;
      email?: string;
      password?: string;
    };

    console.log("REGISTER BODY:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: "Username too short (min 3)" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password too short (min 6)" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email: email.toLowerCase(), password: hashed },
    });

    return res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (e: any) {
    console.error("REGISTER ERROR:", e);

    // cas fréquent: unique constraint
    if (e?.code === "P2002") {
      return res.status(409).json({ error: "Username or email already used" });
    }

    return res.status(500).json({ error: "Register failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    console.log("LOGIN BODY:", { email });

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment");
      return res.status(500).json({ error: "Server misconfigured (JWT_SECRET missing)" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, bestScore: user.bestScore },
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ error: "Login failed" });
  }
});

// utile pour tester que le token marche
router.get("/me", auth, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { id: true, username: true, email: true, bestScore: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (e) {
    console.error("ME ERROR:", e);
    return res.status(500).json({ error: "Me failed" });
  }
});

export default router;
