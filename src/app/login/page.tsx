//metadata
import type { Metadata } from "next";

//components
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Login"
};

export default function Login() {
    return <LoginForm />;
}
