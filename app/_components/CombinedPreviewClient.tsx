'use client';

import React from 'react';
import { Announcement } from '@/types/announcement';
import { CategorizedScriptFiles } from '@/actions/file-actions';
import HomeAnnounceColumn from './HomeAnnounceColumn';
import HomeLatestScriptsColumn from './HomeLatestScriptsColumn';

interface CombinedPreviewClientProps {
    announcements: Announcement[];
    categorizedScripts: CategorizedScriptFiles[];
}

export default function CombinedPreviewClient({
    announcements,
    categorizedScripts
}: CombinedPreviewClientProps) {
    return (
        <section className="py-8 border-b border-border/40 relative">
            <div className="container mx-auto px-4 lg:px-8 max-w-[1920px]">
                {/* 50 / 50 Grid Container with Subtle Vertical Divider */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch lg:before:absolute lg:before:left-1/2 lg:before:top-4 lg:before:bottom-4 lg:before:w-[1px] lg:before:bg-gradient-to-b lg:before:from-transparent lg:before:via-border/60 lg:before:to-transparent lg:before:-translate-x-1/2">
                    {/* LEFT COLUMN (50%): ข่าวประกาศ */}
                    <HomeAnnounceColumn announcements={announcements} />

                    {/* RIGHT COLUMN (50%): อัปเดตล่าสุด (ชุดคำสั่ง CATS 3 หมวด) */}
                    <HomeLatestScriptsColumn categorizedScripts={categorizedScripts} />
                </div>
            </div>
        </section>
    );
}
