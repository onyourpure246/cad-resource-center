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

export const ANNOUNCEMENT_TABS = [
    {
        value: "all",
        label: "ทั้งหมด",
        activeColor: "bg-primary text-primary-foreground",
    },
    {
        value: "published",
        label: "เผยแพร่แล้ว",
        activeColor: "bg-emerald-500 text-white hover:bg-emerald-600 border-none",
    },
    {
        value: "draft",
        label: "ฉบับร่าง",
        activeColor: "bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25 border-amber-200/50",
    },
    {
        value: "archived",
        label: "จัดเก็บแล้ว",
        activeColor: "bg-muted text-muted-foreground hover:bg-muted border-transparent",
    }
];
