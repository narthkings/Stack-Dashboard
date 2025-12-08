"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CgChevronDown } from "react-icons/cg";

type Option = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    className?: string;
}

const MultiSelect = ({
    options,
    value,
    onChange,
    placeholder = "Select options",
    className,
}: MultiSelectProps) => {
    const [open, setOpen] = useState(false);

    const toggleOption = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const selectedLabels = value
        .map((val) => options.find((o) => o.value === val)?.label)
        .filter(Boolean)
        .join(", ");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size={'lg'}
                    variant="ghost"
                    className={cn(
                        "w-full justify-between bg-(--light-gray)",
                        className
                    )}
                >
                    {value.length === 0 ? placeholder : selectedLabels}
                    <CgChevronDown />
                </Button>
            </PopoverTrigger>

            <PopoverContent className=" w-(--radix-popover-trigger-width) p-0" align="start">
                <Command className="w-full">
                    <CommandGroup>
                        {options.map((opt) => {
                            const isChecked = value.includes(opt.value);

                            return (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => toggleOption(opt.value)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            className="data-[state=checked]:[&_svg]:stroke-white"
                                            checked={isChecked}
                                            onCheckedChange={() => toggleOption(opt.value)}
                                        />
                                        <span>{opt.label}</span>
                                    </div>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
export default MultiSelect;
