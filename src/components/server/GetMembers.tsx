import MainLayoutWrapper from "@/components/home/MainLayoutWrapper";

//types
import { Member } from "@/types/type";

export default async function GetMembers() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const getMember = await fetch(`${baseUrl}/api/member`, {
        cache: "no-store"
    });

    let member: Member[] = [];

    if (!getMember.ok) {
        throw new Error("Failed to fetch member data");
    } else {
        const data = await getMember.json();
        member = JSON.parse(data);
    }

    return <MainLayoutWrapper member={member} />;
}
