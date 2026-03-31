import { getDownloadPageData } from '@/lib/download-page-utils';
import SharedDownloadView from '../_components/SharedDownloadView';
import { DownloadFolderPageProps } from '@/types/components';
import React from 'react';

const DownloadFolderPage = async ({ params }: DownloadFolderPageProps) => {
    const { folderId } = await params;
    const { id, folderContents, subFolders, downloadsFromApi, backLink } = await getDownloadPageData(folderId);

    return (
        <SharedDownloadView
            title={folderContents.name ?? 'รายการดาวน์โหลด'}
            description={folderContents.description ?? ''}
            items={downloadsFromApi}
            backLink={backLink}
            subFolders={subFolders}
            parentFolderId={id}
        />
    );
};

export default DownloadFolderPage;
