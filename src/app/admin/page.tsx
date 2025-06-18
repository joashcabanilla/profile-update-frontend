//metadata
import type { Metadata } from "next";

//auth
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
    title: "Admin"
};

export default async function Admin() {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit">log out </button>
            </form>
        </div>
    );
}
