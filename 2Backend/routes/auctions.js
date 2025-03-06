import express from "express";
import pool from "../config/db.js";  // ✅ Import database connection

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM auctions"); // ✅ Use async/await
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { seller_id, title, description, starting_price, start_time, end_time } = req.body;

        if (!seller_id || !title || !starting_price || !start_time || !end_time) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const [result] = await pool.query(
            "INSERT INTO auctions (seller_id, title, description, starting_price, current_price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [seller_id, title, description, starting_price, starting_price, start_time, end_time]
        );

        res.status(201).json({ message: "Auction created successfully", auction_id: result.insertId });
    } catch (error) {
        console.error("❌ Error creating auction:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


export default router;
