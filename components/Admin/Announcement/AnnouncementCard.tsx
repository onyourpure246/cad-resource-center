'use client';

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Announcement } from '@/types/announcement';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface AnnouncementCardProps {
    announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
    // Format date if available, otherwise use createdAt
    const displayDate = announcement.publishDate
        ? announcement.publishDate
        : (announcement.createdAt ? format(new Date(announcement.createdAt), 'dd MMM yyyy', { locale: th }) : '');

    return (
        <Dialog>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
            >
                <Card className="flex flex-col h-full overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 rounded-[1.55rem]">
                    <CardHeader className="pb-0 space-y-2">
                        <div className="flex justify-between items-start gap-4">
                            <Badge
                                variant={announcement.categoryVariant || "default"}
                                className="rounded-full px-2 py-0.5 text-sm  font-normal flex items-center gap-1"
                            >
                                <Tag className="w-3 h-3" />
                                {announcement.category}
                            </Badge>
                            {displayDate && (
                                <div className="flex items-center text-sm text-muted-foreground font-sarabun bg-muted/50 px-2 py-0.5 rounded-full">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{displayDate}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <h3 className=" text-lg font-semibold text-foreground line-clamp-2">
                                {announcement.title}
                            </h3>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-grow pb-3 px-5 pt-0 -mt-1.5">
                        <p className="font-sarabun text-muted-foreground line-clamp-3 leading-relaxed text-sm indent-4">
                            {announcement.content}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-0 pb-4 px-5 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-sarabun">
                            {/* Optional: Add a small status or spacer here if needed, otherwise this validates justify-between */}
                        </span>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="cursor-pointer group  hover:bg-primary/5 hover:text-primary rounded-xl h-8 px-3 flex items-center gap-2"
                            >
                                <span className="text-sm mt-0.5">อ่านเพิ่มเติม</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>
            </motion.div>

            <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={announcement.categoryVariant || "default"}
                            className="rounded-full px-3 py-1 text-sm font-normal flex items-center gap-1.5 w-fit"
                        >
                            <Tag className="w-3.5 h-3.5" />
                            {announcement.category}
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
                    <div className="font-sarabun text-foreground leading-relaxed whitespace-pre-wrap text-base">
                        {announcement.content}
                    </div>
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
