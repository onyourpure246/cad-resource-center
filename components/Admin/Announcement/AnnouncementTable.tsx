'use client';

import React from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { AnnouncementTableProps } from '@/types/announcement';
import { Megaphone } from 'lucide-react';
import { getAnnouncementColumns } from './announcementColumns';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnnouncementTable = ({ announcements, isLoading }: AnnouncementTableProps) => {

    const columns = getAnnouncementColumns();

    const publishedAnnouncements = announcements.filter(a => a.status.toLowerCase() === 'published');
    const draftAnnouncements = announcements.filter(a => a.status.toLowerCase() === 'draft');

    return (
        <div className="space-y-4">
            <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between mb-2">
                    <TabsList>
                        <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
                        <TabsTrigger
                            value="published"
                            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-500"
                        >
                            เผยแพร่แล้ว ({publishedAnnouncements.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="draft"
                            className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-700 dark:data-[state=active]:bg-amber-500/20 dark:data-[state=active]:text-amber-400"
                        >
                            ฉบับร่าง ({draftAnnouncements.length})
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                    <DataTable
                        columns={columns}
                        data={announcements}
                        isLoading={isLoading}
                        noResultsMessage="ไม่พบประกาศ"
                        enableRowSelection={true}
                    />
                </TabsContent>

                <TabsContent value="published" className="mt-0">
                    <DataTable
                        columns={columns}
                        data={publishedAnnouncements}
                        isLoading={isLoading}
                        noResultsMessage="ไม่พบประกาศที่เผยแพร่"
                        enableRowSelection={true}
                    />
                </TabsContent>

                <TabsContent value="draft" className="mt-0">
                    <DataTable
                        columns={columns}
                        data={draftAnnouncements}
                        isLoading={isLoading}
                        noResultsMessage="ไม่พบประกาศฉบับร่าง"
                        enableRowSelection={true}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AnnouncementTable;