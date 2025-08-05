import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Place a Bid
router.post("/", async (req, res) => {
  const { auction_id, bid_amount, bidder_id } = req.body;

  // Validate input
  if (!auction_id || bid_amount === undefined || !bidder_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (bidder_id === auction_id) {
    return res.status(400).json({ error: "Bidder cannot be the auction seller" });
  }
  if (bidder_id === null || auction_id === null) {
    return res.status(400).json({ error: "Bidder ID and Auction ID cannot be null" });
  }

  try {
    // Check if auction exists and get current bid
    const [auction] = await db.query(
      "select * FROM auctions WHERE id = ?",
      [auction_id]
    );

    if (!auction.length) {
      return res.status(404).json({ error: "Auction not found" });
    }

    // Check if auction is completed
    if (auction[0].status === 'completed' || new Date() > new Date(auction[0].end_time)) {
      // If auction is not already marked completed, update it
      if (auction[0].status !== 'completed') {
        await db.query("UPDATE auctions SET status = 'completed' WHERE id = ?", [auction_id]);
      }
      return res.status(400).json({ error: "Auction has ended. No more bids allowed." });
    }

    // Enhanced bid validation
    if (bid_amount <= auction[0].current_price) {
      return res.status(400).json({
        error: `Bid must be higher than current bid: $${auction[0].current_price}`,
      });
    }

    // Insert bid and update price and bidder_id
    await db.query(
      "UPDATE auctions SET current_price = ?, bidder_id = ? WHERE id = ?",
      [bid_amount, bidder_id, auction_id]
    );

    res.status(201).json({ message: "Bid placed successfully" });
  } catch (err) {
    console.error("Bid error:", err);
    res.status(500).json({ error: "Failed to place bid" });
  }
});

export default router;
