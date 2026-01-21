import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    mapping?: Record<string, string>;
}

const defaultStatusColorMapping: Record<string, string> = {
    // General Status
    active: 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent',
    inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-transparent',
    suspended: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',

    // Publication Status
    published: 'bg-emerald-500 text-white hover:bg-emerald-600 border-none', // User preferred vibrant green
    draft: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border-amber-200/50',
    archived: 'bg-muted text-muted-foreground hover:bg-muted border-transparent',

    // Announcement Categories
    'ประชาสัมพันธ์': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/50',
    'news': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/50',
    'กิจกรรม': 'bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/50',
    'activity': 'bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/50',
    'แจ้งเตือนระบบ': 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20',
    'system': 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20',
    'ระเบียบ/คำสั่ง': 'bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border-sky-200/50',
    'official': 'bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border-sky-200/50',

    // Roles
    admin: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
    editor: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-transparent',
    user: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-transparent',
};

const StatusBadge = ({
    status,
    className,
    variant = "secondary",
    mapping = defaultStatusColorMapping
}: StatusBadgeProps) => {
    // Normalize status key for lookup (lowercase)
    const statusKey = status.toLowerCase();

    // Get custom class from mapping, fallback to empty string if not found
    const colorClass = mapping[statusKey] || '';

    return (
        <Badge
            variant={variant}
            className={cn("capitalize font-normal", colorClass, className)}
        >
            {status}
        </Badge>
    );
};

export default StatusBadge;
