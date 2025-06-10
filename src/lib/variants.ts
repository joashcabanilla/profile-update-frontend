import { tv } from "tailwind-variants";

export const container = tv({
    base: "container mx-auto p-4 sm:p-6"
});

export const card = tv({
    base: "bg-card text-card-foreground",
    variants: {
        align: {
            center: "mx-auto mt-4 mb-4 sm:mt-0 sm:mb-0"
        },
        variant: {
            maxWidth650px: "max-w-[650px] rounded-2xl border p-4 shadow-2xl sm:p-6",
            searchAccount:
                "bg-accent/20 text-accent-foreground w-full rounded-lg border p-2 text-lg font-bold shadow-xs",
            signIn: "w-full rounded-lg border-2 p-4 shadow"
        }
    }
});

export const text = tv({
    variants: {
        size: {
            sm: "text-xs sm:text-sm",
            md: "text-sm sm:text-base",
            lg: "text-base sm:text-lg",
            xl: "text-xl sm:text-2xl"
        },
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right"
        },
        weight: {
            sm: "font-normal",
            md: "font-bold",
            lg: "font-extrabold",
            xl: "font-black"
        },
        font: {
            mono: "font-jetbrains",
            title: "font-poppins"
        }
    },
    defaultVariants: {
        size: "md",
        align: "left",
        weight: "md"
    }
});

export const button = tv({
    variants: {
        variant: {
            closeIcon:
                "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 transition-[color,box-shadow, opacity] absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md delay-100 ease-[cubic-bezier(0.42,0,1,1)] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        }
    }
});
