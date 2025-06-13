"use server";

//hooks
import * as z from "zod";

//schemas
import { LoginSchema } from "@/schemas";

//types
import type { LoginResult } from "@/types/type";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);
    let result: LoginResult = { success: true, message: "You have successfully logged in!" };

    if (!validatedData.success) {
        result = {
            success: false,
            message: "Invalid login data",
        };
    }

    return result;
};
