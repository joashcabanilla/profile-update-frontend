import { cn } from "@/lib/utils";
import { container, card } from "@/lib/variants";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return (
        <div className={container()}>
            <div
                className={cn(
                    card({ align: "center", size: "maxWidth650px" }),
                    "grid gap-6"
                )}
            >
                <div className="grid gap-4">
                    <div className="flex w-full items-center justify-between">
                        <Skeleton className="w-9/12 max-w-[300px] h-[80px]" />
                        <Skeleton className="w-2/12 h-[35px] sm:w-1/12" />
                    </div>
                    <Skeleton className="w-full h-[50px]" />
                </div>
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
                <Skeleton className="w-full h-[50px]" />
            </div>
        </div>
    );
}
