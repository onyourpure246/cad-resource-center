'use client';

import React from 'react';
import { UsersTableProps } from '@/types/user';
import { DataTable } from '@/components/DataTable/DataTable';
import { getUserColumns } from './Columns';
import { Box } from 'lucide-react';

const UsersTable = ({
    items,
    isLoading,
    selectedIds,
    onSelectionChange
}: UsersTableProps) => {

    const columns = getUserColumns();

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={items}
                isLoading={isLoading}
                noResultsMessage="ไม่พบรายชื่อผู้ใช้"
                enableRowSelection={true}
                selectedIds={selectedIds}
                onSelectionChange={onSelectionChange}
                noResultsContent={
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="bg-muted/50 rounded-full p-4 mb-4">
                            <Box className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">ไม่พบรายชื่อผู้ใช้</h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-sm">
                            ยังไม่มีผู้ใช้ในระบบ คุณสามารถเพิ่มผู้ใช้ใหม่ได้ที่ปุ่มด้านบน
                        </p>
                    </div>
                }
            />
        </div>
    );
};

export default UsersTable;
