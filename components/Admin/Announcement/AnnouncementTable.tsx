'use client';
import React, { useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { AnnouncementTableProps } from '@/types/announcement';
import { Megaphone } from 'lucide-react';
import { getAnnouncementColumns } from './announcementColumns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ANNOUNCEMENT_TABS } from '@/lib/constants';

const AnnouncementTable = ({ announcements, isLoading }: AnnouncementTableProps) => {
    const router = useRouter();
    const columns = getAnnouncementColumns(router);

    const [activeTab, setActiveTab] = useState("all");

    const publishedAnnouncements = announcements.filter(a => a.status.toLowerCase() === 'published');
    const draftAnnouncements = announcements.filter(a => a.status.toLowerCase() === 'draft');
    const archivedAnnouncements = announcements.filter(a => a.status.toLowerCase() === 'archived');


    const counts = {
        all: null,
        published: publishedAnnouncements.length,
        draft: draftAnnouncements.length,
        archived: archivedAnnouncements.length
    };


    const tabs = ANNOUNCEMENT_TABS.map(tab => ({
        ...tab,
        count: counts[tab.value as keyof typeof counts]
    }));

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-muted/50 gap-1 relative overflow-hidden">
                        {tabs.map((tab) => {
                            let activeClass = "";
                            let bgClass = "";

                            switch (tab.value) {
                                case "published":
                                    activeClass = "data-[state=active]:text-white";
                                    bgClass = "bg-emerald-500";
                                    break;
                                case "draft":
                                    activeClass = "data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 data-[state=active]:border-amber-200/50";
                                    bgClass = "bg-amber-500/15";
                                    break;
                                case "archived":
                                    activeClass = "data-[state=active]:text-muted-foreground";
                                    bgClass = "bg-muted";
                                    break;
                                case "all":
                                default:
                                    activeClass = "data-[state=active]:text-primary-foreground";
                                    bgClass = "bg-primary";
                                    break;
                            }

                            return (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        "relative z-10 transition-none data-[state=active]:shadow-none data-[state=active]:bg-transparent",
                                        activeClass,
                                        activeTab !== tab.value && "text-muted-foreground hover:text-foreground hover:bg-transparent"
                                    )}
                                >
                                    {activeTab === tab.value && (
                                        <motion.div
                                            layoutId="active-tab-bg"
                                            className={cn(
                                                "absolute inset-0 rounded-sm z-[-1]",
                                                bgClass
                                            )}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {tab.label}
                                        {tab.count !== null && <span className="text-xs opacity-75">({tab.count})</span>}
                                    </span>
                                </TabsTrigger>
                            );
                        })}
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

                <TabsContent value="archived" className="mt-0">
                    <DataTable
                        columns={columns}
                        data={archivedAnnouncements}
                        isLoading={isLoading}
                        noResultsMessage="ไม่พบประกาศที่ถูกจัดเก็บ"
                        enableRowSelection={true}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AnnouncementTable;