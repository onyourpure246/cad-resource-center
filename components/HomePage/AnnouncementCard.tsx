'use client';

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Announcement } from '@/types/announcement';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

import { AnnouncementCardProps } from '@/types/components';

const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    // Format date if available, otherwise use created_at
    const displayDate = announcement.publish_date
        ? format(new Date(announcement.publish_date), 'dd MMM yyyy', { locale: th })
        : (announcement.created_at ? format(new Date(announcement.created_at), 'dd MMM yyyy', { locale: th }) : '');

    // Default Category
    const category = announcement.category || "ทั่วไป";

    // Image URL - Use the local proxy which handles the backend authentication
    const isAbsoluteUrl = announcement.cover_image?.startsWith('blob:') || announcement.cover_image?.startsWith('http');
    const imageUrl = announcement.cover_image
        ? (isAbsoluteUrl ? announcement.cover_image : `/api/images/${announcement.cover_image}`)
        : null;

    // Category Color Mapping (consistent with Admin columns)
    const categoryColors: Record<string, string> = {
        'ประชาสัมพันธ์': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/50',
        'news': 'bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25 border-blue-200/50',
        'กิจกรรม': 'bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/50',
        'activity': 'bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25 border-orange-200/50',
        'system': 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20',
        'แจ้งเตือนระบบ': 'bg-destructive/15 text-destructive hover:bg-destructive/25 border-destructive/20',
        'official': 'bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border-sky-200/50',
        'ระเบียบ/คำสั่ง': 'bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border-sky-200/50',
    };

    const badgeColorClass = categoryColors[category] || 'bg-secondary text-secondary-foreground hover:bg-secondary/80';

    return (
        <Dialog>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
            >
                <Card className="flex flex-col h-full overflow-hidden border-border/ bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 rounded-[1.55rem]">

                    {/* Cover Image - Reduced height */}
                    {imageUrl ? (
                        <div className="relative w-full h-32 overflow-hidden bg-muted">
                            <img
                                src={imageUrl}
                                alt={announcement.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    ) : (
                        <div className="relative w-full h-32 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                            <Tag className="w-10 h-10 text-muted-foreground/20" />
                        </div>
                    )}

                    <CardHeader className="p-3 pb-0 space-y-0.5 gap-1">
                        <div className="flex justify-between items-start gap-1">
                            <Badge
                                variant="outline"
                                className={`rounded-md px-2 py-0.5 text-xs font-normal flex items-center gap-1 border-transparent ${badgeColorClass}`}
                            >
                                {category}
                            </Badge>
                            {displayDate && (
                                <div className="flex items-center text-xs text-muted-foreground font-sarabun bg-muted/50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{displayDate}</span>
                                </div>
                            )}
                        </div>

                        <div className="h-[1.75rem] flex items-center">
                            <h3 className="text-lg font-semibold text-foreground line-clamp-1 leading-normal" title={announcement.title}>
                                {announcement.title}
                            </h3>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-grow p-3 pt-2 pb-0">
                        <div className="h-[3.25rem]">
                            <p className="font-sarabun text-muted-foreground line-clamp-2 leading-relaxed text-base indent-0">
                                {stripHtml(announcement.content)}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="p-3 pt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-sarabun">
                            {/* Spacer or View Count if needed */}
                        </span>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="cursor-pointer group hover:bg-primary/5 hover:text-primary rounded-lg h-7 px-2 flex items-center gap-1.5 text-sm"
                            >
                                <span className="mt-0.5">อ่านเพิ่มเติม</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
            </motion.div>

            <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    {imageUrl && (
                        <div className="w-full h-64 overflow-hidden rounded-xl mb-4 bg-muted">
                            <img
                                src={imageUrl}
                                alt={announcement.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="outline"
                            className={`rounded-full px-3 py-1 text-sm font-normal flex items-center gap-1.5 w-fit border-transparent ${badgeColorClass}`}
                        >
                            <Tag className="w-3.5 h-3.5" />
                            {category}
                        </Badge>
                        {displayDate && (
                            <div className="flex items-center text-sm text-muted-foreground font-sarabun bg-muted px-2.5 py-1 rounded-full">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                <span>{displayDate}</span>
                            </div>
                        )}
                    </div>
                    <DialogTitle className="text-2xl font-bold leading-tight font-sarabun">
                        {announcement.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {/* Safe HTML Rendering */}
                    {/* Safe HTML Rendering */}
                    <div
                        className="font-sarabun text-foreground text-base w-full break-words leading-normal"
                        dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end">
                    <DialogTrigger asChild>
                        <Button variant="outline" className="cursor-pointer rounded-xl">ปิดหน้าต่าง</Button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AnnouncementCard
