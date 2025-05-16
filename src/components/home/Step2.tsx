"use client";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";

//components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

//context global state
import { useMemberContext } from "@/context/member-context";

//types
import { Member } from "@/types/type";

export default function Step2() {
    const { memberId, searchedMember } = useMemberContext();

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
                    "grid gap-4 [&_input]:h-12 [&_input]:border-2 [&_input]:font-bold [&_input]:shadow-none [&_label]:text-base [&_label]:font-bold [&input]:text-base"
                )}
            >
                <div className="*:not-first:mt-2">
                    <Label htmlFor="pbMemId">PB# / Member ID</Label>
                    <Input
                        id="pbMemId"
                        className="rounded-2xl indent-0 disabled:opacity-100"
                        placeholder="PB# / Member ID"
                        type="text"
                        disabled
                        value={pbMemId}
                    />
                </div>
                <div className="*:not-first:mt-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                        id="birthdate"
                        className="rounded-2xl"
                        placeholder=""
                        type="date"
                    />
                </div>
            </div>
        </div>
    );
}
