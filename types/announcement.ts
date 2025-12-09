export interface Announcement {
    id: string | number;
    title: string; // หัวข้อ
    content: string; // รายละเอียด
    categoryVariant?: "default" | "secondary" | "destructive" | "outline"; // ประเภท (สีของ badge)
    status: 'Published' | 'Draft'; // สถานะ (Published/Draft)
    createdBy: string; // ผู้สร้าง
    createdAt: string; // วันที่สร้าง
    updatedAt: string; // วันที่อัปเดต
    publishDate?: string; // วันที่ประกาศ
    category?: string; // หมวดหมู่
}

export interface AnnouncementTableProps {
    announcements: Announcement[];
    isLoading: boolean;
}
