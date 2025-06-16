import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUser } from "@/db/models/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    const user = await getUser({ username });
                    console.log(password, user);
                }   
                return null;
            }
        })
    ]
} satisfies NextAuthConfig;
