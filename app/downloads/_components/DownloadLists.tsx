'use client'
import React, { useState } from 'react'
import type { DownloadListProps } from '@/types/components'
import { FileText } from 'lucide-react'
import DownloadCard from './DownloadCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DownloadList = ({ items, highlightQuery }: DownloadListProps) => {
    const [activeYearTab, setActiveYearTab] = useState("all");

    // Extract unique release years
    const uniqueYears = React.useMemo(() => {
        const years = items
            .map(item => item.release_year)
            .filter((year): year is string => Boolean(year));
        return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a));
    }, [items]);

    // เรียงลำดับจากล่าสุดไปเก่าสุด และกรองตามปีที่เลือก
    const sortedAndFilteredItems = React.useMemo(() => {
        let filtered = items;
        if (activeYearTab !== "all") {
            filtered = items.filter(item => item.release_year === activeYearTab);
        }

        return [...filtered].sort((a, b) => {
            const getValidDate = (dateStr?: string) => {
                if (!dateStr) return 0;
                // แปลงรูปแบบ "YYYY-MM-DD HH:mm" กลับเป็น ISO ให้ Date อ่านได้
                const formattedStr = dateStr.includes(' ') && !dateStr.includes('T') ? dateStr.replace(' ', 'T') : dateStr;
                return new Date(formattedStr).getTime();
            };

            const timeA = getValidDate(a.created_at || a.updated_at);
            const timeB = getValidDate(b.created_at || b.updated_at);

            return timeB - timeA; // เรียงจากมาก (ใหม่สุด) ไปน้อย (เก่าสุด)
        });
    }, [items, activeYearTab]);

    return (
        <div className="w-full space-y-4 mt-2">
            {uniqueYears.length > 0 && (
                <Tabs value={activeYearTab} onValueChange={setActiveYearTab} className="w-full mb-4">
                    <div className="flex justify-start">
                        <TabsList className="bg-muted/40 p-1 rounded-lg">
                            <TabsTrigger value="all" className="text-sm px-4 py-1.5 rounded-md border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                                ทั้งหมด
                            </TabsTrigger>
                            {uniqueYears.map(year => (
                                <TabsTrigger key={year} value={year} className="text-sm px-4 py-1.5 rounded-md border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                                    ปี {year}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </Tabs>
            )}

            {sortedAndFilteredItems.map((item) => (
                <DownloadCard key={item.id} item={item} highlightQuery={highlightQuery} />
            ))}

            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-muted mt-8">
                    <div className="bg-muted rounded-full p-4 mb-4">
                        <FileText className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">ไม่พบเอกสาร</h3>
                    <p className="text-muted-foreground">ยังไม่มีเอกสารในหมวดหมู่นี้</p>
                </div>
            )}
        </div>
    )
}

export default DownloadList