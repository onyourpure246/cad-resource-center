import React from 'react'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { TextAreaInputProps } from '@/types/common'

const TextAreaInput = (
    {
        name,
        label,
        defaultValue,
        placeholder,
        errorMessage
    }: TextAreaInputProps) => {
    return (
        <div className='mb-2 flex flex-col gap-1'>
            <Label htmlFor={name} className='mb-1 capitalize'>{label || name}</Label>
            <Textarea
                name={name}
                defaultValue={defaultValue}
                rows={5}
                required
                placeholder={placeholder}
            />
            {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
        </div>
    )
}

export default TextAreaInput