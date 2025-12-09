import React from 'react'
import AnnouncementCard from '../Admin/Announcement/AnnouncementCard'
import { Announcement } from '@/types/announcement'
import { announceData } from '@/data/announceData'

const AnnounceSection = () => {
    return (
        <section className="py-4 md:py-6">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold">ข่าวประกาศ</h2>
                    <p className="text-muted-foreground mt-2">
                        ติดตามข่าวสารและอัปเดตล่าสุดจากเรา
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announceData.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AnnounceSection