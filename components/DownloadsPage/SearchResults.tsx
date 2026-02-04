'use client';

import React from 'react';
import { File, X } from 'lucide-react';
import Link from 'next/link';
import { SearchResultItem } from '@/actions/search-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SearchResultsProps {
    results: SearchResultItem[];
    query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
    // Helper function to highlight text
    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) {
            return text;
        }

        // Escape special regex characters
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));

        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} className="bg-primary/20 text-primary font-bold rounded px-0.5">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="container mx-auto max-w-[1920px] px-4 py-8 pb-20">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">ผลการค้นหาสำหรับ: <span className="text-primary">"{query}"</span></h2>
                    <Link href="/downloads">
                        <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8 rounded-full hover:bg-muted" title="ล้างการค้นหา">
                            <X className="h-5 w-5" />
                            <span className="sr-only">ล้างการค้นหา</span>
                        </Button>
                    </Link>
                </div>
                <p className="text-muted-foreground">พบเอกสารทั้งหมด {results.length} รายการ</p>
            </div>

            {results.length > 0 ? (
                <div className="grid gap-4">
                    {results.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="bg-white dark:bg-card/50 p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <File className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                                            <a href={`/downloads/${item.folderId}`} className="hover:underline">
                                                {highlightText(item.name || item.filename || "", query)}
                                            </a>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                            {item.description ? highlightText(item.description, query) : "ไม่มีคำอธิบาย"}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                                        <Badge variant="secondary" className="shrink-0 text-xs font-normal bg-muted text-muted-foreground">
                                            {item.filename?.split('.').pop()?.toUpperCase() || 'FILE'}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground text-right">
                                            {highlightText(item.filename || "", query)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        {item.folderPath || "ไม่ระบุที่จัดเก็บ"}
                                    </span>
                                    <span>
                                        อัปเดตล่าสุด: {new Date(item.updated_at).toLocaleDateString('th-TH')}
                                    </span>
                                </div>
                            </div>
                            <div className="self-center">
                                <Link
                                    href={`/downloads/${item.folderId}`}
                                    className="text-sm bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md transition-all font-medium"
                                >
                                    ไปที่โฟลเดอร์
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                    <File className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold text-muted-foreground">ไม่พบเอกสารที่คุณค้นหา</h3>
                    <p className="text-muted-foreground mt-2">ลองใช้คำค้นหาอื่น หรือเลือกดูตามหมวดหมู่</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
