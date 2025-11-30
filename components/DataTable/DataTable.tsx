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
import TableSkeleton from '../Admin/DocManagement/TableSkeleton';
import { DataTableProps } from '@/types/common';

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    isLoading,
    noResultsMessage = "No results found.",
    noResultsContent
}: DataTableProps<T>) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableHead key={index} className={`py-2 text-left ${column.headerClassName ?? ''}`}>{column.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            {isLoading ? (
                <TableSkeleton />
            ) : (
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {noResultsContent || noResultsMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={`px-4 py-2 ${column.className ?? ''}`}>{column.cell(item)}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            )}
        </Table>
    );
}