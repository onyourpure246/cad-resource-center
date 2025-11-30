import { HeaderProps } from '@/types/common'
import React from 'react'

const Header = ({
    title,
    description,
    children
}: HeaderProps) => {
    return (
        <>
            <div className='bg-sidebar h-auto md:h-[160px] flex items-center justify-around'>
                <div className='container mx-auto max-w-[1320px] p-8 flex flex-col md:flex-row md:justify-between md:items-center'>
                    <div className='md:w-2/3'>
                        <h1 className=' text-4xl font-semibold'>{title}</h1>
                        <p className=' font-size-[16px] my-2'>{description}</p>
                    </div>
                    <div>
                        {children}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header