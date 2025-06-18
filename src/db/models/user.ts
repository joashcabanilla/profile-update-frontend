import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
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
        ? await db.select().from(users).where(eq(users.id, id))
        : await db.select().from(users).where(eq(users.username, username!));
    
    return user;
};
