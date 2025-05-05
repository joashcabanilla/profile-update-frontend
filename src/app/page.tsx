"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

//context global state
import { useThemeContext } from "@/context/theme-context";

//components
import MainLayout from "@/components/home/MainLayout";
import SkeletonCard from "@/components/home/SkeletonCard";

export default function Page() {
    const { mounted, setMounted, setTheme } = useThemeContext();
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (resolvedTheme) {
            setMounted(true);
            setTheme(resolvedTheme === "light" ? "light" : "dark");
        }
    }, [resolvedTheme, setMounted, setTheme]);

    return !mounted ? <SkeletonCard /> : <MainLayout />;
}
