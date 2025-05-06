import { tv } from "tailwind-variants";

export const container = tv({
    base: "container mx-auto p-4 sm:p-6"
});

export const card = tv({
    base: "bg-card text-card-foreground rounded-2xl border p-4 shadow-2xl sm:p-6",
    variants: {
        align: {
            center: "mx-auto mt-6 mb-6"
        },
        size: {
            maxWidth650px: "max-w-[650px]"
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
