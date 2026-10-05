'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { isSuperAdminRole } from '@/lib/auth-helpers';

interface SuperAdminOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * SuperAdminOnly Component (Client Component)
 * Wraps any experimental or unreleased feature UI.
 * Renders `children` ONLY if the logged in user is strictly a `superadmin`.
 * 
 * Usage:
 * <SuperAdminOnly>
 *     <MyNewExperimentalFeature />
 * </SuperAdminOnly>
 */
export default function SuperAdminOnly({ children, fallback = null }: SuperAdminOnlyProps) {
    const { data: session } = useSession();

    if (!isSuperAdminRole(session)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
