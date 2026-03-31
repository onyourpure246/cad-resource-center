'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminGetRootFolder } from '@/actions/folder-actions';
import { Item } from '@/types/models';

const transformDataToItems = (data: Awaited<ReturnType<typeof adminGetRootFolder>>): Item[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedFolders: Item[] = data.folders.map((folder: any) => ({
        id: `folder-${folder.id}`,
        resourceId: folder.id,
        name: folder.name,
        type: "folder",
        created: folder.created_at || '',
        modified: folder.updated_at || '',
        modifiedBy: folder.updated_by_name || folder.updated_by?.toString() || "Admin",
        createdBy: folder.created_by_name || folder.created_by?.toString() || "Admin",
        mui_icon: folder.mui_icon,
        mui_colour: folder.mui_colour,
        isactive: folder.isactive !== undefined ? folder.isactive : 1
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedFiles: Item[] = data.files.map((file: any) => ({
        id: `file-${file.id}`,
        resourceId: file.id,
        name: file.name,
        filename: file.filename,
        type: "file",
        created: file.created_at || '',
        modified: file.updated_at || '',
        modifiedBy: file.updated_by_name || file.updated_by?.toString() || "Admin",
        createdBy: file.created_by_name || file.created_by?.toString() || "Admin",
        mui_icon: file.mui_icon,
        mui_colour: file.mui_colour,
        downloadUrl: `/api/proxy-download/${file.id}`,
        isactive: file.isactive !== undefined ? file.isactive : 1,
        downloads: file.downloads
    }));
    transformedFolders.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    transformedFiles.sort((a, b) => ((a.filename || a.name) || '').localeCompare((b.filename || b.name) || ''));
    
    return [...transformedFolders, ...transformedFiles];
};

export const useRootDocuments = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminGetRootFolder();
            setItems(transformDataToItems(data));
        } catch (error) {
            console.error("Failed to fetch items:", error);
            setError(error instanceof Error ? error.message : "Failed to fetch items");
            setItems([]); // Clear items on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, isLoading, error, refreshItems: fetchItems };
};
