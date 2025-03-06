import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User registered successfully" });
    }
  );
});

router.get("/", async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, username, email, role, created_at FROM users");
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("Received Data:", { username, email, password, role });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const query = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        const values = [username, email, hashedPassword, role];

        console.log("Executing Query:", query, values);

        const [result] = await db.query(query, values);
        console.log("Query Result:", result);

        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(400).json({ message: "User not found" });

    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

export default router;
