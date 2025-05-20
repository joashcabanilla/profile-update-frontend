"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronDownIcon } from "lucide-react";
import { DropdownProps } from "react-day-picker";

export function Calendar({ ...props }: React.ComponentProps<typeof DayPicker>) {
    const classname = getDefaultClassNames();
    return (
        <DayPicker
            classNames={{
                chevron: `${classname.chevron} !fill-primary`,
                today: "font-extrabold text-primary",
                selected:
                    "font-extrabold bg-primary !text-primary-foreground rounded-lg text-lg",
                dropdowns: `${classname.dropdowns} !gap-2`
            }}
            animate
            captionLayout="dropdown"
            navLayout="after"
            defaultMonth={new Date()}
            startMonth={new Date(1960, 0)}
            autoFocus={false}
            components={{
                Dropdown: (props: DropdownProps) => {
                    return (
                        <div className="relative">
                            <select
                                defaultValue={props.value}
                                onChange={props.onChange}
                                className="peer appearance-none rounded-lg border p-1 pe-7 text-base shadow-2xs"
                            >
                                {props.options?.map((option, id) => (
                                    <option key={id} value={option.value}>
                                        {option.label ?? option.value}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 end-0 flex items-center justify-center px-1">
                                <ChevronDownIcon
                                    size={20}
                                    className="text-primary"
                                />
                            </div>
                        </div>
                    );
                }
            }}
            {...props}
        />
    );
}
