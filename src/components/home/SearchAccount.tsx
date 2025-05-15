"use client";

//style utils and variants
import { cn } from "@/lib/utils";
import { text, button } from "@/lib/variants";
import { useId, useState, useRef } from "react";

//icons
import { CircleX, SearchIcon } from "lucide-react";

//components
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountCard from "@/components/home/AccountCard";

//context global state
import { useMemberContext } from "@/context/member-context";

export default function SearchAccount() {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const { member, setSearchedMember } = useMemberContext();

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        const search = e.currentTarget.value;

        const filteredMember = member.filter((data) => {
            return data.pbno === search || data.memid === search;
        });
        setSearchedMember(filteredMember);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputRef.current?.blur();
        }
    };

    return (
        <div className="grid gap-6">
            <div
                className={cn(
                    text({
                        font: "mono",
                        align: "left",
                        size: "md",
                        weight: "sm"
                    }),
                    "border-primary bg-muted grid gap-2 rounded-2xl border border-dashed p-2 [&_strong]:font-extrabold"
                )}
            >
                <p>
                    <strong>Note 1:</strong> Example format for{" "}
                    <strong>PB number &ldquo;001234&ldquo; no Dash(-)</strong>,
                    kapag may letra naman <strong>&ldquo;N001234&ldquo;</strong>{" "}
                    at kung{" "}
                    <strong>Member ID &ldquo;0010000000123456&ldquo;</strong>,
                    ang i lalagay lang ang
                    <strong> 123456</strong>
                </p>
                <p>
                    <strong>Note 2:</strong>{" "}
                    <strong>Priority ang Old Passbook sa pag verify.</strong>
                </p>
            </div>

            <div className="grid gap-2">
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
                    Find your account
                </h1>
                <div className="grid gap-2">
                    <div className="*:not-first:mt-2">
                        <div className="relative">
                            <Input
                                id={id}
                                ref={inputRef}
                                className="peer text-foreground h-12 rounded-xl border-2 ps-9 pe-9 indent-2 text-sm font-extrabold placeholder:font-normal sm:text-lg"
                                placeholder="Enter PB# or Member ID"
                                type="search"
                                value={searchInput}
                                onInput={handleSearchInput}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <SearchIcon size={25} />
                            </div>
                            <button
                                className={cn(
                                    button({
                                        variant: "closeIcon"
                                    }),
                                    searchInput
                                        ? "cursor-pointer opacity-100"
                                        : "pointer-events-none opacity-0"
                                )}
                                aria-label="Submit search"
                                type="submit"
                                onClick={() => {
                                    setSearchInput("");
                                }}
                            >
                                <CircleX size={20} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <ScrollArea
                        type="always"
                        className="h-80 w-full rounded-lg border-2 shadow sm:h-60"
                    >
                        <div className="grid gap-4 p-4 sm:p-6">
                            {!searchInput ? (
                                <p className="text-muted-foreground font-jetbrains text-center text-sm italic">
                                    This section shows your search results. If
                                    you see multiple accounts due to duplicate
                                    PB# or Member ID, select your own account
                                    from the list.
                                </p>
                            ) : (
                                <AccountCard />
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
