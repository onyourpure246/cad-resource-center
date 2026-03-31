import React from 'react'
import Header from '@/components/Layout/Header/Header'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import AnnouncementForm from '@/components/Admin/Announcement/AnnouncementForm';
import { getAnnouncementById } from '@/actions/announcement-actions';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
                actionButtonsAlignment="left"
                actionButtons={
                    <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-primary transition-colors group">
                        <Link href="/admin/announcement" className="flex items-center gap-1 text-muted-foreground group-hover:text-primary">
                            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            ย้อนกลับ
                        </Link>
                    </Button>
                }
            >
                <AnnouncementForm announcement={announcement} className='w-full px-4 py-2 sm:py-4 sm:px-8 lg:py-6 lg:px-10' />
            </DataManagementLayout>
        </>
    )
}

export default EditAnnouncementPage
