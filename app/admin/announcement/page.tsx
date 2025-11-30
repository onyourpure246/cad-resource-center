'use client';

import React, { useState, useEffect } from 'react';
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import Header from '@/components/Header/Header'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react';
import AnnouncementTable from '@/components/Admin/Announcement/AnnouncementTable';
import { Announcement } from '@/types/announcement';
import Link from 'next/link';

// Mock data for demonstration purposes
const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'ประกาศหยุดทำการเนื่องในวันหยุดพิเศษ',
    status: 'Published',
    createdBy: 'Admin',
    createdAt: '2024-07-25',
    updatedAt: '2024-07-25',
  },
  {
    id: 2,
    title: 'ร่าง: แผนการซ้อมหนีไฟประจำปี',
    status: 'Draft',
    createdBy: 'Manager',
    createdAt: '2024-07-22',
    updatedAt: '2024-07-22',
  },
];

const actionButtons = (
  <>
    <Button variant="outline" className="cursor-pointer" asChild>
      <Link href="/admin/announcement/create">
        <CirclePlus className=" mr-2 h-4 w-4" /> เพิ่มประกาศใหม่
      </Link>
    </Button>
  </>
)
const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header
        title="ข้อมูลประชาสัมพันธ์"
        description="จัดการประกาศและประชาสัมพันธ์ทั้งหมด" />

      <DataManagementLayout
        searchPlaceholder="ค้นหาประกาศ"
        showBreadcrumbs={false}
        actionButtons={actionButtons} >
        <AnnouncementTable
          announcements={announcements}
          isLoading={isLoading}
        />
      </DataManagementLayout>
    </>
  )
}

export default AnnouncementPage