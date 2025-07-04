export interface switchThemeProps {
    resolvedTheme?: string;
}

export type MemberContextProviderProps = {
    children: React.ReactNode;
};

type setStateMember = React.Dispatch<React.SetStateAction<Member[]>>;

export type MemberContext = {
    member: Member[];
    setMember: setStateMember;
    searchedMember: Member[];
    setSearchedMember: setStateMember;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    stepCompleted: boolean;
    setStepCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    memberId: string | undefined;
    setMemberId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type Member = {
    id: string;
    memid: string | null;
    pbno: string | null;
    firstname: string;
    middlename: string | null;
    lastname: string;
    birthdate: Date;
    branch: string;
    cpNumber: string | null;
    email: string | null;
    tinNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export interface mainLayoutProps {
    member: Member[];
}

export type updateProfileInput = {
    id: string;
    type: string;
    label: string;
    value?: string;
    class?: string;
    clearClass?: string;
    disabled?: boolean;
    maxLength?: number;
    required?: boolean;
    ref?: React.Ref<HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
};

export type FormNotification = {
    message?: string;
    type?: "success" | "error" | "warning";
};

export type updateParameter = {
    id: string;
    cpNumber: string;
    email: string;
    tinNumber: string | null;
};