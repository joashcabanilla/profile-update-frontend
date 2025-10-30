"use client";

//context global state
import MemberContextProvider from "@/context/member-context";
import MainLayout from "@/components/home/MainLayout";

export default function MainLayoutWrapper() {
  return (
    <MemberContextProvider>
      <MainLayout />
    </MemberContextProvider>
  );
}
