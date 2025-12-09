import { useState, useEffect, useCallback } from 'react';
import { adminGetFolderById, getFolderPath } from '@/actions/actions';
import { Item as FolderItem, File as FileType } from '@/types/documents';

export const useFolderContents = (folderId: number) => {
    const [items, setItems] = useState<FolderItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: number; name: string }[]>([]);

    const fetchFolderContents = useCallback(async () => {
        if (isNaN(folderId)) return;
        setIsLoading(true);
        try {
            // Call the API to get contents of the specific folderId
            const data = await adminGetFolderById(folderId);

            // Fetch Breadcrumbs path
            try {
                const path = await getFolderPath(folderId);
                if (path.length > 0) {
                    setBreadcrumbs(path);
                } else {
                    setBreadcrumbs([]);
                }
            } catch (err) {
                console.error("Failed to fetch breadcrumbs", err);
            }

            const transformedFolders: FolderItem[] = data.folders.map((folder: any) => ({
                id: folder.id,
                name: folder.name,
                description: folder.description,
                abbr: folder.abbr,
                type: "folder",
                created: folder.created_at?.split('T')[0] || '',
                modified: folder.updated_at?.split('T')[0] || '',
                modifiedBy: folder.updated_by?.toString() || "Admin",
                mui_icon: folder.mui_icon,
                mui_colour: folder.mui_colour,
            }));

            const transformedFiles: FolderItem[] = data.files.map((file: any) => ({
                id: file.id,
                name: file.name,
                description: file.description,
                type: "file",
                created: file.created_at?.split('T')[0] || '',
                modified: file.updated_at?.split('T')[0] || '',
                modifiedBy: file.updated_by?.toString() || "Admin",
                mui_icon: file.mui_icon,
                mui_colour: file.mui_colour,
            }));

            // Combine folders and files for display
            setItems([...transformedFolders, ...transformedFiles]);
        } catch (error) {
            console.error(`Failed to fetch contents for folder ID ${folderId}:`, error);
        } finally {
            setIsLoading(false);
        }
    }, [folderId]);

    useEffect(() => {
        fetchFolderContents();
    }, [fetchFolderContents]);

    const currentFolder = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : undefined;

    return { items, isLoading, breadcrumbs, refresh: fetchFolderContents, currentFolder };
};
