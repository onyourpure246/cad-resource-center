import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminLayoutClient from '@/components/Admin/AdminLayoutClient'
import { isAdminRole } from '@/lib/auth-helpers'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    // Check role, if not admin or superadmin redirect to home
    if (!isAdminRole(session)) {
        redirect('/')
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
