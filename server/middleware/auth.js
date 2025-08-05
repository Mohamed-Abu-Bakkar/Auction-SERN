import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Set token expiration to 7 days
const TOKEN_EXPIRY = '7d';

export const generateToken = (userData) => {
  return jwt.sign(
    { id: userData.id, role: userData.role },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
};


export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin rights required." });
  }
  next();
};
