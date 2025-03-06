import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import userRoutes from "./routes/users.js";
import auctionRoutes from "./routes/auctions.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root Route to Check Server Status
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auctions", auctionRoutes);

// Database Connection Check
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Database connected successfully");
        connection.release();
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
