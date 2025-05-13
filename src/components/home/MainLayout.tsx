"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

//context global state
import { useThemeContext } from "@/context/theme-context";

import { cn } from "@/lib/utils";
import { container, card, text } from "@/lib/variants";
import Image from "next/image";

//assets
import Logo from "@/assets/images/logo1.png";

//components
import Terms from "@/components/home/Terms";
import SwitchTheme from "@/components/home/SwitchTheme";
import Steps from "@/components/home/Steps";
import SearchAccount from "@/components/home/SearchAccount";
import SkeletonCard from "@/components/home/SkeletonCard";

export default function MainLayout() {
    const { mounted, setMounted, setTheme } = useThemeContext();
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (resolvedTheme) {
            setMounted(true);
            setTheme(resolvedTheme === "light" ? "light" : "dark");
        }
    }, [resolvedTheme, setMounted, setTheme]);

    return !mounted ? (
        <SkeletonCard />
    ) : (
        <div className={container()}>
            <Terms />
            <div
                className={cn(
                    card({ align: "center", variant: "maxWidth650px" }),
                    "grid gap-10"
                )}
            >
                <div className="grid gap-4">
                    <div className="flex w-full items-center justify-between">
                        <Image
                            src={Logo}
                            alt="Logo"
                            draggable={false}
                            priority
                            className="w-9/12 max-w-[300px]"
                        />
                        <div className="flex items-center">
                            <SwitchTheme />
                        </div>
                    </div>
                    <h1
                        className={text({
                            font: "title",
                            align: "center",
                            size: "xl",
                            weight: "lg"
                        })}
                    >
                        Update Member Profile
                    </h1>
                </div>
                <Steps />
                <SearchAccount />
            </div>
        </div>
    );
}
