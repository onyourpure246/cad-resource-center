import React from 'react';
import Header from '@/components/Layout/Header/Header'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react';
import AnnouncementTable from '@/components/Admin/Announcement/AnnouncementTable';
import Link from 'next/link';

export default function Loading() {
  const actionButtons = (
    <>
      <Button variant="default" className="cursor-pointer" disabled>
        <CirclePlus className=" mr-2 h-4 w-4" /> สร้างประกาศใหม่
      </Button>
    </>
  )

  return (
    <>
      <Header
        title="ข้อมูลประชาสัมพันธ์"
        description="กำลังโหลดข้อมูล..." />

      <AnnouncementTable
        announcements={[]}
        isLoading={true}
        actionButtons={actionButtons}
      />
    </>
  )
}
