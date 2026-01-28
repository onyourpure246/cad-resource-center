import { FileText, LayoutDashboard, Megaphone, Users } from "lucide-react";

export const ANNOUNCEMENT_CATEGORIES = [
    { label: "ประชาสัมพันธ์", value: "ประชาสัมพันธ์" },
    { label: "กิจกรรม", value: "กิจกรรม" },
    { label: "แจ้งเตือนระบบ", value: "แจ้งเตือนระบบ" },
    { label: "ระเบียบ/คำสั่ง", value: "ระเบียบ/คำสั่ง" }
];

export const sidebarItems = [
    {
        title: 'จัดการรายการดาวน์โหลด',
        href: '/admin/documents',
        icon: FileText
    },
    {
        title: 'จัดการข้อมูลผู้ใช้งาน',
        href: '/admin/usermanagement',
        icon: Users
    },
    {
        title: 'ข้อมูลการใช้งานระบบ',
        href: '/admin/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'จัดการข้อมูลประชาสัมพันธ์',
        href: '/admin/announcement',
        icon: Megaphone
    }
]