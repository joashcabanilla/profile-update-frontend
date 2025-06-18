import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUser } from "@/db/models/user";
import brcypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;
                    const user = await getUser({ username });
                    if (!user[0]) return null;

                    const passwordMatch = await brcypt.compare(password, user[0].password);
                    if (passwordMatch) return user[0];
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig;
