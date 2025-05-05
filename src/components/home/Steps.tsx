import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger
} from "@/components/ui/stepper";

const steps = [
    {
        step: 1,
        title: "Search"
    },
    {
        step: 2,
        title: "Verify"
    },
    {
        step: 3,
        title: "Profile Update"
    }
];

export default function Steps() {
    return (
        <div className="w-full space-y-8 text-center">
            <Stepper defaultValue={1}>
                {steps.map(({ step, title }) => (
                    <StepperItem
                        key={step}
                        step={step}
                        className="not-last:flex-1 max-md:items-start"
                    >
                        <StepperTrigger className="rounded max-md:flex-col">
                            <StepperIndicator />
                            <div className="text-center md:text-left">
                                <StepperTitle className="font-poppins font-bold">
                                    {title}
                                </StepperTitle>
                            </div>
                        </StepperTrigger>
                        {step < steps.length && (
                            <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                        )}
                    </StepperItem>
                ))}
            </Stepper>
        </div>
    );
}
