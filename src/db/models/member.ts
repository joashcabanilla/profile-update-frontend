import { db } from "@/db";
import { membersTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

//types
import { updateParameter } from "@/types/type";

export const getAllMembers = async () => {
    const members = await db.select().from(membersTable).orderBy(asc(membersTable.lastname), membersTable.branch);
    const result = JSON.stringify(members, (_, v) => (typeof v === "bigint" ? v.toString() : v));
    return result;
};

export const updateMember = async (data: updateParameter) => {
    const { id, cpNumber, email, tinNumber } = data;
    return await db
        .update(membersTable)
        .set({
            cpNumber: cpNumber,
            email: email,
            tinNumber: tinNumber
        })
        .where(eq(membersTable.id, BigInt(id)));
};
