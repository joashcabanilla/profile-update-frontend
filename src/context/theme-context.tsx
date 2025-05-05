"use client";

import { createContext, useContext, useState } from "react";

type ThemeContextProviderProps = {
    children: React.ReactNode;
};

type Theme = "light" | "dark";

type ThemeContext = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    mounted: boolean;
    setMounted: React.Dispatch<React.SetStateAction<boolean>>;
};

const themeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
    children
}: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState<boolean>(false);

    return (
        <themeContext.Provider value={{ theme, setTheme, mounted, setMounted }}>
            {children}
        </themeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(themeContext);
    if (!context) {
        throw new Error(
            "useThemeContext must be used within ThemeContextProvider"
        );
    }
    return context;
}
