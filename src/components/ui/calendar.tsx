import { DayPicker, getDefaultClassNames } from "react-day-picker";

export function Calendar({ ...props }: React.ComponentProps<typeof DayPicker>) {
    const defaultClassNames = getDefaultClassNames();
    console.log(defaultClassNames);
    const classNames = {
        root: `${defaultClassNames.root} px-2`,
        today:`${defaultClassNames.today} bg-primary text-foreground rounded-2xl`,
    };
    return (
        <DayPicker
            classNames={classNames}
            animate
            captionLayout="dropdown"
            navLayout="after"
            defaultMonth={new Date()}
            startMonth={new Date(1960, 0)}
            {...props}
        />
    );
}
