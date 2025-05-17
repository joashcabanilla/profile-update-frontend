"use client";

//hooks
import { useId, useState } from "react";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";
import { format } from "date-fns";

//icons
import { CalendarIcon } from "lucide-react";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member } from "@/types/type";

export default function Step2() {
    const { memberId, searchedMember } = useMemberContext();
    const [date, setDate] = useState<Date | undefined>();
    const id = useId();

    const memberData: Member[] = searchedMember.filter(
        (data) => data.id == memberId && data
    );

    const { memid, pbno } = memberData[0];
    const pbMemId = memid ?? pbno ?? "";

    return (
        <div className="grid gap-2 pt-0 pb-0 sm:px-25">
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
                Sign into your account
            </h1>
            <div
                className={cn(
                    card({ variant: "signIn" }),
                    "grid gap-4 [&_label]:text-base [&_label]:font-bold"
                )}
            >
                <div className="*:not-first:mt-2">
                    <Label htmlFor="pbMemId">PB# / Member ID</Label>
                    <Input
                        id="pbMemId"
                        placeholder="PB# / Member ID"
                        type="text"
                        disabled
                        value={pbMemId}
                    />
                </div>
                <div className="*:not-first:mt-2">
                    <Label htmlFor={id}>Birthdate</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id={id}
                                variant={"outline"}
                                className={cn(
                                    "group bg-card hover:bg-accent/30 border-input h-12 w-full justify-between rounded-2xl px-3 text-base font-bold shadow-none outline-offset-0 outline-none focus-visible:outline-[3px]",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <span
                                    className={cn(
                                        "truncate text-base font-bold",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    {date
                                        ? format(date, "MM/dd/yyyy")
                                        : "Pick a date"}
                                </span>
                                <CalendarIcon
                                    size={16}
                                    className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                                    aria-hidden="true"
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}
