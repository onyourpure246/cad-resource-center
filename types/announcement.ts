import { State } from './common';

export type AnnouncementStatus = 'Published' | 'Draft' | 'Archived';

export interface Announcement {
    id: string | number;
    title: string; // หัวข้อ
    content: string; // รายละเอียด
    categoryVariant?: "default" | "secondary" | "destructive" | "outline"; // ประเภท (สีของ badge)
    status: AnnouncementStatus; // สถานะ (Published/Draft/Archived)
    created_by: string; // ผู้สร้าง
    created_at: string; // วันที่สร้าง
    updated_by?: string; // ผู้แก้ไขล่าสุด
    updated_at: string; // วันที่อัปเดต
    publish_date?: string; // วันที่ประกาศ
    category?: string; // หมวดหมู่
    cover_image?: string; // รูปภาพหน้าปก
    view_count?: number; // ยอดเข้าชม
    is_urgent?: number | boolean; // ประกาศด่วน (0 = ปกติ, 1 = ด่วน)
}

export interface AnnouncementTableProps {
    announcements: Announcement[];
    isLoading: boolean;
    actionButtons?: React.ReactNode;
}

export interface AnnouncementFormProps {
    announcement?: Announcement; // Optional: If present, it's Edit Mode. If missing, it's Create Mode.
    className?: string;
}


export interface AnnouncementFormState extends State {
    targetStatus?: string;
    timestamp?: number;
}

export interface PreviewSectionProps {
    announcement?: Announcement;
    title: string;
    contentHTML: string;
    category: string;
    previewImage: string | null;
    currentStatus: AnnouncementStatus;
}

export interface InputSectionProps {
    isCreateMode: boolean;
    isReadOnly: boolean;
    currentStatus: AnnouncementStatus;
    isPublished: boolean;
    isArchived: boolean;
    announcement?: Announcement;
    title: string;
    setTitle: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    isUrgent: boolean;
    setIsUrgent: (value: boolean) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EditorSectionProps {
    isReadOnly: boolean;
    contentHTML: string;
    setContentHTML: (html: string) => void;
}

export interface FormActionsProps {
    isReadOnly: boolean;
    isEditMode: boolean;
    isPublished: boolean;
    isArchived: boolean;
    onArchive: () => void;
    onPublish: () => void;
    onUnpublish: () => void;
    onRestore: () => void;
}
