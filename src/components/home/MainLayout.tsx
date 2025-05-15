"use client";

//hooks
import Image from "next/image";
import { useEffect } from "react";

//context global state
import { useMemberContext } from "@/context/member-context";

//style utils
import { cn } from "@/lib/utils";
import { container, card, text } from "@/lib/variants";

//assets
import Logo from "@/assets/images/logo1.png";

//components
import Terms from "@/components/home/Terms";
import SwitchTheme from "@/components/home/SwitchTheme";
import Steps from "@/components/home/Steps";
import SearchAccount from "@/components/home/SearchAccount";

//types
import { mainLayoutProps } from "@/types/type";

export default function MainLayout({ member }: mainLayoutProps) {
    const { setMember } = useMemberContext();

    useEffect(() => {
        setMember(member);
    });

    return (
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
