import { getDownloadPageData } from '@/utils/download-page-utils';
import DownloadList from '@/components/DownloadsPage/DownloadLists';
import SubFolderBadges from '@/components/DownloadsPage/SubFolderBadges';
import Header from '@/components/Header/Header';
import { DownloadFolderPageProps } from '@/types/documents';
import React from 'react';


const DownloadFolderPage = async ({ params }: DownloadFolderPageProps) => {
    const { folderId } = await params;
    const { id, folderContents, subFolders, downloadsFromApi, backLink } = await getDownloadPageData(folderId);

    return (
        <>

            <div className="container mx-auto px-10 py-8 max-w-[1920px]">
                <Header
                    title={folderContents.name ?? 'รายการดาวน์โหลด'}
                    description={folderContents.description ?? ''}
                />
                <div className="container mx-auto px-2 py-4 max-w-[1920px]">
                    <SubFolderBadges
                        subFolders={subFolders}
                        parentFolderId={id}
                        backLink={backLink}
                    />
                    <DownloadList items={downloadsFromApi} />
                </div>
            </div>
        </>
    );
};

export default DownloadFolderPage;
