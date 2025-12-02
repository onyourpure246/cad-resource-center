import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/types/announcement';
import { DataTableColumn } from '@/types/common';

export const useAnnouncementColumns = () => {
    const columns: DataTableColumn<Announcement>[] = [
        {
            accessorKey: 'title',
            header: (
                <Button variant="ghost" className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full cursor-default">
                    หัวข้อ
                </Button>
            ),
            cell: (item) => <span className="font-medium text-foreground">{item.title}</span>,
        },
        {
            accessorKey: 'status',
            header: (
                <Button variant="ghost" className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full cursor-default">
                    สถานะ
                </Button>
            ),
            headerClassName: "w-[120px]",
            className: "w-[120px]",
            cell: (item) => (
                <Badge variant={item.status === 'Published' ? 'default' : 'outline'}>
                    {item.status}
                </Badge>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: (
                <Button variant="ghost" className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full cursor-default">
                    สร้างโดย
                </Button>
            ),
            headerClassName: "w-[150px]",
            className: "w-[150px]",
            cell: (item) => <span className="text-muted-foreground text-sm">{item.createdBy}</span>,
        },
        {
            accessorKey: 'createdAt',
            header: (
                <Button variant="ghost" className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full cursor-default">
                    สร้างเมื่อ
                </Button>
            ),
            headerClassName: "w-[150px]",
            className: "w-[150px]",
            cell: (item) => <span className="text-muted-foreground text-sm">{item.createdAt}</span>,
        },
        {
            accessorKey: 'actions',
            header: '',
            headerClassName: "text-right w-[50px]",
            className: "text-right w-[50px]",
            cell: (item) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-muted">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem className="cursor-pointer">แก้ไข</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">ลบ</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        }
    ];

    return columns;
};
