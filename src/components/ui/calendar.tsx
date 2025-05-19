import { DayPicker, getDefaultClassNames } from "react-day-picker";

export function Calendar({ ...props }: React.ComponentProps<typeof DayPicker>) {
    const classname = getDefaultClassNames();
    return (
        <DayPicker
            classNames={{
                chevron: `${classname.chevron} !fill-primary`,
                today: "font-extrabold text-primary",
                selected:
                    "font-extrabold bg-primary !text-primary-foreground rounded-lg text-lg",
                dropdowns: `${classname.dropdowns} !gap-4`
            }}
            animate
            captionLayout="dropdown"
            navLayout="after"
            defaultMonth={new Date()}
            startMonth={new Date(1960, 0)}
            autoFocus={false}
            {...props}
        />
    );
}
