import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [decoded.id]);

    if (!user.length) {
      return res.status(401).json({ message: "User not found." });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
