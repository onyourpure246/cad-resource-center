'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminGetRootFolder } from '@/actions/actions';
import { Item } from '@/types/documents';

const transformDataToItems = (data: Awaited<ReturnType<typeof adminGetRootFolder>>): Item[] => {
    const transformedFolders: Item[] = data.folders.map(folder => ({
        id: folder.id,
        name: folder.name,
        type: "folder",
        created: folder.created_at?.split('T')[0] || '',
        modified: folder.updated_at?.split('T')[0] || '',
        modifiedBy: folder.updated_by?.toString() || "Admin",
        mui_icon: folder.mui_icon,
        mui_colour: folder.mui_colour,
    }));

    const transformedFiles: Item[] = data.files.map(file => ({
        id: file.id,
        name: file.name,
        type: "file",
        created: file.created_at?.split('T')[0] || '',
        modified: file.updated_at?.split('T')[0] || '',
        modifiedBy: file.updated_by?.toString() || "Admin",
        mui_icon: file.mui_icon,
        mui_colour: file.mui_colour,
    }));

    return [...transformedFolders, ...transformedFiles];
};

export const useRootDocuments = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await adminGetRootFolder();
            setItems(transformDataToItems(data));
        } catch (error) {
            console.error("Failed to fetch items:", error);
            setItems([]); // Clear items on error
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, isLoading, refreshItems: fetchItems };
};
