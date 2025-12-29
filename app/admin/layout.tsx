import Sidebar from '@/components/Admin/Sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    // Check role, if not admin redirect to home
    if (!session?.user) {
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
