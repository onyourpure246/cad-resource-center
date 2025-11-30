import CategorySelection from '@/components/DownloadsPage/CategorySelection'
import Header from '@/components/Header/Header'
import React from 'react'

const DownloadPage = () => {
    return (
        <>
            <Header
                title='รายการดาวน์โหลด'
                description='กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กรมตรวจบัญชีสหกรณ์'
            />
            <CategorySelection />
        </>
    )
}

export default DownloadPage