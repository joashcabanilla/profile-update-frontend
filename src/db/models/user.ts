import { db } from "@/db";
import { usersTable, membersTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllMembers = async () => {
    const members = await db.select().from(membersTable).orderBy(asc(membersTable.lastname), membersTable.branch);
    const result = JSON.stringify(members, (_, v) => (typeof v === "bigint" ? v.toString() : v));
    return result;
};

interface getUserParams {
    id?: string;
    username?: string;
}
export const getUser = async ({ id, username }: getUserParams) => {
    let user = null;

    if (!id && !username) {
        throw new Error("Either id or username must be provided to getUser");
    }

    user = id
        ? await db
              .select()
              .from(usersTable)
              .where(eq(usersTable.id, BigInt(id)))
        : await db.select().from(usersTable).where(eq(usersTable.username, username!));

    return user;
};
