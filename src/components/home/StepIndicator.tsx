"use client";

//components
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger
} from "@/components/ui/stepper";

//context global state
import { useMemberContext } from "@/context/member-context";

export default function StepIndicator() {
    const steps = [
        {
            step: 1,
            title: "Search"
        },
        {
            step: 2,
            title: "Sign In"
        },
        {
            step: 3,
            title: "Profile Update"
        }
    ];

    const { step, stepCompleted } = useMemberContext();

    return (
        <div className="w-full space-y-8 text-center">
            <Stepper defaultValue={1} value={step}>
                {steps.map(({ step, title }) => (
                    <StepperItem
                        key={step}
                        step={step}
                        completed={stepCompleted}
                        className="not-last:flex-1 max-md:items-start"
                    >
                        <StepperTrigger className="pointer-events-none rounded max-md:flex-col">
                            <StepperIndicator />
                            <div className="text-center md:text-left">
                                <StepperTitle className="font-poppins font-bold">{title}</StepperTitle>
                            </div>
                        </StepperTrigger>
                        {step < steps.length && <StepperSeparator className="max-md:mt-3.5 md:mx-4" />}
                    </StepperItem>
                ))}
            </Stepper>
        </div>
    );
}
