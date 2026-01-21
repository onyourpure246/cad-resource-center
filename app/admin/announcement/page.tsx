import React from 'react';
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import Header from '@/components/Header/Header'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react';
import AnnouncementTable from '@/components/Admin/Announcement/AnnouncementTable';
import { getAnnouncements } from '@/actions/announcement-actions';
import Link from 'next/link';

const actionButtons = (
  <>
    <Button variant="outline" className="cursor-pointer" asChild>
      <Link href="/admin/announcement/create">
        <CirclePlus className=" mr-2 h-4 w-4" /> เพิ่มประกาศใหม่
      </Link>
    </Button>
  </>
)

const AnnouncementPage = async () => {
  const announcements = await getAnnouncements();
  const isLoading = false; // Server component doesn't need loading state for initial render in this way, or we use Suspense

  return (
    <>
      <Header
        title="ข้อมูลประชาสัมพันธ์"
        description="จัดการประกาศและประชาสัมพันธ์ทั้งหมด" />

      <DataManagementLayout
        searchPlaceholder="ค้นหาประกาศ"
        showBreadcrumbs={false}
        actionButtons={actionButtons}
        showBorder={false}
      >
        <AnnouncementTable
          announcements={announcements}
          isLoading={isLoading}
        />
      </DataManagementLayout>
    </>
  )
}

export default AnnouncementPage