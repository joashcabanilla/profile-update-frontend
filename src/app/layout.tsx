import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeContextProvider from "@/context/theme-context";

//CSS and fonts
import "./globals.css";
import { poppins, jetbrains, inter } from "@/assets/fonts/fonts";

export const metadata: Metadata = {
    title: "NOVADECI | Profile Update",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeContextProvider>{children}</ThemeContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
