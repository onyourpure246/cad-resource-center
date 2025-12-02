import Sidebar from '@/components/Admin/Sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-sidebar">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full bg-background rounded-tl-3xl border-t border-l border-border">
                {children}
            </main>
        </div>
    )
}
