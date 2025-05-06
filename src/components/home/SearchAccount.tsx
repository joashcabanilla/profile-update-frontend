import { cn } from "@/lib/utils";
import { text } from "@/lib/variants";

export default function SearchAccount() {
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
                            size: "md",
                            weight: "md"
                        })
                    )}
                >
                    Find your account
                </h1>
                <div className="grid gap-2">
                    <div className=""></div>
                </div>
            </div>
        </div>
    );
}
