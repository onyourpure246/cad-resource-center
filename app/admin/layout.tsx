import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminLayoutClient from '@/components/Admin/AdminLayoutClient'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    // Check role, if not admin redirect to home
    if (!session?.user || session.user.role !== 'admin') {
        redirect('/')
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
