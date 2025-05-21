"use client";

//hooks
import Form from "next/form";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member, updateProfileInput } from "@/types/type";

export default function Step3() {
    const { memberId, searchedMember, setStep } = useMemberContext();

    const memberData: Member[] = searchedMember.filter(
        (data) => data.id == memberId && data
    );

    const { memid, pbno, firstname, middlename, lastname, branch } =
        memberData[0];

    const memberInfo: updateProfileInput[][] = [
        [
            {
                id: "pbno",
                label: "PB#",
                value: pbno ?? "No Data",
                class: pbno ? "text-foreground" : "text-muted-foreground",
                disabled: true
            },
            {
                id: "memid",
                label: "Member ID",
                value: memid ?? "No Data",
                class: memid ? "text-foreground" : "text-muted-foreground",
                disabled: true
            }
        ],
        [
            {
                id: "memberName",
                label: "Name",
                value: `${firstname} ${middlename ?? ""} ${lastname}`,
                disabled: true
            },
            {
                id: "branch",
                label: "Branch",
                value: branch.toUpperCase(),
                disabled: true
            },
            {
                id: "cpnumber",
                label: "Contact No.",
                disabled: false
            },
            {
                id: "emial",
                label: "Email",
                disabled: false
            },
            {
                id: "tin",
                label: "Tin No.",
                disabled: false
            }
        ]
    ];

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
            >
                <Form action="">
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
                                            type="text"
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
                                        <Label htmlFor={field.id}>
                                            {field.label}
                                        </Label>
                                        <Input
                                            id={field.id}
                                            placeholder={
                                                field.id != "cpnumber"
                                                    ? field.label
                                                    : "ex.09xxxxxxxxx"
                                            }
                                            type="text"
                                            value={field.value}
                                            disabled={field.disabled}
                                            className={cn(
                                                field.disabled
                                                    ? "bg-primary/3"
                                                    : "",
                                                field.id == "cpnumber"
                                                    ? "placeholder:font-jetbrains"
                                                    : ""
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </Form>

                <div className="mt-2 flex flex-col sm:flex-row-reverse sm:justify-between">
                    <Button
                        type="button"
                        className="w-full cursor-pointer text-base font-bold"
                        size="lg"
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
