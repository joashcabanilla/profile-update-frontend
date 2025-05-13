import { Suspense } from "react";

//components
import MainLayout from "@/components/home/MainLayout";
import SkeletonCard from "@/components/home/SkeletonCard";
import { getAllMembers } from "@/db/membersTable";

export default async function Page() {
    const members = await getAllMembers();
    console.log(members);
    return (
        <Suspense fallback={<SkeletonCard />}>
            <MainLayout />
        </Suspense>
    );
}
