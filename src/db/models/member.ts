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
    
    const checkDuplicate = await db.select().from(membersTable).where(eq(membersTable.email, email));
    if(checkDuplicate.length > 0){
        return {success: false, message: "duplicate email."};
    }
    
    const sqlUpdate = await db
        .update(membersTable)
        .set({
            cpNumber: cpNumber,
            email: email,
            tinNumber: tinNumber
        })
        .where(eq(membersTable.id, BigInt(id)));
    if(sqlUpdate.length > 0){
        return { success: true, message: "successfully updated!" };
    }  
};
