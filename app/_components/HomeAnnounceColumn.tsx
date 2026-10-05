'use client';

import React, { useState, useEffect } from 'react';
import { Announcement } from '@/types/announcement';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';
import AnnouncementCard from './AnnouncementCard';

interface HomeAnnounceColumnProps {
    announcements: Announcement[];
}

export default function HomeAnnounceColumn({ announcements }: HomeAnnounceColumnProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const hasAnnouncements = announcements && announcements.length > 0;
    const currentAnnouncement = hasAnnouncements ? announcements[currentIndex] : null;

    useEffect(() => {
        if (!hasAnnouncements || announcements.length <= 1) return;
    }, [hasAnnouncements, announcements.length]);

    const handlePrev = () => {
        if (!hasAnnouncements) return;
        setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (!hasAnnouncements) return;
        setCurrentIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col justify-between space-y-3">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-border/30 pb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Megaphone className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">ข่าวประกาศ</h2>
                        <p className="text-[11px] text-muted-foreground">ข่าวสารและประชาสัมพันธ์ล่าสุด</p>
                    </div>
                </div>

                {/* Pagination Counter */}
                {hasAnnouncements && (
                    <span className="text-xs text-muted-foreground font-mono bg-muted/40 px-2 py-0.5 rounded-full border border-border/30">
                        {currentIndex + 1} / {announcements.length}
                    </span>
                )}
            </div>

            {/* Announcement Single Card View with Auto-Slide & Framer Motion Animation */}
            <div
                className="flex-1 flex flex-col justify-between relative group transition-all duration-300 rounded-[1.55rem] overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {currentAnnouncement ? (
                    <div className="h-full overflow-hidden relative">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentAnnouncement.id || currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full h-full"
                            >
                                <AnnouncementCard
                                    announcement={currentAnnouncement}
                                    paginationElement={
                                        hasAnnouncements && announcements.length > 1 ? (
                                            <div className="flex items-center gap-1.5">
                                                <style>{`
                                                    @keyframes announcementProgress {
                                                        0% { transform: scaleX(0); }
                                                        100% { transform: scaleX(1); }
                                                    }
                                                `}</style>
                                                {announcements.map((_, idx) => {
                                                    const isActive = idx === currentIndex;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentIndex(idx);
                                                            }}
                                                            className={`transition-all duration-300 rounded-full relative overflow-hidden ${isActive
                                                                    ? 'w-7 h-1.5 bg-white/30 cursor-pointer'
                                                                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80 cursor-pointer'
                                                                }`}
                                                            aria-label={`Go to announcement ${idx + 1}`}
                                                        >
                                                            {isActive && (
                                                                <span
                                                                    key={currentIndex}
                                                                    className="absolute inset-0 bg-amber-400 rounded-full origin-left block"
                                                                    style={{
                                                                        animation: 'announcementProgress 3.5s linear forwards',
                                                                        animationPlayState: isPaused ? 'paused' : 'running',
                                                                        willChange: 'transform'
                                                                    }}
                                                                    onAnimationEnd={() => {
                                                                        if (!isPaused) {
                                                                            handleNext();
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : null
                                    }
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Left & Right Side Vignette Fade Gradient on Hover */}
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-l-[1.55rem]" />
                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-r-[1.55rem]" />

                        {/* Left / Right Chevron Buttons Overlay on Top of Card Image */}
                        {hasAnnouncements && announcements.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/20 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    title="ข่าวล่วงหน้า"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-white/20 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    title="ข่าวถัดไป"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="py-12 text-center text-muted-foreground text-sm">
                        ยังไม่มีข่าวประกาศในระบบ
                    </div>
                )}
            </div>
        </div>
    );
}
