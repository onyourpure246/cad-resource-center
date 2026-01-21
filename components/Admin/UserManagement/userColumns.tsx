'use client';

import { createColumnHelper } from '@/utils/columnHelper';
import { User } from '@/types/user';

const helper = createColumnHelper<User>();

export const getUserColumns = () => [
    helper.text('username', 'ชื่อผู้ใช้ (Username)'),
    helper.custom({
        accessorKey: 'firstName',
        header: 'ชื่อ-นามสกุล',
        cell: (item) => <div>{item.firstName} {item.lastName || ''}</div>,
    }),
    helper.text('email', 'อีเมล'),
    helper.status('role', 'สิทธิ์การใช้งาน', {
        mapping: {
            admin: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
            editor: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-transparent',
            user: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-transparent',
        }
    }),
    helper.status('status', 'สถานะ', {
        mapping: {
            active: 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent',
            inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-transparent',
            suspended: 'bg-red-100 text-red-800 hover:bg-red-100 border-transparent',
        }
    }),
    helper.actions({
        onEdit: () => {/* Add edit logic */ },
        onDelete: () => {/* Add delete logic */ },
        editLabel: "แก้ไขข้อมูล",
        deleteLabel: "ลบบัญชี",
        align: "end"
    })
];
