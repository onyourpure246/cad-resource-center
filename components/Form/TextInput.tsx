import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { FormInputProps } from '@/types/common'

const TextInput = (props: FormInputProps) => {
    const
        {
            name,
            type,
            label,
            defaultValue,
            placeholder,
            required,
            pattern,
            title,
            errorMessage,
            disabled
        } = props;
    return (
        <div className='mb-2 flex flex-col gap-1'>
            <Label
                className='mb-1'
                htmlFor={name}> {label} </Label>

            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required={required}
                pattern={pattern}
                title={title}
                className={cn(errorMessage && 'border-red-500 focus-visible:ring-red-500')}
                disabled={disabled}
            />
            {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    )
}

export default TextInput