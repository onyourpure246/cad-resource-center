import React from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { SubmitButtonProps } from '@/types/common'

export const SubmitButton = ({
    className,
    size,
    text,
    disabled,
    variant,
    onClick
}: SubmitButtonProps) => {

    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending || disabled}
            size={size}
            type='submit'
            variant={variant}
            onClick={onClick}
            className={`${className} capitalize`}>
            {
                pending
                    ? <>
                        <LoaderCircle className="animate-spin" />
                        <span> Please wait...</span>
                    </>
                    : <p>{text}</p>
            }
        </Button>
    )
}