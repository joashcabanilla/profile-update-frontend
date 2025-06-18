"use server";

//hooks
import * as z from "zod";
import { AuthError } from "next-auth";

//schemas
import { LoginSchema } from "@/schemas";

//route
import { defaultLoginRedirect } from "@/routes";

//auth
import { signIn } from "@/auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.safeParse(data);
    const result = { success: false, message: "Invalid credentials." };

    if (!validatedData.success) return result;

    const { username, password } = validatedData.data;

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: defaultLoginRedirect
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return result;
                default:
                    result.message = "Something went wrong.";
                    return result;
            }
        }
    }
    return result;
};
