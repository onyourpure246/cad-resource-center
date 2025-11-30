'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

const TableSkeleton = () => {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell className="px-4 py-2 w-[50px]">
                        <Skeleton className="h-5 w-5 rounded-md" />
                    </TableCell>
                    <TableCell className="px-4 py-2"><Skeleton className="h-4 w-[250px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell className="px-4 py-2 w-[180px]"><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell className="px-4 py-2 text-right w-[50px]">
                        <Skeleton className="h-8 w-8" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableSkeleton;