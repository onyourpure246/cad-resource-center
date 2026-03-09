'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import ErrorState from '@/components/ui/error-state';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (error.message === 'SESSION_EXPIRED') {
            signOut({ redirectTo: '/login?expired=true' });
            return;
        }
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <ErrorState
            title="เกิดข้อผิดพลาด"
            description="ขออภัยในความไม่สะดวก เกิดข้อผิดพลาดบางอย่างขึ้น กรุณาลองใหม่อีกครั้ง หรือติดต่อเจ้าหน้าที่หากยังพบปัญหา"
            retry={reset}
            showReload={true}
        />
    );
}
