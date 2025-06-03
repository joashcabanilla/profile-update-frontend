import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {
                    type: "text",
                    label: "Username",
                    placeholder: "Username"
                },
                password: {
                    type: "password",
                    label: "password",
                    placeholder: "Password"
                }
            },
            authorize: async (credentials) => {
                let user = null;
                if (credentials && credentials.username != null) {
                    const users = await db
                        .select()
                        .from(usersTable)
                        .where(
                            eq(
                                usersTable.username,
                                credentials.username as string
                            )
                        );

                    if (!users || users.length === 0) {
                        throw new Error("Incorrect Username");
                    } else {
                        const passwordMatch = await bcrypt.compare(
                            credentials.password as string,
                            users[0].password
                        );

                        if (passwordMatch) {
                            user = {
                                id: users[0].id.toString(),
                                name: users[0].name
                            };
                        } else {
                            throw new Error("Incorrect Password");
                        }
                    }
                }

                return user;
            }
        })
    ]
});
