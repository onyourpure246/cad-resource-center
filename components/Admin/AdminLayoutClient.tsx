'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Admin/Sidebar';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Check if the current page is announcement create or edit
    const isEditorPage = pathname.includes('/admin/announcement/create') || 
                         (pathname.includes('/admin/announcement/') && pathname.endsWith('/edit'));

    if (isEditorPage) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-background w-full">
                <main className="w-full h-full">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-primary dark:bg-sidebar">
            <Sidebar />
            <main className="flex-1 p-6 md:px-8 md:py-4 overflow-y-auto w-full bg-background rounded-tl-3xl border-t border-l border-border">
                {children}
            </main>
        </div>
    );
}
