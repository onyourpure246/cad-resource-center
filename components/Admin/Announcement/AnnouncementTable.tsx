'use client';

import React from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { AnnouncementTableProps } from '@/types/announcement';
import { Megaphone } from 'lucide-react';
import { useAnnouncementColumns } from '@/hooks/useAnnouncementColumns';

const AnnouncementTable = ({ announcements, isLoading }: AnnouncementTableProps) => {

    const columns = useAnnouncementColumns();

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={announcements}
                isLoading={isLoading}
                noResultsMessage="ไม่พบประกาศ"
                noResultsContent={
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="bg-muted/50 rounded-full p-4 mb-4">
                            <Megaphone className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">ไม่พบประกาศ</h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-sm">
                            ยังไม่มีประกาศในระบบ คุณสามารถสร้างประกาศใหม่ได้ที่ปุ่มด้านบน
                        </p>
                    </div>
                }
            />
        </div>
    );
};

export default AnnouncementTable;