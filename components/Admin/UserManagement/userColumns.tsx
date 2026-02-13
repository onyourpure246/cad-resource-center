'use client';

import { createColumnHelper } from '@/utils/columnHelper';
import { User } from '@/types/user';

const helper = createColumnHelper<User>();

export const getUserColumns = (onEdit?: (user: User) => void) => [
    helper.custom({
        accessorKey: 'username',
        header: 'ชื่อผู้ใช้ (Username)',
        headerClassName: "",
        className: "font-medium truncate max-w-[1px]",
        cell: (item) => {
            // Mask CID: 1-2345-67890-12-3 -> 1-XXXX-XXXXX-12-3
            const cid = item.username || '';
            if (cid.length === 13) {
                return <span>{`${cid.substring(0, 1)}-XXXX-XXXXX-${cid.substring(10, 12)}-${cid.substring(12)}`}</span>;
            }
            return cid;
        }
    }),
    helper.custom({
        accessorKey: 'firstname',
        header: 'ชื่อ-นามสกุล',
        headerClassName: "w-[200px] hidden md:table-cell",
        className: "w-[200px] hidden md:table-cell",
        cell: (item) => <div className="truncate">{item.firstname} {item.lastname || ''}</div>,
    }),
    helper.text('email', 'อีเมล', {
        headerClassName: "w-[200px] hidden lg:table-cell",
        className: "w-[200px] hidden lg:table-cell",
    }),
    helper.status('role', 'สิทธิ์การใช้งาน', {
        headerClassName: "w-[120px] hidden sm:table-cell",
        className: "w-[120px] hidden sm:table-cell",
        mapping: {
            admin: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
            editor: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-transparent',
            user: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-transparent',
        }
    }),
    helper.status('status', 'สถานะ', {
        headerClassName: "w-[100px]",
        className: "w-[100px]",
        mapping: {
            active: 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent',
            inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-transparent',
            suspended: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
        }
    }),
    helper.actions({
        onEdit: (user) => onEdit?.(user),
        // onDelete: () => {/* Add delete logic */ }, 
        editLabel: "แก้ไขข้อมูล",
        deleteLabel: "ลบบัญชี",
        align: "end"
    })
];
