import { cn } from "@/lib/utils";
import { container, card, text } from "@/lib/variants";
import Image from "next/image";

//assets
import Logo from "@/assets/images/logo1.png";

//components
import Terms from "@/components/home/Terms";
import SwitchTheme from "@/components/home/SwitchTheme";
import Steps from "@/components/home/Steps";

export default function MainLayout() {
    return (
        <div className={container()}>
            <Terms />
            <div
                className={cn(
                    card({ align: "center", size: "maxWidth650px" }),
                    "grid gap-6"
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
                <div className="border-2">
                    step container / child components
                </div>
                <div className="border-2">buttons prev and next</div>
            </div>
        </div>
    );
}
