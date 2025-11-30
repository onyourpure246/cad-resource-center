import { adminGetFolderById } from '@/actions/actions';
import DownloadList from '@/components/DownloadsPage/DownloadLists';
import SubFolderBadges from '@/components/DownloadsPage/SubFolderBadges';
import Header from '@/components/Header/Header';
import { DownloadFolderPageProps, DownloadItem } from '@/types/documents';
import { notFound } from 'next/navigation';
import React from 'react';


const DownloadFolderPage = async ({ params }: DownloadFolderPageProps) => {
    const { folderId } = await params;

    const id = parseInt(folderId, 10);
    if (isNaN(id)) notFound();

    const folderContents = await adminGetFolderById(id);
    if (!folderContents) notFound();

    // ดึงข้อมูล Sub Folders จาก API response
    const subFolders = folderContents.folders || [];

    const downloadsFromApi: DownloadItem[] = folderContents.files.map(file => ({
        // อยากให้แสดงอะไรให้ใส่ในนี้
        id: file.id,
        name: file.name,
        filename: file.filename,
        description: file.description || 'ไม่มีคำอธิบาย',
        updated_at: file.updated_at.split(' ')[0],
        downloadUrl: `${process.env.NEXT_PUBLIC_API_URL}/dl/file/download/${file.id}`,
    }));

    // Calculate back link
    let backLink = '/downloads';
    if (folderContents.currentFolder?.parent) {
        backLink = `/downloads/${folderContents.currentFolder.parent}`;
    }

    return (
        <>
            <Header
                title={folderContents.name ?? 'รายการดาวน์โหลด'}
                description={folderContents.description ?? ''}
            />
            <div className="container mx-auto px-4 py-8 max-w-[1320px]">
                <SubFolderBadges
                    subFolders={subFolders}
                    parentFolderId={id}
                    backLink={backLink}
                />
                <DownloadList items={downloadsFromApi} />
            </div>
        </>
    );
};

export default DownloadFolderPage;
