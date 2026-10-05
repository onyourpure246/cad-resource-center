import { Session } from 'next-auth';

/**
 * Checks if the current user session has strictly the 'superadmin' role.
 * Used to guard experimental/unreleased features under active development.
 */
export function isSuperAdminRole(session: Session | null | undefined): boolean {
    if (!session?.user?.role) return false;
    return session.user.role.toLowerCase() === 'superadmin';
}

/**
 * Checks if the current user session has general admin rights (either 'admin' or 'superadmin').
 * Used to guard general admin management routes and operations.
 */
export function isAdminRole(session: Session | null | undefined): boolean {
    if (!session?.user?.role) return false;
    const role = session.user.role.toLowerCase();
    return role === 'admin' || role === 'superadmin';
}
