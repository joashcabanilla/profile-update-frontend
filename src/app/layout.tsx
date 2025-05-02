import type { Metadata } from "next";

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
        >
            <body>{children}</body>
        </html>
    );
}
