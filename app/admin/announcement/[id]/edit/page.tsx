import React from 'react'
import Header from '@/components/Header/Header'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import EditAnnouncement from '@/components/Admin/Announcement/EditAnnouncement';
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
        <>
            <Header title="แก้ไขประกาศ" description="แก้ไขรายละเอียดประกาศ" />
            <DataManagementLayout
                searchPlaceholder=""
                showSearch={false}
                showBreadcrumbs={false}
                actionButtons={null}
            >
                <EditAnnouncement announcement={announcement} className='w-full px-4 py-2 sm:py-4 sm:px-8 lg:py-6 lg:px-10' />
            </DataManagementLayout>
        </>
    )
}

export default EditAnnouncementPage
