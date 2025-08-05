import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { verifyToken, verifyAdmin, generateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected route - Get all users (admin only)
router.get("/Show", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, username, email, role, created_at FROM users");
        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Public routes - Register and Login
router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;
