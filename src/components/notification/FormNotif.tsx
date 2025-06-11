//style utils and variants
import { cn } from "@/lib/utils";

//icons
import { TriangleAlert, CircleAlert, CircleCheck } from "lucide-react";

interface FormNotifProps {
    message?: string;
    type?: "success" | "error" | "warning";
}

export function FormNotif({ message, type }: FormNotifProps) {
    const activeType = {
        success: <CircleCheck size={25} aria-hidden="true" />,
        error: <TriangleAlert size={25} aria-hidden="true" />,
        warning: <CircleAlert size={25} aria-hidden="true" />
    }[type || "success"];

    return !message ? null : (
        <div
            className={cn(
                "flex items-center gap-2 rounded-md p-2 text-sm font-semibold",
                type === "success" && "bg-primary/15 text-primary",
                type === "warning" && "bg-yellow-500/15 text-yellow-500",
                type === "error" && "bg-destructive/15 text-destructive"
            )}
        >
            {activeType}
            <p>{message}</p>
        </div>
    );
}
