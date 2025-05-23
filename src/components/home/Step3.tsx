"use client";

//hooks
import React, { useRef, useState } from "react";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card, button } from "@/lib/variants";

//icons
import { CircleX } from "lucide-react";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProfileUpdated from "@/components/home/ProfileUpdated";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member, updateProfileInput } from "@/types/type";

export default function Step3() {
    const {
        memberId,
        searchedMember,
        setStep,
        stepCompleted,
        setStepCompleted
    } = useMemberContext();
    const profileFormRef = useRef<HTMLFormElement>(null);
    const [cpnumberRef, emailRef, tinRef] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const [cpnumberState, setCpnumberState] = useState<string>("");
    const [emailState, setEmailState] = useState<string>("");
    const [tinState, setTinState] = useState<string>("");

    const memberData: Member[] = searchedMember.filter(
        (data) => data.id == memberId && data
    );

    const { id, memid, pbno, firstname, middlename, lastname, branch } =
        memberData[0];

    const memberInfo: updateProfileInput[][] = [
        [
            {
                id: "pbno",
                type: "text",
                label: "PB#",
                value: pbno ?? "No Data",
                class: pbno ? "text-foreground" : "text-muted-foreground",
                disabled: true
            },
            {
                id: "memid",
                type: "text",
                label: "Member ID",
                value: memid ?? "No Data",
                class: memid ? "text-foreground" : "text-muted-foreground",
                disabled: true
            }
        ],
        [
            {
                id: "memberName",
                type: "text",
                label: "Name",
                value: `${firstname} ${middlename ?? ""} ${lastname}`,
                disabled: true
            },
            {
                id: "branch",
                type: "text",
                label: "Branch",
                value: branch.toUpperCase(),
                disabled: true
            },
            {
                id: "cpnumber",
                type: "text",
                label: "Contact No.",
                disabled: false,
                ref: cpnumberRef,
                value: cpnumberState,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    /^\d*$/.test(e.target.value) &&
                    setCpnumberState(e.target.value),
                maxLength: 11,
                required: true,
                onClear: () => setCpnumberState(""),
                clearClass: cpnumberState
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-0"
            },
            {
                id: "email",
                type: "email",
                label: "Email",
                disabled: false,
                ref: emailRef,
                value: emailState,
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmailState(e.target.value),
                onClear: () => setEmailState(""),
                clearClass: emailState
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-0"
            },
            {
                id: "tin",
                type: "text",
                label: "Tin No.",
                disabled: false,
                ref: tinRef,
                value: tinState,
                required: false,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setTinState(e.target.value),
                onClear: () => setTinState(""),
                clearClass: tinState
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-0"
            }
        ]
    ];

    const handleProfileForm = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const payload = {
            id: id,
            cpNumber: cpnumberState,
            email: emailState,
            tinNumber: tinState === "" ? null : tinState
        };

        const res = await fetch("/api/member", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) setStepCompleted(true);
    };

    return stepCompleted ? (
        <ProfileUpdated />
    ) : (
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
            >
                <form
                    ref={profileFormRef}
                    onSubmit={handleProfileForm}
                    className="grid gap-4"
                >
                    {memberInfo.map((component, index) =>
                        index === 0 ? (
                            <div
                                className="grid gap-4 sm:grid-cols-2"
                                key={index}
                            >
                                {component.map((field) => (
                                    <div
                                        key={field.id}
                                        className="*:not-first:mt-2"
                                    >
                                        <Label htmlFor={field.id}>
                                            {field.label}
                                        </Label>
                                        <Input
                                            id={field.id}
                                            placeholder={field.label}
                                            type={field.type}
                                            value={field.value}
                                            className={cn(
                                                field.class,
                                                field.disabled
                                                    ? "bg-primary/3"
                                                    : ""
                                            )}
                                            disabled={field.disabled}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-rows-5 gap-4" key={index}>
                                {component.map((field) => (
                                    <div
                                        key={field.id}
                                        className="*:not-first:mt-2"
                                    >
                                        <Label
                                            htmlFor={field.id}
                                            className={cn(
                                                field.required &&
                                                    "flex items-center gap-1"
                                            )}
                                        >
                                            {field.label}
                                            {field.required && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-primary"
                                                >
                                                    required
                                                </Badge>
                                            )}
                                        </Label>

                                        <div className="relative">
                                            <Input
                                                id={field.id}
                                                ref={field.ref}
                                                placeholder={
                                                    field.id != "cpnumber"
                                                        ? field.label
                                                        : "ex.09xxxxxxxxx"
                                                }
                                                type={field.type}
                                                value={field.value}
                                                disabled={field.disabled}
                                                className={cn(
                                                    field.disabled
                                                        ? "bg-primary/3"
                                                        : "",
                                                    field.id == "cpnumber"
                                                        ? "placeholder:font-jetbrains"
                                                        : "",
                                                    "peer pe-9"
                                                )}
                                                onKeyDown={(
                                                    e: React.KeyboardEvent<HTMLInputElement>
                                                ) =>
                                                    e.key === "Enter" &&
                                                    profileFormRef.current?.requestSubmit()
                                                }
                                                required={field.required}
                                                maxLength={field.maxLength}
                                                minLength={field.maxLength}
                                                onChange={field.onChange}
                                            />
                                            {field.ref != undefined && (
                                                <a
                                                    className={cn(
                                                        button({
                                                            variant: "closeIcon"
                                                        }),
                                                        field.clearClass
                                                    )}
                                                    onClick={field.onClear}
                                                >
                                                    <CircleX
                                                        size={20}
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </form>

                <div className="mt-2 flex flex-col gap-2 sm:flex-row-reverse sm:justify-between">
                    <Button
                        type="button"
                        className="w-full cursor-pointer text-base font-bold"
                        size="lg"
                        onClick={() => profileFormRef.current?.requestSubmit()}
                    >
                        Save
                    </Button>
                    <Button
                        variant="link"
                        type="button"
                        className="cursor-pointer text-base"
                        onClick={() => {
                            setStep(1);
                        }}
                    >
                        Back to find your account
                    </Button>
                </div>
            </div>
        </div>
    );
}
