"use client";

//hooks
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

//assets
import Logo from "@/assets/images/logo1.png";

//components
import SwitchTheme from "@/components/home/SwitchTheme";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CardWarpperProps {
    children: React.ReactNode;
}

export const CardWrapper = ({ children }: CardWarpperProps) => {
    const { resolvedTheme } = useTheme();
    const [theme, setTheme] = useState<undefined | string>(undefined);

    useEffect(() => {
        if (resolvedTheme) {
            setTheme(resolvedTheme);
        }
    }, [resolvedTheme]);

    return (
        <Card className="w-[400px] p-4 shadow-2xl">
            <CardHeader className="px-0">
                <div className="flex w-full items-center justify-between">
                    <Image src={Logo} alt="Logo" draggable={false} priority className="w-8/12 max-w-[300px]" />
                    <div className="flex items-center">
                        <SwitchTheme resolvedTheme={theme} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 px-0">{children}</CardContent>
        </Card>
    );
};
