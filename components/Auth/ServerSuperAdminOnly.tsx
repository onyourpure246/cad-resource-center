import React from 'react';
import { auth } from '@/auth';
import { isSuperAdminRole } from '@/lib/auth-helpers';

interface ServerSuperAdminOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * ServerSuperAdminOnly Component (Server Component)
 * Wraps any experimental or unreleased feature UI on the server side.
 * Renders `children` ONLY if the logged in user is strictly a `superadmin`.
 * 
 * Usage:
 * <ServerSuperAdminOnly>
 *     <MyNewExperimentalSection />
 * </ServerSuperAdminOnly>
 */
export default async function ServerSuperAdminOnly({ children, fallback = null }: ServerSuperAdminOnlyProps) {
    const session = await auth();

    if (!isSuperAdminRole(session)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
