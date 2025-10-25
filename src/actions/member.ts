"use server";

import { updateMember } from "@/db/models/member";

//types
import { updateParameter } from "@/types/type";

export const update = async (data: updateParameter) => {
    const result = await updateMember(data);
    if (!result) {
        throw new Error("error in updating member information");
    }
    return result;
};
