import React from 'react'
import AnnouncementForm from '@/components/Admin/Announcement/AnnouncementForm';
import { getAnnouncementById } from '@/actions/announcement-actions';
import { notFound } from 'next/navigation';

interface EditPageProps {
    params: Promise<{
        id: string
    }>
}

const EditAnnouncementPage = async ({ params }: EditPageProps) => {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const announcement = await getAnnouncementById(id);

    if (!announcement) {
        notFound();
    }

    return (
        <div className="w-full bg-muted/20 min-h-screen pt-6 px-4 pb-20">
            <AnnouncementForm announcement={announcement} className="w-full" />
        </div>
    )
}

export default EditAnnouncementPage
