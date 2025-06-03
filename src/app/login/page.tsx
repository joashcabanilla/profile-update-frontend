//metadata
import type { Metadata } from "next";
import { signIn } from "@/auth";

export const metadata: Metadata = {
    title: "Login"
};

export default function Login() {
    return (
        <form
            action={async (formData) => {
                "use server";
                await signIn("credentials", formData);
            }}
        >
            <label>
                Email
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    );
}
