"use client";

//hooks
import React, { useState, useRef } from "react";
import { format, isValid, parse } from "date-fns";
import { toast } from "sonner";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card, button } from "@/lib/variants";

//icons
import { CircleX } from "lucide-react";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member } from "@/types/type";

export default function Step2() {
    const { memberId, searchedMember, setStep } = useMemberContext();
    const [birthdateInput, setBirthdateInput] = useState<string>("");
    const [month, setMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const birthdateRef = useRef<HTMLInputElement>(null);
    const birthdatePrevRef = useRef("");

    const memberData: Member[] = searchedMember.filter(
        (data) => data.id == memberId && data
    );

    const { memid, pbno, birthdate } = memberData[0];
    const pbMemId = pbno ?? memid ?? "";

    const handleBirhtdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const inputPrev = birthdatePrevRef.current;

        let dateInput = input.replace(/\D/g, "");

        if (input.length < inputPrev.length) {
            setBirthdateInput(input);
            birthdatePrevRef.current = input;
            setSelectedDate(undefined);
            return;
        }

        if (dateInput.length > 1) {
            dateInput = dateInput.slice(0, 2) + "/" + dateInput.slice(2);
        }
        if (dateInput.length > 4) {
            dateInput = dateInput.slice(0, 5) + "/" + dateInput.slice(5);
        }
        const formatted = dateInput.slice(0, 10);
        setBirthdateInput(formatted);
        birthdatePrevRef.current = formatted;

        const parsedDate = parse(formatted, "MM/dd/yyyy", new Date());
        if (isValid(parsedDate)) {
            setMonth(parsedDate);
            setSelectedDate(parsedDate);
        } else {
            setMonth(new Date());
            setSelectedDate(undefined);
        }
    };

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setBirthdateInput("");
            setMonth(new Date());
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setMonth(date);
            setBirthdateInput(format(date, "MM/dd/yyyy"));
        }
    };

    const handleSignBtn = (
        memberBirthdate: Date,
        birthdate: string
    ): undefined => {
        const memberData = format(memberBirthdate, "MM/dd/yyyy");

        if (birthdate === memberData) {
            toast.success("Signed in successfully.", {
                duration: 3000
            });
            setStep(3);
        } else {
            toast.error("Sign-in unsuccessful. Incorrect birthdate.", {
                duration: 3000
            });
        }
    };

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
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Input
                                    ref={birthdateRef}
                                    id="birthdate"
                                    placeholder="mm/dd/yyyy"
                                    type="text"
                                    maxLength={10}
                                    onInput={handleBirhtdate}
                                    value={birthdateInput}
                                    className="peer pe-9"
                                />
                            </PopoverTrigger>
                            <PopoverContent
                                onOpenAutoFocus={(event: Event) => {
                                    event.preventDefault();
                                    if (birthdateInput.length == 10) {
                                        const parsedDate = parse(
                                            birthdateInput,
                                            "MM/dd/yyyy",
                                            new Date()
                                        );
                                        if (isValid(parsedDate)) {
                                            setMonth(parsedDate);
                                            setSelectedDate(parsedDate);
                                        } else {
                                            setMonth(new Date());
                                            setSelectedDate(undefined);
                                        }
                                    } else {
                                        setMonth(new Date());
                                        setSelectedDate(undefined);
                                    }
                                }}
                                className="w-fit p-1 sm:w-auto sm:p-2"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    month={month}
                                    onMonthChange={setMonth}
                                    onSelect={handleDayPickerSelect}
                                />
                            </PopoverContent>
                        </Popover>
                        <button
                            className={cn(
                                button({
                                    variant: "closeIcon"
                                }),
                                birthdateInput
                                    ? "cursor-pointer opacity-100"
                                    : "pointer-events-none opacity-0"
                            )}
                            aria-label="Submit search"
                            type="submit"
                            onClick={() => {
                                setBirthdateInput("");
                                setMonth(new Date());
                                setSelectedDate(undefined);
                            }}
                        >
                            <CircleX size={20} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2">
                    <Button
                        variant="link"
                        type="button"
                        className="cursor-pointer text-base"
                        onClick={() => {
                            setStep(1);
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        type="button"
                        className="cursor-pointer text-base font-bold"
                        size="lg"
                        onClick={() => handleSignBtn(birthdate, birthdateInput)}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}
