import Sidebar from '@/components/Admin/Sidebar'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await currentUser();
    // Check role, if not admin redirect to home
    if (user?.publicMetadata?.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-primary dark:bg-sidebar">
            <Sidebar />
            <main className="flex-1 p-6 md:px-8 md:py-4 overflow-y-auto w-full bg-background rounded-tl-3xl border-t border-l border-border">
                {children}
            </main>
        </div>
    )
}
