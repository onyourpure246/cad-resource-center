'use client';

import React from 'react';
import { createColumnHelper } from '@/utils/columnHelper';
import { Item } from '@/types/models';
import { Button } from "@/components/ui/button";
import { ArrowUpDown, File, FileText, Folder } from "lucide-react";
import MuiIconRenderer from '@/components/ui/MuiIconRenderer';
import { RowActions } from '@/components/Admin/DocManagement/RowActions';
import { UseItemsTableColumnsProps } from '@/types/components';

const helper = createColumnHelper<Item>();

export const getItemColumns = ({
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

    return [
        helper.custom({
            accessorKey: 'icon',
            header: <div className="flex justify-center"><File className='h-5 w-5' strokeWidth={1} /></div>,
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
                    return <div className="flex justify-center"><MuiIconRenderer iconName={iconName} iconColor={iconColor} className="h-4 w-4" /></div>;
                }

                return item.type === "folder"
                    ? <div className="flex justify-center"><Folder className="h-4 w-4 text-yellow-500 fill-yellow-500/20" /></div>
                    : <div className="flex justify-center"><FileText className="h-4 w-4 text-primary/80" /></div>;
            },
        }),
        helper.custom({
            accessorKey: 'name',
            header: (
                <Button variant="ghost" onClick={() => onSort?.('name')} className="hover:bg-transparent font-bold uppercase tracking-wider text-muted-foreground justify-start w-1/2 pl-0">
                    ชื่อ
                    {getSortIcon('name')}
                </Button>
            ),
            headerClassName: "",
            className: "truncate max-w-[1px]", // Force fluid width and truncation
            cell: (item) => (
                <div
                    className={`hover:underline pl-3 font-medium truncate block w-full ${item.type === 'folder' ? 'cursor-pointer hover:text-primary transition-colors' : 'text-foreground'}`}
                    onClick={() => onItemClick(item)}
                    title={item.type === 'file' && item.filename ? item.filename : (item.name || "")}
                >
                    {item.type === 'file' && item.filename ? item.filename : item.name}
                </div>
            ),
        }),
        // Refactored to use simplified helper.text setup but with custom cell still needed for date string format in this specific table
        // Actually, this table uses pre-formatted strings for dates ('created', 'modified'), so helper.text is appropriate, NOT helper.date (which expects Date object)
        helper.date('created', 'สร้างเมื่อ', {
            sortable: true,
            onSort: onSort ? () => onSort('created') : undefined,
            headerClassName: "w-[180px] hidden xl:table-cell px-2",
            className: "w-[180px] text-muted-foreground text-sm hidden xl:table-cell",
        }),
        helper.date('modified', 'แก้ไขล่าสุด', {
            sortable: true,
            onSort: onSort ? () => onSort('modified') : undefined,
            headerClassName: "w-[180px] hidden lg:table-cell px-2",
            className: "w-[180px] text-muted-foreground text-sm hidden lg:table-cell",
        }),
        helper.text('modifiedBy', 'แก้ไขโดย', {
            headerClassName: "w-[180px] hidden xl:table-cell",
            className: "w-[180px] text-muted-foreground text-sm hidden xl:table-cell",
        }),
        helper.custom({
            accessorKey: 'actions',
            header: '',
            headerClassName: "text-right w-[50px]",
            className: "text-right w-[50px]",
            cell: (item) => (
                <RowActions item={item} parentId={parentId} onRefresh={onRefresh} />
            ),
        })
    ];
};
