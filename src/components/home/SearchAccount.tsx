import { cn } from "@/lib/utils";
import { text } from "@/lib/variants";
import { useId } from "react";
import { Input } from "@/components/ui/input";

export default function SearchAccount() {
    const id = useId();
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

            <div className="grid gap-3">
                <h1
                    className={cn(
                        text({
                            font: "title",
                            align: "left",
                            size: "md",
                            weight: "md"
                        })
                    )}
                >
                    Find your account
                </h1>
                <div className="grid gap-2">
                    <div className="group relative">
                        <label
                            htmlFor={id}
                            className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-normal has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
                        >
                            <span className="inline-flex px-2 bg-card text-base">
                                Enter PB number or Member Id
                            </span>
                        </label>
                        <Input id={id} type="email" placeholder=" "  className="h-13 text-xl text-foreground font-extrabold"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
