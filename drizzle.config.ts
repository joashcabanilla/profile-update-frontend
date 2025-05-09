import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined");
}

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DB_URL!
    }
});
