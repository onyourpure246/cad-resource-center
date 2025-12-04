import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Folder, ArrowUpDown } from "lucide-react";
import { DeleteConfirmationDialog } from '@/components/Admin/Dialog/DeleteConfirmationDialog';
import { EditFolderDialog } from '@/components/Admin/Dialog/EditFolderDialog';
import { MoveDialog } from '@/components/Admin/Dialog/MoveDialog';
import { Item } from '@/types/documents';
import { DataTableColumn } from '@/types/common';

interface UseItemsTableColumnsProps {
    parentId: number | null;
    onItemClick: (item: Item) => void;
    onRefresh: () => void;
    sortConfig?: { key: keyof Item; direction: 'asc' | 'desc' } | null;
    onSort?: (key: keyof Item) => void;
}

export const useItemsTableColumns = ({
    parentId,
    onItemClick,
    onRefresh,
    sortConfig,
    onSort
}: UseItemsTableColumnsProps) => {

    const getSortIcon = (key: keyof Item) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="ml-2 h-4 w-4" />;
        }
        return sortConfig.direction === 'asc' ? (
            <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
        ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
        );
    };

    const columns: DataTableColumn<Item>[] = React.useMemo(() => [
        {
            accessorKey: 'icon',
            header: '',
            headerClassName: "w-[50px]",
            className: "w-[50px]",
            cell: (item) => item.type === "folder"
                ? <Folder className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
                : <FileText className="h-4 w-4 text-primary/80" />,
        },
        {
            accessorKey: 'name',
            header: (
                <Button variant="ghost" onClick={() => onSort?.('name')} className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full">
                    ชื่อ
                    {getSortIcon('name')}
                </Button>
            ),
            cell: (item) => (
                <span
                    className={`hover:underline font-medium ${item.type === 'folder' ? 'cursor-pointer hover:text-primary transition-colors' : 'text-foreground'}`}
                    onClick={() => onItemClick(item)}
                >
                    {item.name}
                </span>
            ),
        },
        {
            accessorKey: 'created',
            header: (
                <Button variant="ghost" onClick={() => onSort?.('created')} className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full">
                    สร้างเมื่อ
                    {getSortIcon('created')}
                </Button>
            ),
            headerClassName: "w-[180px]",
            className: "w-[180px]",
            cell: (item) => <span className="text-muted-foreground text-sm">{item.created}</span>,
        },
        {
            accessorKey: 'modified',
            header: (
                <Button variant="ghost" onClick={() => onSort?.('modified')} className="hover:bg-transparent px-0 font-bold uppercase tracking-wider text-muted-foreground justify-start w-full">
                    แก้ไขล่าสุด
                    {getSortIcon('modified')}
                </Button>
            ),
            headerClassName: "w-[180px]",
            className: "w-[180px]",
            cell: (item) => <span className="text-muted-foreground text-sm">{item.modified}</span>,
        },
        {
            accessorKey: 'modifiedBy',
            header: <span className="font-bold uppercase tracking-wider text-muted-foreground">แก้ไขโดย</span>,
            headerClassName: "w-[180px]",
            className: "w-[180px]",
            cell: (item) => <span className="text-muted-foreground text-sm">{item.modifiedBy}</span>,
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
                        {item.type === 'file' && <DropdownMenuItem className="cursor-pointer">ดาวน์โหลด</DropdownMenuItem>}
                        {item.type === 'folder' && (
                            <EditFolderDialog folder={item} parentId={parentId} onSuccess={onRefresh}
                                trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">แก้ไข</DropdownMenuItem>} />
                        )}
                        <MoveDialog item={item} currentParentId={parentId} onMoveSuccess={onRefresh}
                            trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">ย้าย</DropdownMenuItem>} />
                        <DeleteConfirmationDialog id={item.id} name={item.name} type={item.type} onSuccess={onRefresh}
                            trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-destructive focus:text-destructive">ลบ</DropdownMenuItem>} />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ], [sortConfig, onItemClick, onRefresh, parentId, onSort]);

    return columns;
};
