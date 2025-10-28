import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import ResponsiveToaster from "@/components/ResponsiveToaster";

//CSS and fonts
import "./globals.css";
import "react-day-picker/style.css";

import { poppins, jetbrains, inter } from "@/assets/fonts/fonts";

export const metadata: Metadata = {
    title: {
        default: "NOVADECI | Profile Update",
        template: "NOVADECI | %s"
    },
    description: "Developed by Joash Cabanilla"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${jetbrains.variable} ${poppins.variable} ${inter.className}`}
            suppressHydrationWarning
        >
            <head>
                <meta httpEquiv="cache-control" content="no-cache" />
                <meta httpEquiv="pragma" content="no-cache" />
                <meta httpEquiv="expires" content="0" />
            </head>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <ResponsiveToaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
