import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options: Option[];
    className?: string;
}

const SelectInput = ({
    name,
    label,
    placeholder = "Select an option",
    defaultValue,
    value,
    onValueChange,
    options,
    className
}: SelectInputProps) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <Label htmlFor={name} className='mb-1'>{label}</Label>}
            <Select name={name} defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectInput;
