import React from 'react'
import AnnouncementCard from './AnnouncementCard'
import AnnouncementList from './AnnouncementList';
import { getAnnouncements } from '@/actions/announcement-actions';

const AnnounceSection = async () => {
    const announcements = await getAnnouncements('published');

    return (
        <section className="py-2 md:py-2">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold">ข่าวประกาศ</h2>
                </div>

                <AnnouncementList announcements={announcements} />
            </div>
        </section>
    )
}

export default AnnounceSection