'use client';

import React from 'react';
import { Folder } from "lucide-react";
import { ItemsTableProps } from '@/types/documents';
import { DataTable } from '@/components/DataTable/DataTable';
import { useItemsTableColumns } from '@/hooks/useItemsTableColumns';

const ItemsTable = ({
    items,
    isLoading,
    parentId,
    onItemClick,
    onRefresh,
    sortConfig,
    onSort
}: ItemsTableProps) => {

    const columns = useItemsTableColumns({
        parentId,
        onItemClick,
        onRefresh,
        sortConfig,
        onSort
    });

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={items}
                isLoading={isLoading}
                noResultsMessage="ไม่พบไฟล์หรือโฟลเดอร์"
                noResultsContent={
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="bg-muted/50 rounded-full p-4 mb-4">
                            <Folder className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">ไม่พบไฟล์หรือโฟลเดอร์</h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-sm">
                            โฟลเดอร์นี้ยังไม่มีข้อมูล คุณสามารถสร้างโฟลเดอร์ใหม่หรืออัปโหลดไฟล์ได้ที่ปุ่มด้านบน
                        </p>
                    </div>
                }
            />
        </div>
    );
};

export default ItemsTable;