import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";
import { useId, useState } from "react";
import { CircleX, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchAccount() {
    const id = useId();
    const [searchInput, setSearchInput] = useState<string>("");

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
                                className="peer text-foreground h-12 rounded-xl border-2 ps-9 pe-9 indent-2 text-sm font-extrabold placeholder:font-normal sm:text-lg"
                                placeholder="Enter PB# or Member ID"
                                type="search"
                                value={searchInput}
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSearchInput(e.currentTarget.value);
                                }}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <SearchIcon size={25} />
                            </div>
                            <button
                                className={cn(
                                    "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 transition-[color,box-shadow, opacity] absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md delay-100 ease-[cubic-bezier(0.42,0,1,1)] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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
                        className="h-50 w-full rounded-lg border-2 shadow"
                    >
                        <div className="grid gap-4 p-2 sm:p-4">
                            <div
                                className={cn(
                                    card({ variant: "searchAccount" })
                                )}
                            >
                                <h3>Name: Joash Cabanilla</h3>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
