'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    description?: string;
    retry?: () => void;
    showReload?: boolean;
}

export default function ErrorState({
    title,
    description,
    retry,
    showReload = false,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-destructive/10 p-4 rounded-full mb-6">
                <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
                {title}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-[500px]">
                {description}
            </p>
            <div className="flex gap-4">
                {retry && (
                    <Button onClick={retry} variant="default">
                        Try again
                    </Button>
                )}
                {showReload && (
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Reload Page
                    </Button>
                )}
            </div>
        </div>
    );
}
