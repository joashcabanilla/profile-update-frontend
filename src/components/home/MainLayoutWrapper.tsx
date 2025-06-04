"use client";

//context global state
import MemberContextProvider from "@/context/member-context";
import MainLayout from "@/components/home/MainLayout";

//types
import { Member } from "@/types/type";

interface MainLayoutWrapperProps {
    member: Member[];
}
export default function MainLayoutWrapper({ member }: MainLayoutWrapperProps) {
    return (
        <MemberContextProvider>
            <MainLayout member={member} />
        </MemberContextProvider>
    );
}
