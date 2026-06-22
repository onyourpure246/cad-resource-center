'use client'
import React, { useState } from 'react'
import type { DownloadListProps } from '@/types/components'
import { FileText } from 'lucide-react'
import DownloadCard from './DownloadCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DownloadList = ({ items, highlightQuery, categoryGroupName }: DownloadListProps) => {
    const [activeVersionTab, setActiveVersionTab] = useState("all");

    // Extract unique versions
    const uniqueVersions = React.useMemo(() => {
        const versions = items
            .map(item => item.version)
            .filter((version): version is string => Boolean(version));
        // Using localeCompare with numeric option to correctly sort versions like "1.9", "2.0", "1.10"
        return Array.from(new Set(versions)).sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    }, [items]);

    // Calculate the latest item for each version
    const latestIdsInVersions = React.useMemo(() => {
        if (categoryGroupName !== 'ชุดคำสั่ง') return new Set<number>();
        
        const getValidDate = (dateStr?: string) => {
            if (!dateStr) return 0;
            const formattedStr = dateStr.includes(' ') && !dateStr.includes('T') ? dateStr.replace(' ', 'T') : dateStr;
            return new Date(formattedStr).getTime();
        };

        const ids = new Set<number>();
        uniqueVersions.forEach(version => {
            const versionItems = items.filter(i => i.version === version);
            if (versionItems.length > 0) {
                // Find the newest one in this version
                const latestItem = versionItems.reduce((latest, current) => {
                    const timeLatest = getValidDate(latest.created_at || latest.updated_at);
                    const timeCurrent = getValidDate(current.created_at || current.updated_at);
                    return timeCurrent > timeLatest ? current : latest;
                });
                ids.add(latestItem.id);
            }
        });
        return ids;
    }, [items, uniqueVersions, categoryGroupName]);

    // เรียงลำดับจากล่าสุดไปเก่าสุด และกรองตามเวอร์ชันที่เลือก
    const sortedAndFilteredItems = React.useMemo(() => {
        let filtered = items;
        if (activeVersionTab !== "all") {
            filtered = items.filter(item => item.version === activeVersionTab);
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
    }, [items, activeVersionTab]);

    return (
        <div className="w-full mt-2">
            {uniqueVersions.length > 0 && (
                <Tabs value={activeVersionTab} onValueChange={setActiveVersionTab} className="w-full mb-6">
                    <div className="flex justify-start overflow-x-auto pb-2 scrollbar-hide">
                        <TabsList className="bg-muted/40 p-1 rounded-lg">
                            <TabsTrigger value="all" className="text-sm px-4 py-1.5 rounded-md border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                                ทั้งหมด
                            </TabsTrigger>
                            {uniqueVersions.map(version => (
                                <TabsTrigger key={version} value={version} className="text-sm px-4 py-1.5 rounded-md border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                                    เวอร์ชัน {version}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </Tabs>
            )}

            {sortedAndFilteredItems.length > 0 && (
                <div className="flex flex-col gap-8">
                    {categoryGroupName === 'ชุดคำสั่ง' ? (
                        <>
                            {/* Hero Section (Only for ชุดคำสั่ง) */}
                            <section>
                                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                    ⭐ เวอร์ชันล่าสุด (Latest)
                                </h2>
                                <DownloadCard 
                                    key={sortedAndFilteredItems[0].id} 
                                    item={sortedAndFilteredItems[0]} 
                                    highlightQuery={highlightQuery} 
                                    categoryGroupName={categoryGroupName}
                                    isLatestInVersion={latestIdsInVersions.has(sortedAndFilteredItems[0].id)}
                                    variant="hero"
                                />
                            </section>

                            {/* Previous Versions Section */}
                            {sortedAndFilteredItems.length > 1 && (
                                <section>
                                    <h2 className="text-base font-semibold text-muted-foreground mb-4 border-b border-border/40 pb-2">
                                        เวอร์ชันก่อนหน้า (Previous Versions)
                                    </h2>
                                    <div className="flex flex-col gap-2">
                                        {sortedAndFilteredItems.slice(1).map((item) => (
                                            <DownloadCard 
                                                key={item.id} 
                                                item={item} 
                                                highlightQuery={highlightQuery} 
                                                categoryGroupName={categoryGroupName}
                                                isLatestInVersion={latestIdsInVersions.has(item.id)}
                                                variant="compact"
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ) : (
                        /* Normal List (For other categories) */
                        <div className="flex flex-col gap-2">
                            {sortedAndFilteredItems.map((item) => (
                                <DownloadCard 
                                    key={item.id} 
                                    item={item} 
                                    highlightQuery={highlightQuery} 
                                    categoryGroupName={categoryGroupName}
                                    isLatestInVersion={false}
                                    variant="compact"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

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