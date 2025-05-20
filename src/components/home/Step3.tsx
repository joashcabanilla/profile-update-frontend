"use client";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";

export default function Step3() {
    return (
        <div className="grid gap-2 pt-0 pb-0 sm:px-20">
            <h1
                className={cn(
                    text({
                        font: "title",
                        align: "left",
                        size: "lg",
                        weight: "md"
                    })
                )}
            >
                Update your information
            </h1>
            <div
                className={cn(
                    card({ variant: "signIn" }),
                    "grid gap-4 [&_label]:text-base [&_label]:font-bold"
                )}
            ></div>
        </div>
    );
}
