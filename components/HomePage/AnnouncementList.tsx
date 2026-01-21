'use client';

import React, { useState, useMemo } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { Announcement } from '@/types/announcement';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

interface AnnouncementListProps {
    announcements: Announcement[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ announcements }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Sort by date descending and chunk into pages of 2
    const pages = useMemo(() => {
        // Sort: newest first
        const sorted = [...announcements].sort((a, b) => {
            const dateA = a.publish_date ? new Date(a.publish_date).getTime() : new Date(a.created_at).getTime();
            const dateB = b.publish_date ? new Date(b.publish_date).getTime() : new Date(b.created_at).getTime();
            return dateB - dateA;
        });

        const chunkSize = 3;
        const result = [];
        for (let i = 0; i < sorted.length; i += chunkSize) {
            result.push(sorted.slice(i, i + chunkSize));
        }

        // Limit to 4 pages maximum as requested
        return result.slice(0, 4);
    }, [announcements]);

    // Handle empty state if no announcements
    if (announcements.length === 0) {
        return (
            <div className="col-span-full text-center py-10 text-muted-foreground">
                ไม่มีข่าวประกาศในขณะนี้
            </div>
        );
    }

    // Default to empty array if index out of bounds (safety)
    const currentItems = pages[activeIndex] || [];

    return (
        <div className="space-y-4">
            {/* Announcement Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[120px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {currentItems.map((announcement) => (
                            <div key={announcement.id} className="h-full">
                                <AnnouncementCard announcement={announcement} />
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Indicators - using shadcn components */}
            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
                                }}
                                className={activeIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {pages.map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveIndex(index);
                                    }}
                                    isActive={activeIndex === index}
                                    className={cn(
                                        "cursor-pointer w-2.5 h-2.5 p-0 min-w-0 rounded-full mx-1 transition-all duration-300",
                                        activeIndex === index
                                            ? "bg-primary border-primary hover:bg-primary"
                                            : "bg-muted-foreground/30 border-transparent hover:bg-muted-foreground/50 text-transparent"
                                    )}
                                >
                                    <span className="sr-only">Page {index + 1}</span>
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (activeIndex < pages.length - 1) setActiveIndex(activeIndex + 1);
                                }}
                                className={activeIndex === pages.length - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default AnnouncementList;
