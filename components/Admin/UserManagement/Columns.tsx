'use client';

import { DataTableColumn } from '@/types/common';
import { User } from '@/types/user';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getUserColumns = (): DataTableColumn<User>[] => [
    {
        accessorKey: 'username',
        header: 'ชื่อผู้ใช้ (Username)',
        cell: (item) => <div className="font-medium">{item.username}</div>,
    },
    {
        accessorKey: 'firstName',
        header: 'ชื่อ-นามสกุล',
        cell: (item) => <div>{item.firstName} {item.lastName || ''}</div>,
    },
    {
        accessorKey: 'email',
        header: 'อีเมล',
        cell: (item) => <div>{item.email}</div>,
    },
    {
        accessorKey: 'role',
        header: 'สิทธิ์การใช้งาน',
        cell: (item) => {
            const roleColors: Record<string, string> = {
                admin: 'bg-red-100 text-red-800 hover:bg-red-100',
                editor: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
                user: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
            };
            return (
                <Badge variant="secondary" className={roleColors[item.role] || 'bg-gray-100'}>
                    {item.role}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'สถานะ',
        cell: (item) => {
            const statusColors: Record<string, string> = {
                active: 'bg-green-100 text-green-800 hover:bg-green-100',
                inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
                suspended: 'bg-red-100 text-red-800 hover:bg-red-100',
            };
            return (
                <Badge variant="secondary" className={statusColors[item.status] || ''}>
                    {item.status}
                </Badge>
            );
        }
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: (item) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> แก้ไขข้อมูล
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> ลบบัญชี
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        className: 'w-[50px]'
    },
];
