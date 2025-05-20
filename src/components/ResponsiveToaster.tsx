"use client";

import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function ResponsiveToaster() {
    const [position, setPosition] = useState<"top-right" | "bottom-right">(
        "top-right"
    );

    useEffect(() => {
        const updatePosition = () => {
            if (window.innerWidth < 600) {
                setPosition("top-right");
                
            } else {
                setPosition("bottom-right");
            }
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    return <Toaster richColors closeButton position={position} />;
}
