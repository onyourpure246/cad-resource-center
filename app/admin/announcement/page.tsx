import React from 'react';
import Header from '@/components/Layout/Header/Header'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react';
import AnnouncementTable from '@/components/Admin/Announcement/AnnouncementTable';
import { getAnnouncements } from '@/actions/announcement-actions';
import Link from 'next/link';

const actionButtons = (
  <>
    <Button variant="default" className="cursor-pointer" asChild>
      <Link href="/admin/announcement/create">
        <CirclePlus className=" mr-2 h-4 w-4" /> สร้างประกาศใหม่
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

      <AnnouncementTable
        announcements={announcements}
        isLoading={isLoading}
        actionButtons={actionButtons}
      />
    </>
  )
}

export default AnnouncementPage