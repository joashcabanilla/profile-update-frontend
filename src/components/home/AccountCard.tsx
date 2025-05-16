//style utils and variants
import { cn } from "@/lib/utils";
import { text, card } from "@/lib/variants";

//components
import { Button } from "@/components/ui/button";

//context global state
import { useMemberContext } from "@/context/member-context";

export default function AccountCard() {
    const { searchedMember, setStep, setMemberId } = useMemberContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = e.currentTarget.dataset.memberid;
        setMemberId(id);
        setStep(2);
    };

    return (
        <>
            {searchedMember.length === 0 ? (
                <p className="text-center">Record not found.</p>
            ) : (
                searchedMember.map((data) => {
                    const { id, pbno, memid, firstname, middlename, lastname } =
                        data;
                    let name = `${firstname} ${middlename ?? ""} ${lastname}`;
                    name = name.replace("�", "ñ");
                    const pbnoData = pbno || "No Data";
                    const memidData = memid || "No Data";

                    return (
                        <div
                            key={id}
                            className={cn(
                                card({ variant: "searchAccount" }),
                                text({ size: "lg" }),
                                "grid gap-4 p-4 sm:grid-cols-4"
                            )}
                        >
                            <div className="[&_strong]:text-primary grid gap-1 font-bold sm:col-span-3 [&_strong]:font-bold">
                                <h5>
                                    Name: <strong>{name}</strong>
                                </h5>
                                <h5>
                                    PB#:{" "}
                                    <strong
                                        className={cn(
                                            pbnoData === "No Data" &&
                                                "!text-foreground/70"
                                        )}
                                    >
                                        {pbnoData}
                                    </strong>
                                </h5>
                                <h5>
                                    Member ID:{" "}
                                    <strong
                                        className={cn(
                                            memidData === "No Data" &&
                                                "!text-foreground/70"
                                        )}
                                    >
                                        {memidData}
                                    </strong>
                                </h5>
                            </div>
                            <div className="self-center sm:justify-self-end">
                                <Button
                                    data-memberid={id}
                                    type="button"
                                    size="xl"
                                    className="w-full text-base font-extrabold sm:w-fit sm:text-lg"
                                    onClick={handleClick}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}
