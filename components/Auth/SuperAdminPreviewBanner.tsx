'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface SuperAdminPreviewBannerProps {
    featureName?: string;
    badgeLabel?: string;
}

/**
 * SuperAdminPreviewBanner Component
 * Clean reusable banner component for Super Admin experimental preview features.
 */
export default function SuperAdminPreviewBanner({
    featureName = "หน้า Home รูปแบบใหม่ (50% ข่าวประกาศ / 50% ชุดคำสั่งอัปเดตล่าสุด 3 หมวด)",
    badgeLabel = "Experimental"
}: SuperAdminPreviewBannerProps) {
    return (
        <div className="mb-6 flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center gap-2 text-primary font-medium">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                <span>Preview Feature (Super Admin Only): {featureName}</span>
            </div>
            <Badge variant="outline" className="text-[10px] bg-background shrink-0">
                {badgeLabel}
            </Badge>
        </div>
    );
}
