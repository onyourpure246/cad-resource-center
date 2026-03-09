'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export function SessionExpiredToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const hasToasted = useRef(false);

    useEffect(() => {
        if (searchParams.get('expired') === 'true' && !hasToasted.current) {
            hasToasted.current = true;

            // Use a short timeout to ensure the toast library is mounted
            const timer = setTimeout(() => {
                toast.error('เซสชันของคุณหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่', {
                    duration: 5000,
                });

                // Clear the NextAuth session cookies safely on the client side
                signOut({ redirect: false }).then(() => {
                    // Clean up the URL to prevent showing it again on refresh
                    router.replace(pathname);
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [searchParams, pathname, router]);

    return null;
}
