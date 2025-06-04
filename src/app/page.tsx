//hook
import { Suspense } from "react";

//context global state
import MemberContextProvider from "@/context/member-context";

//components
import MainLayout from "@/components/home/MainLayout";
import SkeletonCard from "@/components/home/SkeletonCard";

//types
import { Member } from "@/types/type";

export default async function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const getMember = await fetch(`${baseUrl}/api/member`, {
        cache: "no-store"
    });

    let member: Member[] = [];

    if (!getMember.ok) {
        throw new Error("Failed to fetch member data");
    } else {
        const data = await getMember.json();
        member = JSON.parse(data);
    }

    return (
        <Suspense fallback={<SkeletonCard />}>
            <MemberContextProvider>
                <MainLayout member={member} />
            </MemberContextProvider>
        </Suspense>
    );
}
