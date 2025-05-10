import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { membersTable } from "@/db/schema";
import dotenv from "dotenv";
dotenv.config();

const poolConnection: mysql.Pool = mysql.createPool({
    uri: process.env.DB_URL
});

const db = drizzle({ client: poolConnection });

interface Member {
    memid: string | null;
    pbno: string | null;
    firstname: string;
    middlename: string | null;
    lastname: string;
    birthdate: Date;
    branch: string;
}

const capitalizeWords = (str: string | null): string => {
    if (!str) return "";
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const batchSize: number = 1000;
const csvData: Member[] = [];
const csvPath: string = path.resolve(__dirname, "../../data/members.csv");
const parser = fs.createReadStream(csvPath).pipe(
    parse({
        columns: true,
        skip_empty_lines: true,
        trim: true
    })
);

parser.on("data", (data: Member) => {
    const dataToInsert: Member = {
        memid: data.memid || null,
        pbno: data.pbno || null,
        firstname: capitalizeWords(data.firstname),
        middlename: capitalizeWords(data.middlename) || null,
        lastname: capitalizeWords(data.lastname),
        birthdate: new Date(data.birthdate),
        branch: data.branch.toUpperCase()
    };

    csvData.push(dataToInsert);
    console.log("Processing record.");
});

parser.on("end", () => {
    console.log("CSV parsing completed.");

    const insertData = async (csvData: Member[]) => {
        let insertCtr = 0;
        let bulkData: Member[] = [];

        for (const data of csvData) {
            insertCtr++;
            bulkData.push(data);

            if (insertCtr == batchSize) {
                await db.insert(membersTable).values(bulkData);
                console.log(`Inserted ${insertCtr} records.`);
                insertCtr = 0;
                bulkData = [];
            }
        }

        if (bulkData.length > 0) {
            await db.insert(membersTable).values(bulkData);
            console.log(`Inserted remaining ${bulkData.length} records.`);
        }
    };

    insertData(csvData)
        .then(() => {
            console.log("All data inserted successfully.");
        })
        .catch((err) => {
            console.error("Error inserting data:", err);
        });
});

parser.on("error", (err) => {
    console.error("Error while parsing CSV:", err);
});
