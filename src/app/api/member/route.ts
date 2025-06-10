import { db } from "@/db";
import { membersTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const members = await db.select().from(membersTable).orderBy(asc(membersTable.lastname), membersTable.branch);
    const result = JSON.stringify(members, (_, v) => (typeof v === "bigint" ? v.toString() : v));

    return NextResponse.json(result);
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, cpNumber, email, tinNumber } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        }

        const result = await db
            .update(membersTable)
            .set({
                cpNumber: cpNumber,
                email: email,
                tinNumber: tinNumber
            })
            .where(eq(membersTable.id, id));

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
