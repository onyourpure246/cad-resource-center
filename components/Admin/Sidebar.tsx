"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    FileText,
    Users,
    Megaphone,
    Settings
} from 'lucide-react'
import { useSidebar } from './SidebarContext'

const sidebarItems = [
    {
        title: 'จัดการรายการดาวน์โหลด',
        href: '/admin/documents',
        icon: FileText
    },
    {
        title: 'จัดการข้อมูลผู้ใช้งาน',
        href: '/admin/usermanagement',
        icon: Users
    },
    {
        title: 'ข้อมูลการใช้งานระบบ',
        href: '/admin/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'จัดการข้อมูลประชาสัมพันธ์',
        href: '/admin/announcement',
        icon: Megaphone
    }
]

const Sidebar = () => {
    const pathname = usePathname()
    const { isCollapsed } = useSidebar()

    return (
        <aside className={cn(
            "hidden md:flex flex-col min-h-[calc(100vh-80px)] bg-card p-4 bg-sidebar transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className="flex flex-col gap-2">
                <div className={cn("px-4 py-2 mb-2 transition-opacity duration-300", isCollapsed ? "opacity-0 hidden" : "opacity-100")}>
                    <h2 className="text-lg font-semibold tracking-tight text-foreground whitespace-nowrap">
                        ระบบสำหรับผู้ดูแล
                    </h2>
                </div>
                <nav className="flex flex-col gap-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                    isCollapsed && "justify-center px-2"
                                )}
                                title={isCollapsed ? item.title : undefined}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.title}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
