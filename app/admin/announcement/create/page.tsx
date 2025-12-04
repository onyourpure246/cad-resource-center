import CreateNewAnnouncement from '@/components/Admin/Announcement/CreateNewAnnouncement'
import DataManagementLayout from '@/components/Admin/DocManagement/DataManagementLayout';
import Header from '@/components/Header/Header'
import React from 'react'

const CreateAnnouncementPage = () => {
  return (
    <>
      <Header title="สร้างประกาศ" description="สร้างประกาศใหม่" />
      <DataManagementLayout
        searchPlaceholder=""
        showSearch={false}
        showBreadcrumbs={false}
        actionButtons={null}
      >
        <CreateNewAnnouncement className='w-full px-4 py-2 sm:py-4 sm:px-8 lg:py-6 lg:px-10' />
      </DataManagementLayout>
    </>
  )
}

export default CreateAnnouncementPage