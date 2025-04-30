import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NOVADECI | Profile Update",
    description: "Developed by Joash Cabanilla",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
