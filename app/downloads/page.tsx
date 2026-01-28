import CategorySelection from '@/components/DownloadsPage/CategorySelection'
import HeroSection from '@/components/DownloadsPage/HeroSection'
import React from 'react'

const DownloadPage = () => {
    return (
        <>
            <div className="pb-10">
                <HeroSection />
                <CategorySelection />
            </div>
        </>
    )
}

export default DownloadPage