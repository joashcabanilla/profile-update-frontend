"use client";

import { useState } from "react";
import { text } from "@/lib/variants";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export default function Terms() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(true);
    const defaultTextProps: object = {
        font: "mono",
        align: "left",
        size: "sm",
        weight: "sm"
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent
                hideCloseIcon={true}
                className="bg-card flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="font-jetbrains text-foreground border-b px-6 py-4 text-base">
                        Terms & Conditions
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="px-6 py-4">
                            <div className="[&_strong]:text-foreground [&_strong]:font-jetbrains space-y-4 [&_strong]:font-extrabold">
                                <div className="space-y-4">
                                    <div className="grid gap-2 space-y-1">
                                        <p>
                                            <strong>Acceptance of Terms</strong>
                                        </p>
                                        <div className="grid gap-6">
                                            <p
                                                className={text(
                                                    defaultTextProps
                                                )}
                                            >
                                                By filling out the{" "}
                                                <strong>
                                                    Member Profile Form
                                                </strong>
                                                , you are consenting to the
                                                collection, processing, and use
                                                of your information in
                                                accordance with Republic Act
                                                10173, or the Data Privacy Act
                                                of 2012.
                                            </p>

                                            <p
                                                className={text(
                                                    defaultTextProps
                                                )}
                                            >
                                                A member&apos;s personal data
                                                obtained from this portal is
                                                entered into and stored within
                                                the company&apos;s authorized
                                                information and communications
                                                system, and will be accessed
                                                only by authorized personnel
                                                from the strong MIS Department.
                                            </p>

                                            <p
                                                className={text(
                                                    defaultTextProps
                                                )}
                                            >
                                                The MIS Department has
                                                instituted appropriate
                                                organizational, technical, and
                                                physical security measures to
                                                ensure the protection of the
                                                member&apos;s personal data.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    <span className="text-muted-foreground font-jetbrains grow text-xs max-sm:text-center">
                        Read all terms before accepting.
                    </span>
                    <DialogClose asChild>
                        <Button type="button" size={"lg"} className="font-jetbrains font-extrabold">
                            I agree
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
