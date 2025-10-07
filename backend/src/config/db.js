import mysql2 from "mysql2/promise"

export const pool = mysql2.createPool({
    Host: "sql12.freesqldatabase.com",
    user: "sql12801516",
    password: "9QnUzvFzWp",
    database: "sql12801516",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully");
        connection.release();
    } catch (error) {
        console.error("Database connection failed")
        throw error;
    }
}
