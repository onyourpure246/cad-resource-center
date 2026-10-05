'use client';

import React from 'react'
import {
    Dialog,
    DialogContent,
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

const decodeHtmlEntities = (str: string) => {
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
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—');
};

const stripHtml = (html: string) => {
    if (!html) return "";
    const cleanText = html.replace(/<[^>]*>?/gm, '');
    return decodeHtmlEntities(cleanText).replace(/\s+/g, ' ').trim();
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, paginationElement }) => {
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

    // Category Color Mapping (matching Admin StatusBadge & lib/constants)
    const categoryColors: Record<string, string> = {
        'ประชาสัมพันธ์': 'bg-blue-500/80 text-white border-blue-400/40 shadow-xs',
        'กิจกรรม': 'bg-orange-500/80 text-white border-orange-400/40 shadow-xs',
        'แจ้งเตือนระบบ': 'bg-red-500/80 text-white border-red-400/40 shadow-xs',
        'ระเบียบ/คำสั่ง': 'bg-sky-500/80 text-white border-sky-400/40 shadow-xs',
    };

    const badgeColorClass = categoryColors[category] || 'bg-slate-800/80 text-white border-white/20 shadow-xs';

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
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
            >
                <div
                    onClick={handleReadMore}
                    className="group relative w-full aspect-video overflow-hidden rounded-[1.55rem] border border-border/40 bg-card shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                    {/* Background Cover Image or Fallback Gradient */}
                    {imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={imageUrl}
                            alt={modalData.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                            <Tag className="w-12 h-12 text-white/10" />
                        </div>
                    )}

                    {/* Top Subtle Vignette for Badge legibility on bright images */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />

                    {/* Dark Gradient Overlay ONLY behind the text at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/70" />

                    {/* Top Overlay Header: Category Badge + Urgent + Date */}
                    <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className={`rounded-md px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md shadow-xs ${badgeColorClass}`}
                            >
                                {category}
                            </Badge>
                            {isUrgent && (
                                <Badge variant="destructive" className="shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold bg-red-500/90 text-white animate-pulse shadow-xs">
                                    ด่วน
                                </Badge>
                            )}
                        </div>

                        {displayDate && (
                            <div className="flex items-center text-[11px] sm:text-xs font-sarabun text-white/95 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 whitespace-nowrap shadow-xs">
                                <Calendar className="w-3 h-3 mr-1 text-white/80" />
                                <span>{displayDate}</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom Overlay Content: Title + Description Snippet + Read More */}
                    <div className="relative z-10 p-3 sm:p-4 pt-0 space-y-1 flex flex-col justify-end">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white line-clamp-1 leading-snug drop-shadow-sm group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-colors" title={decodeHtmlEntities(modalData.title)}>
                            {decodeHtmlEntities(modalData.title)}
                        </h3>

                        <p className="font-sarabun text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed drop-shadow-xs">
                            {stripHtml(modalData.content)}
                        </p>

                        <div className="pt-1 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-white/60 font-sarabun shrink-0">
                                ฝ่ายพัฒนาระบบ
                            </span>

                            {/* Center Pagination Dots & Loader */}
                            {paginationElement && (
                                <div className="flex items-center justify-center shrink-0 z-20">
                                    {paginationElement}
                                </div>
                            )}

                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-400 dark:group-hover:text-amber-300 transition-colors shrink-0">
                                <span>{isLoading ? 'กำลังโหลด...' : 'อ่านเพิ่มเติม'}</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>
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
