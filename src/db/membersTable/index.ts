import { db } from "@/db";
import { membersTable } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getAllMembers = async () => {
    const members = await db
        .select()
        .from(membersTable)
        .orderBy(asc(membersTable.lastname), membersTable.branch)
        .prepare();

    const data = await members.execute();
    return data;
};
