'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { TableSkeletonProps } from '@/types/components';

const TableSkeleton = ({ showCheckbox = false }: TableSkeletonProps) => {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    {showCheckbox && (
                        <TableCell className="px-4 py-2 w-[40px]">
                            <Skeleton className="h-4 w-4 rounded-sm" />
                        </TableCell>
                    )}
                    <TableCell className="px-4 py-2 w-[50px]">
                        <Skeleton className="h-5 w-5 rounded-md" />
                    </TableCell>
                    <TableCell className="px-4 py-2"><Skeleton className="h-4 w-[250px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell className="px-4 py-2 text-right w-[50px]">
                        <Skeleton className="h-8 w-8 ml-auto" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableSkeleton;