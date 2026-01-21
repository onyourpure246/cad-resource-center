export interface Announcement {
    id: string | number;
    title: string; // หัวข้อ
    content: string; // รายละเอียด
    categoryVariant?: "default" | "secondary" | "destructive" | "outline"; // ประเภท (สีของ badge)
    status: 'Published' | 'Draft'; // สถานะ (Published/Draft)
    created_by: string; // ผู้สร้าง
    created_at: string; // วันที่สร้าง
    updated_at: string; // วันที่อัปเดต
    publish_date?: string; // วันที่ประกาศ
    category?: string; // หมวดหมู่
    cover_image?: string; // รูปภาพหน้าปก
}

export interface AnnouncementTableProps {
    announcements: Announcement[];
    isLoading: boolean;
}
