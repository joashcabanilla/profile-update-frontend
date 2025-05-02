import { cn } from "@/lib/utils";
import { container, card, text } from "@/lib/variants";
import Image from "next/image";
import Logo from "@/assets/images/logo1.png";

export default function Home() {
    return (
        <div className={container()}>
            <div
                className={cn(
                    card({ align: "center", size: "default" }),
                    "grid gap-6"
                )}
            >
                <div className="grid gap-2">
                    <div className="flex items-center justify-center sm:justify-start">
                        <Image
                            src={Logo}
                            alt="Logo"
                            placeholder="blur"
                            draggable={false}
                            priority
                            className="w-full max-w-[300px]"
                        />
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
                    <div className="border-accent rounded-lg border-2 border-dashed">
                        <p
                            className={text({
                                font: "mono",
                                align: "left",
                                size: "md",
                                weight: "sm"
                            })}
                        >
                            note or tips para saan yung website data privacy
                        </p>
                    </div>
                </div>
                <div className="border-2">stepper design</div>
                <div className="border-2">
                    step container / child components
                </div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>

                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>

                <div className="border-2">buttons prev and next</div>
                <div className="border-2">buttons prev and next</div>
            </div>
        </div>
    );
}
