import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CategorySelectProps } from '@/types/common'

const CategorySelect = ({
    name,
    label,
    placeholder,
    defaultValue,
    className,
    categories
}: CategorySelectProps) => {
    return (
        <div className='mb-2 flex flex-col gap-1'>
            <Label htmlFor={name} className='mb-1'>{label}</Label>
            <Select
                name={name}
                defaultValue={defaultValue || categories?.[0]?.CATEGORY_NAME}>

                <SelectTrigger
                    className={cn("w-full md:w-[230px]", className)}>
                    <SelectValue
                        placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {categories?.map((item) => (
                        <SelectItem
                            key={item.CATEGORY_ID}
                            value={item.CATEGORY_NAME}>
                            <span className='capitalize flex items-center gap-x-2'>
                                {item.CATEGORY_NAME}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default CategorySelect