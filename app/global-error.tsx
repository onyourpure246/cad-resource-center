'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/ui/error-state';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <ErrorState
                    title="Critical Error"
                    description="A critical error occurred and the application cannot recover."
                    retry={reset}
                />
            </body>
        </html>
    );
}
