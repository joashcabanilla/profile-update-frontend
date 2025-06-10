import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not defined");
}

const poolConnection: mysql.Pool = mysql.createPool({
    uri: process.env.DB_URL
});

export const db = drizzle({ client: poolConnection });

export const testConnection = () => {
    poolConnection
        .getConnection()
        .then(() => console.log("Connected to MySQL"))
        .catch((err) => console.error(" onnection error:", err, process.env.DB_URL));
};

export const closeConnection = () => {
    poolConnection
        .end()
        .then(() => console.log("MySQL connection closed"))
        .catch((err) => console.error("Error closing MySQL connection:", err));
};
