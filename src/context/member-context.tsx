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
    const [step, setStep] = useState<MemberContext["step"]>(1);
    const [stepCompleted, setStepCompleted] =
        useState<MemberContext["stepCompleted"]>(false);
    const [memberId, setMemberId] =
        useState<MemberContext["memberId"]>(undefined);

    return (
        <memberContext.Provider
            value={{
                member,
                setMember,
                searchedMember,
                setSearchedMember,
                step,
                setStep,
                stepCompleted,
                setStepCompleted,
                memberId,
                setMemberId
            }}
        >
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
