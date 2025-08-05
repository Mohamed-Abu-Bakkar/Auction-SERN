import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Record a transaction (after an auction ends)
router.post("/", async (req, res) => {
  const { auction_id, winner_id, amount } = req.body;
  try {
    await db.query(
      "INSERT INTO transactions (auction_id, winner_id, amount) VALUES (?, ?, ?)",
      [auction_id, winner_id, amount]
    );

    // Update auction status
    await db.query("UPDATE auctions SET status = 'completed' WHERE id = ?", [auction_id]);

    res.status(201).json({ message: "Transaction recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const [transactions] = await db.query("SELECT * FROM transactions");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
