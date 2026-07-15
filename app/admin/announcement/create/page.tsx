import AnnouncementForm from '@/components/Admin/Announcement/AnnouncementForm'
import React from 'react'

const CreateAnnouncementPage = () => {
  return (
    <div className="w-full bg-muted/20 min-h-screen pt-6 px-4 pb-20">
      <AnnouncementForm className="w-full" />
    </div>
  )
}

export default CreateAnnouncementPage