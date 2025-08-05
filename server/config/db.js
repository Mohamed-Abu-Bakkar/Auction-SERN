import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

// Check if the database is connected (promise version)
(async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ Database connected successfully");
        connection.release();
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
})();

export default db;
