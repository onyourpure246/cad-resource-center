"use client"

import { HeaderProps } from '@/types/common'
import React from 'react'
import { Button } from '@/components/ui/button'
import { PanelLeft } from 'lucide-react'
import { useSidebar } from '@/components/Admin/SidebarContext'
import { usePathname } from 'next/navigation'

const Header = ({
    title,
    children
}: HeaderProps) => {
    const { toggleSidebar } = useSidebar()
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    return (
        <div className='h-auto flex items-center justify-between px-4 py-2'>
            <div className='flex gap-4'>
                {isAdmin && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <PanelLeft className="w-5 h-5" />
                    </Button>
                )}
                <h1 className='text-2xl font-semibold text-foreground'>{title}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Header