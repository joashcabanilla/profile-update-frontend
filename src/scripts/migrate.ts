import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

interface Member {
    memid: string;
    pbno: string;
    firstname: string;
    middlename: string;
    lastname: string;
    birthdate: Date;
    branch: string;
}

const csvPath = path.resolve(__dirname, "../../data/members.csv");
const parser = fs.createReadStream(csvPath).pipe(
    parse({
        columns: true,
        skip_empty_lines: true,
        trim: true
    })
);

parser.on("data", (record: Member) => {
    console.log("Parsed record:", record);
});

parser.on("end", () => {
    console.log("CSV parsing completed.");
});

parser.on("error", (err) => {
    console.error("Error while parsing CSV:", err);
});
