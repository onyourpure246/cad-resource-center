'use client';

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Announcement } from '@/types/announcement';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

import { AnnouncementCardProps } from '@/types/components';
import { getAnnouncementById } from '@/actions/announcement-actions';

const stripHtml = (html: string) => {
    if (!html) return "";
    return html
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalData, setModalData] = React.useState<Announcement>(announcement);

    React.useEffect(() => {
        setModalData(announcement);
    }, [announcement]);

    // Format date if available, otherwise use created_at
    const displayDate = modalData.publish_date
        ? format(new Date(modalData.publish_date), 'dd MMM yyyy', { locale: th })
        : (modalData.created_at ? format(new Date(modalData.created_at), 'dd MMM yyyy', { locale: th }) : '');

    // Default Category
    const category = modalData.category || "ทั่วไป";

    // Is it Urgent?
    const isUrgent = modalData.is_urgent === 1 || modalData.is_urgent === true;

    // Image URL - Use the local proxy which handles the backend authentication
    const isAbsoluteUrl = modalData.cover_image?.startsWith('blob:') || modalData.cover_image?.startsWith('http');
    const imageUrl = modalData.cover_image
        ? (isAbsoluteUrl ? modalData.cover_image : `/casdu_cdm/api/images/${modalData.cover_image}`)
        : null;

    // Category Color Mapping (consistent with Admin columns)
    const categoryColors: Record<string, string> = {
        'ประชาสัมพันธ์': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/50',
        'กิจกรรม': 'bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/50',
        'แจ้งเตือนระบบ': 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20',
        'ระเบียบ/คำสั่ง': 'bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border-sky-200/50',
    };

    const badgeColorClass = categoryColors[category] || 'bg-secondary text-secondary-foreground hover:bg-secondary/80';

    // Parse cover image adjustments from HTML content
    const coverSettings = React.useMemo(() => {
        const html = modalData.content || '';
        let height = 240;
        let position = 50;
        if (html.includes('id="announcement-cover-settings"')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const settingsEl = doc.querySelector('#announcement-cover-settings');
                if (settingsEl) {
                    const h = settingsEl.getAttribute('data-height');
                    const p = settingsEl.getAttribute('data-position');
                    if (h) height = Number(h);
                    if (p) position = Number(p);
                }
            } catch (e) {
                console.error("Failed to parse cover settings", e);
            }
        }
        return { height, position };
    }, [modalData.content]);

    const handleReadMore = async () => {
        // If ID is invalid (e.g. Preview Mode with ID -1), just open modal with current data
        if (!announcement.id || Number(announcement.id) <= 0) {
            setIsOpen(true);
            return;
        }

        setIsLoading(true);
        try {
            const result = await getAnnouncementById(Number(announcement.id));
            if (result) {
                setModalData(result);
                setIsOpen(true);
            }
        } catch (error) {
            console.error("Failed to load announcement details", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
            >
                <Card className="group flex flex-col h-full overflow-hidden border-border bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 rounded-[1.55rem]">

                    {/* Cover Image - Adjusted height for better balance */}
                    {imageUrl ? (
                        <div className="relative w-full h-40 overflow-hidden bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt={modalData.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-40 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                            <Tag className="w-10 h-10 text-muted-foreground/20" />
                        </div>
                    )}

                    <CardHeader className="p-3 pb-0 space-y-0.5 gap-1">
                        <div className="flex justify-between items-start gap-1">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={`rounded-md px-2 py-0.5 text-xs font-normal flex items-center gap-1 border-transparent ${badgeColorClass}`}
                                >
                                    {category}
                                </Badge>
                                {isUrgent && (
                                    <Badge variant="destructive" className="shrink-0 rounded-md px-2 py-0.5 text-xs font-normal bg-red-500 hover:bg-red-600 animate-pulse">
                                        ด่วน
                                    </Badge>
                                )}
                            </div>
                            {displayDate && (
                                <div className="flex items-center text-xs text-muted-foreground font-sarabun bg-muted/50 px-2 py-0.5 rounded-full whitespace-nowrap border">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{displayDate}</span>
                                </div>
                            )}
                        </div>

                        <div className="h-[1.75rem] flex items-center">
                            <h3 className="text-lg font-semibold text-foreground line-clamp-1 leading-normal" title={modalData.title}>
                                {modalData.title}
                            </h3>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-grow p-3 pt-0 pb-0">
                        <div className="h-[3.25rem]">
                            <p className="font-sarabun text-muted-foreground line-clamp-2 leading-relaxed text-base indent-0">
                                {stripHtml(modalData.content)}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="p-3 pt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-sarabun">
                            {/* Spacer or View Count if needed */}
                        </span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleReadMore}
                            disabled={isLoading}
                            className="cursor-pointer group hover:bg-primary/5 hover:text-primary rounded-lg h-7 px-2 flex items-center gap-1.5 text-sm"
                        >
                            <span className="mt-0.5">{isLoading ? 'กำลังโหลด...' : 'อ่านเพิ่มเติม'}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            <DialogContent className="max-w-[1200px] sm:max-w-[1200px] w-[95vw] max-h-[92vh] overflow-y-auto rounded-2xl p-0 custom-scrollbar">
                <div className="flex flex-col">
                    {/* Header Banner - Full Width & Edge-to-Edge */}
                    {imageUrl && (
                        <div
                            className="w-full overflow-hidden rounded-t-2xl bg-muted border-b border-border/50 shadow-xs"
                            style={{ height: `${coverSettings.height}px` }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt={modalData.title}
                                className="w-full h-full object-cover select-none pointer-events-none"
                                style={{ objectPosition: `center ${coverSettings.position}%` }}
                            />
                        </div>
                    )}

                    {/* Split Layout with dynamic padding depending on cover image presence */}
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-6 md:p-10 ${imageUrl ? 'pt-6 md:pt-8' : ''}`}>
                        {/* LEFT COLUMN: Main content */}
                        <div className="lg:col-span-9 space-y-5">
                            <div className="space-y-3">
                                <DialogTitle className="text-3xl font-extrabold tracking-tight leading-snug font-sarabun text-foreground">
                                    {modalData.title}
                                </DialogTitle>
                                <div className="h-px bg-border/60 w-full" />
                            </div>

                            {/* Safe HTML Content */}
                            <div>
                                <div
                                    className="font-sarabun text-foreground text-base w-full break-words leading-relaxed prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: modalData.content }}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar Metadata card */}
                        <div className="lg:col-span-3 lg:sticky lg:top-0 space-y-4">
                            <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-5 shadow-xs">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    ข้อมูลประกาศข่าวสาร
                                </h3>

                                <div className="h-px bg-border/50 w-full" />

                                <div className="space-y-4">
                                    {/* Category row */}
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                                            <Tag className="w-3.5 h-3.5" /> หมวดหมู่ข่าวสาร
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={`rounded-full px-3 py-0.5 text-sm font-semibold border-transparent ${badgeColorClass}`}
                                            >
                                                {category}
                                            </Badge>
                                            {isUrgent && (
                                                <Badge variant="destructive" className="rounded-full px-3 py-0.5 text-sm font-semibold bg-red-500 hover:bg-red-600 animate-pulse">
                                                    ด่วน
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date row */}
                                    {displayDate && (
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" /> วันที่เผยแพร่
                                            </span>
                                            <span className="text-sm font-semibold text-foreground bg-background border px-3 py-1.5 rounded-xl w-fit">
                                                {displayDate}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-border/50 w-full" />

                                <div className="flex justify-between items-center text-xs text-muted-foreground font-sarabun">
                                    <span>สร้างโดย: ฝ่ายพัฒนาระบบ</span>
                                    {modalData.view_count !== undefined && (
                                        <span>ยอดผู้เข้าชม: {modalData.view_count}</span>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="w-full cursor-pointer rounded-xl h-10 border border-border/80 hover:bg-muted text-sm font-semibold"
                            >
                                ปิดหน้าต่างข่าวสาร
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AnnouncementCard
