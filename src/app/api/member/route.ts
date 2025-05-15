import { db } from "@/db";
import { membersTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const members = await db
        .select()
        .from(membersTable)
        .orderBy(asc(membersTable.lastname), membersTable.branch);
    const result = JSON.stringify(members, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
    );
    
    return NextResponse.json(result);
}
