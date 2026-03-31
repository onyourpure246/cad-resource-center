'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { TableSkeletonProps } from '@/types/components';

const TableSkeleton = ({ showCheckbox = false, columns = [] }: TableSkeletonProps & { columns?: { headerClassName?: string; className?: string }[] }) => {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    {showCheckbox && (
                        <TableCell className="px-4 py-2 w-[40px]">
                            <Skeleton className="h-4 w-4 rounded-sm" />
                        </TableCell>
                    )}
                    {columns && columns.length > 0 ? (
                        columns.map((col: { headerClassName?: string; className?: string }, colIdx: number) => (
                            <TableCell key={colIdx} className={`px-2 py-2 ${col.headerClassName ?? col.className ?? ''}`}>
                                <Skeleton className={`h-4 ${colIdx === 0 ? 'w-5 rounded-md mx-auto' : 'w-[80%] min-w-[50px]'}`} />
                            </TableCell>
                        ))
                    ) : (
                        <TableCell className="px-2 py-2">
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableSkeleton;