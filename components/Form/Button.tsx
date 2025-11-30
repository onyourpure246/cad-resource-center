import React from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { SubmitButtonProps } from '@/types/common'

export const SubmitButton = ({
    className,
    size,
    text
}: SubmitButtonProps) => {

    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending}
            size={size}
            type='submit'
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