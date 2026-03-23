'use client'
import React from 'react'
import type { DownloadListProps } from '@/types/components'
import { FileText } from 'lucide-react'
import DownloadCard from './DownloadCard'

const DownloadList = ({ items, highlightQuery }: DownloadListProps) => {
    // เรียงลำดับจากล่าสุดไปเก่าสุด
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
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
    }, [items]);

    return (
        <div className="w-full space-y-4">
            {sortedItems.map((item) => (
                <DownloadCard key={item.id} item={item} highlightQuery={highlightQuery} />
            ))}

            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-muted">
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