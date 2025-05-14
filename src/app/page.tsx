import { Suspense } from "react";

//components
import MainLayout from "@/components/home/MainLayout";
import SkeletonCard from "@/components/home/SkeletonCard";
import { getAllMembers } from "@/db/membersTable";
import MemberContextProvider from "@/context/member-context";

export default async function Page() {
    const member = await getAllMembers();
    return (
        <Suspense fallback={<SkeletonCard />}>
            <MemberContextProvider>
                <MainLayout member={member} />
            </MemberContextProvider>
        </Suspense>
    );
}
