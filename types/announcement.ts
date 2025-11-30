export interface Announcement {
    id: string | number;
    title: string;
    description?: string;
    categoryVariant?: "default" | "secondary" | "destructive" | "outline"; // Added optional variant
    status: 'Published' | 'Draft';
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    content?: string; // Added optional content as it appeared in some usages
    date?: string; // Added optional date
    category?: string; // Added optional category
}

export interface AnnouncementTableProps {
    announcements: Announcement[];
    isLoading: boolean;
}
