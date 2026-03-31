import { useState, useEffect, useCallback } from 'react';
import { adminGetRootFolder, adminGetFolderById } from '@/actions/folder-actions';
import { toast } from 'sonner';
import { FolderNode, UseFolderTreeProps } from '@/types/MoveDialog.types';

export const useFolderTree = ({ initialParentId, enableAutoFetch = true }: UseFolderTreeProps) => {
    const [folders, setFolders] = useState<FolderNode[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(initialParentId);
    const [isLoadingRoot, setIsLoadingRoot] = useState(false);

    const fetchRootFolders = useCallback(async () => {
        setIsLoadingRoot(true);
        try {
            const data = await adminGetRootFolder();
            const rootFolders: FolderNode[] = data.folders.map(f => ({
                ...f,
                children: [],
                isOpen: false,
                hasLoaded: false,
                isLoading: false
            }));
            setFolders(rootFolders);
        } catch (error) {
            console.error("Failed to fetch folders", error);
            toast.error("ไม่สามารถโหลดข้อมูลโฟลเดอร์ได้");
        } finally {
            setIsLoadingRoot(false);
        }
    }, []);

    useEffect(() => {
        if (enableAutoFetch) {
            fetchRootFolders();
        }
    }, [enableAutoFetch, fetchRootFolders]);

    // Reset selection when initialParentId changes
    useEffect(() => {
        setSelectedFolderId(initialParentId);
    }, [initialParentId]);

    const updateFolderNode = useCallback((id: number, updates: Partial<FolderNode>) => {
        setFolders(prev => {
            const traverse = (nodes: FolderNode[]): FolderNode[] => {
                return nodes.map(node => {
                    if (node.id === id) {
                        return { ...node, ...updates };
                    }
                    if (node.children) {
                        return { ...node, children: traverse(node.children) };
                    }
                    return node;
                });
            };
            return traverse(prev);
        });
    }, []);



    // Re-implementing handleToggle to be cleaner:
    // It's easier if we pass the whole node, as the UI has it. 
    // Types requirement: handleToggle(folder: FolderNode, e: ...)

    const toggleFolder = useCallback(async (folder: FolderNode, e: React.MouseEvent) => {
        e.stopPropagation();

        if (folder.isOpen) {
            updateFolderNode(folder.id, { isOpen: false });
        } else {
            if (folder.hasLoaded) {
                updateFolderNode(folder.id, { isOpen: true });
            } else {
                updateFolderNode(folder.id, { isLoading: true, isOpen: true }); // Open immediately with loading
                try {
                    const data = await adminGetFolderById(folder.id);
                    const children: FolderNode[] = data.folders.map(f => ({
                        ...f,
                        children: [],
                        isOpen: false,
                        hasLoaded: false,
                        isLoading: false
                    }));
                    updateFolderNode(folder.id, {
                        isLoading: false,
                        hasLoaded: true,
                        children: children
                    });
                } catch (error) {
                    console.error("Failed to fetch subfolders", error);
                    toast.error("ไม่สามารถโหลดโฟลเดอร์ย่อยได้");
                    updateFolderNode(folder.id, { isLoading: false });
                }
            }
        }
    }, [updateFolderNode]);

    return {
        folders,
        setFolders,
        selectedFolderId,
        setSelectedFolderId,
        isLoadingRoot,
        fetchRootFolders,
        handleToggle: toggleFolder
    };
};
