'use client';

import { createColumnHelper } from '@/components/DataTable/columnHelper';
import { User } from '@/types/user';

const helper = createColumnHelper<User>();

export const getUserColumns = (onEdit?: (user: User) => void) => [
    helper.custom({
        accessorKey: 'firstname',
        header: <span className="font-bold uppercase tracking-wider text-muted-foreground">ชื่อ-นามสกุล</span>,
        headerClassName: "text-left",
        className: "font-medium truncate max-w-[1px] text-left",
        cell: (item) => <div className="truncate">{item.firstname} {item.lastname || ''}</div>,
    }),
    helper.text('jobtitle', 'ตำแหน่ง', {
        headerClassName: "w-[240px] text-left hidden md:table-cell",
        className: "w-[240px] text-left hidden md:table-cell",
    }),
    helper.status('role', 'สิทธิ์การใช้งาน', {
        headerClassName: "w-[140px] text-left hidden sm:table-cell",
        className: "w-[140px] text-left hidden sm:table-cell",
        mapping: {
            admin: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
            editor: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-transparent',
            user: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-transparent',
        }
    }),
    helper.status('status', 'สถานะบัญชี', {
        headerClassName: "w-[140px] text-left",
        className: "w-[140px] text-left",
        mapping: {
            active: 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent',
            inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-transparent',
            suspended: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
        }
    }),
    helper.date('updated_at', 'แก้ไขเมื่อ', {
        headerClassName: "w-[140px] text-left hidden lg:table-cell",
        className: "w-[140px] text-left text-muted-foreground text-sm hidden lg:table-cell",
    }),
    helper.actions({
        headerClassName: "w-[50px]",
        className: "w-[50px] text-right",
        onEdit: (user) => onEdit?.(user),
        // onDelete: () => {/* Add delete logic */ }, 
        editLabel: "แก้ไขข้อมูล",
        deleteLabel: "ลบบัญชี",
        align: "end"
    })
];
