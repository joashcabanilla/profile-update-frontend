"use client";

import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";
import { Button } from "@/components/ui/button";

export default function AccountCard() {
    return (
        <div
            className={cn(
                card({ variant: "searchAccount" }),
                text({ size: "lg" }),
                "bg-muted grid gap-4 p-4 sm:grid-cols-4"
            )}
        >
            <div className="[&_strong]:text-primary grid gap-1 font-bold sm:col-span-3 [&_strong]:font-bold">
                <h5>
                    Name: <strong>Joash Florentino Cabanilla</strong>
                </h5>
                <h5>
                    PB#: <strong>001234</strong>
                </h5>
                <h5>
                    Member ID: <strong>123456</strong>
                </h5>
            </div>
            <div className="self-center sm:justify-self-end">
                <Button
                    type="button"
                    size="xl"
                    className="w-full text-base font-extrabold sm:w-fit sm:text-lg"
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
}
