"use client";
import { createContext, useContext, useState } from "react";
import { MemberContext, MemberContextProviderProps } from "@/types/type";

const memberContext = createContext<MemberContext | null>(null);

export default function MemberContextProvider({
    children
}: MemberContextProviderProps) {
    const [member, setMember] = useState<MemberContext["member"]>([]);
    const [searchedMember, setSearchedMember] = useState<
        MemberContext["searchedMember"]
    >([]);
    return (
        <memberContext.Provider value={{ member, setMember, searchedMember, setSearchedMember }}>
            {children}
        </memberContext.Provider>
    );
}

export function useMemberContext() {
    const context = useContext(memberContext);
    if (!context) {
        throw new Error(
            "useMemberContext must be used within MemberContextProvider"
        );
    }
    return context;
}
