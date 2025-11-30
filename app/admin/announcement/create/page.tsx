import CreateNewAnnouncement from '@/components/Admin/Announcement/CreateNewAnnouncement'
import Header from '@/components/Header/Header'
import React from 'react'

const CreateAnnouncementPage = () => {
  return (
    <>
      <Header title="สร้างประกาศ" description="สร้างประกาศใหม่" />
      <CreateNewAnnouncement className='w-[1000px] px-4 py-2 sm:py-4 sm:px-8 lg:py-6 lg:px-10'/>

    </>
  )
}

export default CreateAnnouncementPage