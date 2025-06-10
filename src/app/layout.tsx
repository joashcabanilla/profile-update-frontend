import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import ResponsiveToaster from "@/components/ResponsiveToaster";

//CSS and fonts
import "react-day-picker/style.css";
import "./globals.css";
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
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <ResponsiveToaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
