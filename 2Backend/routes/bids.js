import express from "express";
import db from "../config/db.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Place a Bid
router.post("/", authenticateUser, (req, res) => {
  const { auction_id, bid_amount } = req.body;
  const bidder_id = req.user.id;

  db.query(
    "INSERT INTO bids (auction_id, bidder_id, bid_amount) VALUES (?, ?, ?)",
    [auction_id, bidder_id, bid_amount],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Bid placed successfully" });
    }
  );
});

export default router;
