'use client';

import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import TableSkeleton from '../Admin/DocManagement/TableSkeleton';
import { DataTableProps } from '@/types/common';

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    isLoading,
    noResultsMessage = "No results found.",
    noResultsContent,
    enableRowSelection = false,
    selectedIds = [],
    onSelectionChange
}: DataTableProps<T>) {

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data.map(item => item.id);
            onSelectionChange?.(allIds);
        } else {
            onSelectionChange?.([]);
        }
    };

    const handleSelectOne = (id: string | number, checked: boolean) => {
        if (checked) {
            onSelectionChange?.([...selectedIds, id]);
        } else {
            onSelectionChange?.(selectedIds.filter(selectedId => selectedId !== id));
        }
    };

    const isAllSelected = data.length > 0 && selectedIds.length === data.length;
    const isSomeSelected = selectedIds.length > 0 && selectedIds.length < data.length;

    return (
        <Table className="table-fixed">
            <TableHeader>
                <TableRow>
                    {enableRowSelection && (
                        <TableHead className="w-[40px] px-4 py-2">
                            <Checkbox
                                checked={isAllSelected || (isSomeSelected ? "indeterminate" : false)}
                                onCheckedChange={(checked) => handleSelectAll(!!checked)}
                                aria-label="Select all"
                            />
                        </TableHead>
                    )}
                    {columns.map((column, index) => (
                        <TableHead key={index} className={`py-2 ${column.headerClassName ?? ''}`}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            {isLoading ? (
                <TableSkeleton showCheckbox={enableRowSelection} />
            ) : (
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length + (enableRowSelection ? 1 : 0)} className="h-24 text-center">
                                {noResultsContent || noResultsMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id} data-state={selectedIds.includes(item.id) && "selected"}>
                                {enableRowSelection && (
                                    <TableCell className="w-[40px] px-4 py-2">
                                        <Checkbox
                                            checked={selectedIds.includes(item.id)}
                                            onCheckedChange={(checked) => handleSelectOne(item.id, !!checked)}
                                            aria-label={`Select row ${item.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </TableCell>
                                )}
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={`px-3 py-2 ${column.className ?? ''}`}>{column.cell(item)}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            )}
        </Table>
    );
}