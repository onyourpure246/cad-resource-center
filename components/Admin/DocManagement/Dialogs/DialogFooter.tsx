import React from 'react'

const DialogFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-end items-center gap-2 mt-4'>
            {children}
        </div>
    )
}

export default DialogFooter