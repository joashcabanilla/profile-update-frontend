"use client";

//hook
import { Suspense, useState, useEffect } from "react";
import { useTheme } from "next-themes";

//components
import MainLayout from "@/components/home/MainLayout";
import SkeletonCard from "@/components/home/SkeletonCard";

//context global state
import MemberContextProvider from "@/context/member-context";
import { useThemeContext } from "@/context/theme-context";

//types
import { Theme, Member } from "@/types/type";

export default function Page() {
    const { setTheme } = useThemeContext();
    const { resolvedTheme } = useTheme();
    const [loading, setLoading] = useState<boolean>(true);
    const [member, setMember] = useState<Member[]>([]);

    useEffect(() => {
        fetch("/api/member")
            .then((res) => res.json())
            .then((data) => {
                setMember(JSON.parse(data));
                if (resolvedTheme) {
                    setLoading(false);
                    setTheme(resolvedTheme as Theme);
                }
            })
            .catch((error) => {
                console.error("Error fetching member:", error);
                setLoading(true);
            });
    }, [resolvedTheme, setTheme]);

    return loading ? (
        <SkeletonCard />
    ) : (
        <Suspense fallback={<SkeletonCard />}>
            <MemberContextProvider>
                <MainLayout member={member} />
            </MemberContextProvider>
        </Suspense>
    );
}
