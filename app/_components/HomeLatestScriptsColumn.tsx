'use client';

import React from 'react';
import Link from 'next/link';
import { CategorizedScriptFiles } from '@/actions/file-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Terminal,
    Download,
    Sparkles,
    FolderKanban,
    Boxes,
    BookOpen,
    ArrowRight
} from 'lucide-react';

interface HomeLatestScriptsColumnProps {
    categorizedScripts: CategorizedScriptFiles[];
}

export default function HomeLatestScriptsColumn({ categorizedScripts }: HomeLatestScriptsColumnProps) {
    // Extract manual link helper
    const getManualLink = (description?: string | null) => {
        if (!description) return null;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const match = description.match(urlRegex);
        return match ? match[0] : null;
    };

    // Decode HTML entities helper
    const decodeHtmlEntities = (str?: string | null) => {
        if (!str) return "";
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&ldquo;/g, '"')
            .replace(/&rdquo;/g, '"')
            .replace(/&lsquo;/g, "'")
            .replace(/&rsquo;/g, "'")
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ');
    };

    // Category Column Icon mapping
    const getCategoryIcon = (catName: string) => {
        if (catName.includes('เกษตร')) return <FolderKanban className="w-4 h-4 text-emerald-500" />;
        if (catName.includes('ออมทรัพย์')) return <Boxes className="w-4 h-4 text-indigo-500" />;
        return <Terminal className="w-4 h-4 text-amber-500" />;
    };

    return (
        <div className="flex flex-col justify-between space-y-3">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-border/30 pb-2 gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Terminal className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold tracking-tight">ชุดคำสั่ง CATS</h2>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                                อัปเดตล่าสุด
                            </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">ไฟล์และโปรแกรมคำสั่งที่อัปเดตใหม่ล่าสุด</p>
                    </div>
                </div>

                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="group hover:bg-primary/5 hover:text-primary rounded-xl h-9 px-3 text-sm font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                    <Link href="/downloads">
                        <span className="hidden sm:inline">ดูไฟล์ดาวน์โหลดทั้งหมด</span>
                        <span className="sm:hidden">ทั้งหมด</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>

            {/* 3 Separate Category Big Cards Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5 h-full">
                {categorizedScripts.map((group) => (
                    <div
                        key={group.categoryName}
                        className="flex flex-col space-y-2.5 bg-card/40 rounded-2xl p-3.5 border border-border/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 shadow-xs"
                    >
                        {/* Column Header Category Name */}
                        <div className="flex items-center gap-1.5 border-b border-border/30 pb-2 mb-1">
                            {getCategoryIcon(group.categoryName)}
                            <h4 className="text-xs font-bold truncate text-foreground" title={group.categoryName}>
                                {group.categoryName}
                            </h4>
                        </div>

                        {/* Files List separated by single horizontal divider lines */}
                        <div className="flex-1 divide-y divide-border/20">
                            {group.files && group.files.length > 0 ? (
                                group.files.map((file) => {
                                    const manualUrl = getManualLink(file.description);
                                    const fileName = decodeHtmlEntities(file.name || file.filename);
                                    return (
                                        <div
                                            key={file.id}
                                            className="h-[6.8rem] py-2.5 flex flex-col justify-between hover:bg-muted/20 px-1.5 rounded-md transition-colors"
                                        >
                                            {/* Top area with fixed height for title + NEW badge */}
                                            <div className="h-[4.1rem] flex items-start justify-between gap-1.5 overflow-hidden">
                                                <span
                                                    className="text-xs font-semibold leading-snug break-words text-foreground line-clamp-3"
                                                    title={fileName}
                                                >
                                                    {fileName}
                                                </span>
                                                <Badge
                                                    variant="destructive"
                                                    className="rounded-md px-1.5 py-0.5 text-[9px] font-semibold bg-red-500 hover:bg-red-600 animate-pulse shadow-xs shrink-0"
                                                >
                                                    ✨ NEW
                                                </Badge>
                                            </div>

                                            {/* Bottom row: Version + Larger Icon-Only Action Buttons */}
                                            <div className="h-[1.8rem] flex items-center justify-between text-xs text-muted-foreground pt-0.5">
                                                <span className="text-[11px] font-semibold bg-muted/80 text-foreground/80 px-2 py-0.5 rounded-md border border-border/40 shrink-0 shadow-2xs">
                                                    {file.version ? `v${file.version}` : 'ล่าสุด'}
                                                </span>

                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    {manualUrl && (
                                                        <a
                                                            href={manualUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:scale-105 transition-all shadow-xs border border-amber-500/20"
                                                            title="ดาวน์โหลดคู่มือ"
                                                        >
                                                            <BookOpen className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    <a
                                                        href={`/casdu_cdm/api/proxy-download/${file.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 transition-all shadow-xs border border-primary/20"
                                                        title="ดาวน์โหลดไฟล์"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="py-6 text-center text-xs text-muted-foreground bg-muted/10 rounded-lg p-2 border border-dashed border-border/20 mt-2">
                                    ไม่มีไฟล์ติด NEW ในหมวดนี้
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
