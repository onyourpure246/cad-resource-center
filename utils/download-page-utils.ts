import { adminGetFolderById, adminGetRootFolder, getFolderPath } from "@/actions/folder-actions";
import { DownloadItem } from '@/types/documents';
import { notFound } from 'next/navigation';

export async function getDownloadPageData(folderId: string) {
    const id = parseInt(folderId, 10);
    if (isNaN(id)) notFound();

    // Parallel fetch for contents and path
    const [folderContents, folderPath] = await Promise.all([
        adminGetFolderById(id),
        getFolderPath(id)
    ]);

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
        mui_icon: file.mui_icon,
        mui_colour: file.mui_colour,
    }));

    // console.log('Folder Contents Keys:', Object.keys(folderContents));
    // console.log('Folder Contents Current:', JSON.stringify(folderContents.currentFolder, null, 2));

    // Calculate back link using path
    let backLink = '/downloads';
    if (folderPath.length > 1) {
        // If path has more than 1 item, the parent is the second to last item
        // e.g. [Root, Parent, Self] -> Parent is index length-2
        const parentFolder = folderPath[folderPath.length - 2];
        backLink = `/downloads/${parentFolder.id}`;
    } else {
        // If path length is 1 (Self is Root) or 0 (Not found/Error), back to /downloads
        backLink = '/downloads';
    }

    return {
        id,
        folderContents,
        subFolders,
        downloadsFromApi,
        backLink
    };
}
