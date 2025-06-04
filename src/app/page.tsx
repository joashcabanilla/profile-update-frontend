//hook
import { Suspense } from "react";

//components
import SkeletonCard from "@/components/home/SkeletonCard";
import GetMembers from "@/components/server/GetMembers";

export default function Page() {
    return (
        <Suspense fallback={<SkeletonCard />}>
            <GetMembers />
        </Suspense>
    );
}
