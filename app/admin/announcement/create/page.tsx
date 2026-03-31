import AnnouncementForm from '@/components/Admin/Announcement/AnnouncementForm'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import Header from '@/components/Layout/Header/Header'
import React from 'react'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const CreateAnnouncementPage = () => {
  return (
    <>
      <Header title="สร้างประกาศ" description="สร้างประกาศใหม่" />
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
        <AnnouncementForm className='w-full px-4 py-2 sm:py-2 sm:px-8 lg:py-2 lg:px-10' />
      </DataManagementLayout>
    </>
  )
}

export default CreateAnnouncementPage