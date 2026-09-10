'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar } from 'lucide-react'
import MuiIconRenderer from '@/components/ui/MuiIconRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { DownloadCardProps } from '@/types/components';

const DownloadCard = ({ item, highlightQuery, isLatestInVersion, categoryGroupName, variant = 'hero' }: DownloadCardProps) => {
    const isNew = React.useMemo(() => {
        // Safe date parser
        const getValidDate = (dateStr?: string | null) => {
            if (!dateStr) return null;
            const str = String(dateStr).trim();
            if (!str) return null;
            const formattedStr = str.includes(' ') && !str.includes('T') ? str.replace(' ', 'T') : str;
            const parsed = new Date(formattedStr);
            return isNaN(parsed.getTime()) ? null : parsed;
        };

        const createdDate = getValidDate(item.created_at) || getValidDate(item.updated_at);
        let isWithin7Days = false;

        if (createdDate) {
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - createdDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 7) {
                isWithin7Days = true;
            }
        }

        // หมวดหมู่ชุดคำสั่ง: ขึ้น NEW ถ้าอัปโหลดใน 7 วัน หรือเป็นเวอร์ชันล่าสุด
        if (categoryGroupName === 'ชุดคำสั่ง') {
            return isWithin7Days || !!isLatestInVersion;
        }

        // หมวดหมู่อื่นๆ: ใช้กฎ 7 วัน
        return isWithin7Days;
    }, [item.created_at, item.updated_at, isLatestInVersion, categoryGroupName]);

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

        const extension = item.filename.split('.').pop()?.toUpperCase() || 'FILE';
        const formattedDate = item.created_at?.split(' ')[0] || item.created_at;

        if (variant === 'compact') {
            return (
                <div className="group flex items-center justify-between p-3 sm:p-4 bg-card border border-border/40 rounded-xl hover:border-primary/30 hover:bg-muted/20 transition-all duration-200">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-10 h-10 shrink-0 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            {item.mui_icon ? (
                                <MuiIconRenderer iconName={item.mui_icon} iconColor={item.mui_colour} className="w-5 h-5" />
                            ) : (
                                <FileText className="w-5 h-5" />
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-medium text-[14px] text-foreground truncate group-hover:text-primary transition-colors" title={item.name || undefined}>
                                    {renderHighlightedText(item.name, highlightQuery)}
                                </h4>
                                {isNew && (
                                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 animate-pulse bg-red-500 hover:bg-red-600 shadow-sm shrink-0">
                                        NEW
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-0.5">
                                <span className="font-medium text-primary/70">{extension}</span>
                                <span className="truncate max-w-[120px] sm:max-w-[200px]" title={item.filename}>{item.filename}</span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="w-3 h-3" />
                                    <span>{item.downloads || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="ml-4 shrink-0 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors h-9 px-3"
                    >
                        <a href={`/casdu_cdm/api/proxy-download/${item.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">ดาวน์โหลด</span>
                        </a>
                    </Button>
                </div>
            );
        }

        // Default Hero Variant
        return (
            <Card
                className="group border-2 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 bg-card overflow-hidden flex flex-col sm:flex-row rounded-2xl relative"
            >
                {/* Highlight line on top or left */}
                <div className="absolute top-0 left-0 w-full h-1 sm:w-1 sm:h-full bg-primary" />
                
                <CardContent className="p-0 flex flex-col sm:flex-row w-full">
                    {/* Left/Top Content Area */}
                    <div className="p-6 flex-1 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 shrink-0 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                {item.mui_icon ? (
                                    <MuiIconRenderer iconName={item.mui_icon} iconColor={item.mui_colour} className="w-7 h-7" />
                                ) : (
                                    <FileText className="w-7 h-7" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 
                                        className="font-bold text-lg sm:text-xl text-foreground line-clamp-2 break-words leading-snug group-hover:text-primary transition-colors" 
                                        title={item.name || undefined}
                                    >
                                        {renderHighlightedText(item.name, highlightQuery)}
                                    </h3>
                                </div>
                                {isNew && (
                                    <Badge variant="destructive" className="text-[10px] px-2 py-0 animate-pulse bg-red-500 hover:bg-red-600 shadow-sm mb-2">
                                        NEW
                                    </Badge>
                                )}
                                {item.description && (
                                    <p className="text-muted-foreground text-sm line-clamp-2 break-words leading-relaxed mt-1" title={item.description || undefined}>
                                        {renderHighlightedText(item.description, highlightQuery)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 border-t border-border/30">
                            {item.category_name && (
                                <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary bg-primary/5">
                                    {item.category_name}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">
                                {extension}
                            </Badge>
                            <span className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[250px]" title={item.filename}>
                                {item.filename}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Right/Bottom */}
                    <div className="p-6 bg-muted/10 border-t sm:border-t-0 sm:border-l border-border/40 flex flex-col items-center justify-center min-w-[200px]">
                        <Button
                            asChild
                            size="lg"
                            className="w-full rounded-xl shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        >
                            <a href={`/casdu_cdm/api/proxy-download/${item.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                <span>ดาวน์โหลดไฟล์</span>
                            </a>
                        </Button>
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                            <Download className="w-3.5 h-3.5" />
                            <span>ยอดดาวน์โหลด {item.downloads || 0} ครั้ง</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
}

export default DownloadCard
