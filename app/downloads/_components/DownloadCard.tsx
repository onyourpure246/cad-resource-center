'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar } from 'lucide-react'
import MuiIconRenderer from '@/components/ui/MuiIconRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { DownloadCardProps } from '@/types/components';

const DownloadCard = ({ item, highlightQuery }: DownloadCardProps) => {
    // กำหนดเกณฑ์: ถ้าอัปโหลดไม่เกิน 14 วัน ถือว่าเป็นไฟล์ "ใหม่"
    const isNew = React.useMemo(() => {
        if (!item.created_at) return false;
        // รองรับ format วันที่แบบ "YYYY-MM-DD HH:mm" หรือแบบมาตรฐาน
        const dateStr = item.created_at.includes(' ') && !item.created_at.includes('T')
            ? item.created_at.replace(' ', 'T')
            : item.created_at;

        const createdDate = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - createdDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 14; // ไฟล์ใหม่ในช่วง 14 วัน
    }, [item.created_at]);

    const renderHighlightedText = (text: string | undefined | null, query?: string) => {
        if (!text) return null;
        if (!query) return text;

        const keywords = query
            .toLowerCase()
            .replace(/([a-z0-9]+)/ig, ' $1 ')
            .split(/\s+/)
            .filter(k => k.trim().length > 0);

        if (keywords.length === 0) return text;

        const escapedKeywords = keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');

        const parts = text.split(regex);

        return (
            <React.Fragment>
                {parts.map((part, i) => {
                    if (!part) return null;
                    const isMatch = keywords.some(kw => part.toLowerCase() === kw.toLowerCase());
                    return isMatch ? (
                        <mark key={i} className="bg-primary/20 text-primary font-medium rounded px-0.5">
                            {part}
                        </mark>
                    ) : part;
                })}
            </React.Fragment>
        );
    };

    return (
        <Card
            className="group border-1 shadow-sm hover:shadow-md transition-all duration-200 bg-card overflow-hidden py-0"
        >
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* Icon Section */}
                    <div className="flex items-center justify-center p-6 bg-primary/15 md:w-24 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {item.mui_icon ? (
                                <MuiIconRenderer iconName={item.mui_icon} iconColor={item.mui_colour} className="w-6 h-6" />
                            ) : (
                                <FileText className="w-6 h-6 text-primary" />
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                        {/* Left Column */}
                        <div className="flex flex-col justify-center gap-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                    {renderHighlightedText(item.name, highlightQuery)}
                                </h3>
                                {isNew && (
                                    <Badge variant="destructive" className="shrink-0 text-[10px] px-1.5 py-0 h-4 bg-red-500 hover:bg-red-600 animate-pulse">
                                        NEW
                                    </Badge>
                                )}
                            </div>

                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {renderHighlightedText(item.description, highlightQuery)}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{item.created_at}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col items-start md:items-end gap-2">
                            {item.category_name && (
                                <Badge variant="outline" className="shrink-0 text-xs font-medium border-primary/20 text-primary">
                                    {item.category_name}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="shrink-0 text-xs font-normal bg-muted text-muted-foreground">
                                {item.filename.split('.').pop()?.toUpperCase() || 'FILE'}
                            </Badge>
                            <span className="text-xs text-muted-foreground text-right truncate max-w-full">
                                {item.filename}
                            </span>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-muted/30 md:bg-transparent md:border-l border-border/50 gap-2 shrink-0">
                        <Button
                            asChild
                            className="w-full md:w-auto px-6 rounded-full shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90"
                        >
                            <a href={`/casdu_cdm/api/proxy-download/${item.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>ดาวน์โหลด</span>
                            </a>
                        </Button>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                            <Download className="w-3 h-3" />
                            <span>{item.downloads || 0} ครั้ง</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DownloadCard
