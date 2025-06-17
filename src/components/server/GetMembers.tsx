import MainLayoutWrapper from "@/components/home/MainLayoutWrapper";

//types
import { Member } from "@/types/type";

import { getAllMembers } from "@/db/models/member";

export default async function GetMembers() {
    const members = await getAllMembers();
    if (members) {
        const member = JSON.parse(members) as Member[];
        return <MainLayoutWrapper member={member} />;
    }
}
