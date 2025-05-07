import { cn } from "@/lib/utils";
import { container, card } from "@/lib/variants";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
    return (
        <div className={container()}>
            <div
                className={cn(
                    card({ align: "center", variant: "maxWidth650px" }),
                    "grid gap-8"
                )}
            >
                <div className="grid gap-4">
                    <div className="flex w-full items-center justify-between">
                        <Skeleton className="h-[70px] w-9/12 max-w-[300px]" />
                        <Skeleton className="h-[35px] w-2/12 sm:w-1/12" />
                    </div>
                    <Skeleton className="h-[40px] w-full" />
                </div>
                <Skeleton className="h-[60px] w-full" />
                <div className="grid gap-6">
                    <Skeleton className="h-[110px] w-full" />
                    <div className="grid gap-3">
                        <Skeleton className="h-[35px] w-4/12" />
                        <div className="grid gap-2">
                            <Skeleton className="h-[45px] w-full" />
                            <Skeleton className="h-50 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
