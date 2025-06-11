"use server";

//hooks
import * as z from "zod";

//schemas
import { LoginSchema } from "@/schemas";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    console.log("Login action called with data:", data);
};
