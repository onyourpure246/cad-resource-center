import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpDown, FileText, Folder } from "lucide-react";
import { Item } from '@/types/documents';
import { DataTableColumn } from '@/types/common';
import MuiIconRenderer from '@/components/ui/MuiIconRenderer';
import { RowActions } from '@/components/Admin/DocManagement/RowActions';

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
            cell: (item) => {
                let iconName = item.mui_icon;
                let iconColor = item.mui_colour;

                if (!iconName && item.type === 'file') {
                    const fileName = (item.filename || item.name || '').toLowerCase();
                    if (fileName.endsWith('.pdf')) {
                        iconName = 'PictureAsPdf';
                        iconColor = '#ef4444'; // text-red-500
                    } else if (fileName.endsWith('.zip')) {
                        iconName = 'FolderZip';
                        iconColor = '#eab308'; // text-yellow-500
                    }
                }

                if (iconName) {
                    return <MuiIconRenderer iconName={iconName} iconColor={iconColor} className="h-4 w-4" />;
                }

                return item.type === "folder"
                    ? <Folder className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
                    : <FileText className="h-4 w-4 text-primary/80" />;
            },
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
                    {item.type === 'file' && item.filename ? item.filename : item.name}
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
                <RowActions item={item} parentId={parentId} onRefresh={onRefresh} />
            ),
        },
    ], [sortConfig, onItemClick, onRefresh, parentId, onSort]);

    return columns;
};
