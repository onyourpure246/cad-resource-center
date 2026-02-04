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

    const handleToggle = useCallback(async (folderId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        // We need to find the node to check its state, or just act based on current known state?
        // Since we state update is functional, getting current state is tricky inside callback without dependency.
        // But `updateFolderNode` handles the update. We need to know IF we should fetch.
        // We can pass the folder object itself like useMoveDialog does, or find it.
        // Let's assume we find it or pass it. Passing ID is safer for finding, but we need the node to check `hasLoaded`.
        // Let's modify handleToggle to find the node in the current state or accept the node.

        // Actually, to keep it simple and consistent with useMoveDialog's logic which passed the folder:
        // But passing the folder object from the UI is easier.
        // However, `BulkMoveDialog` was finding it.

        // Let's implement `findNode` helper here to be robust.
        setFolders(currentFolders => {
            const findNode = (nodes: FolderNode[]): FolderNode | undefined => {
                for (const node of nodes) {
                    if (node.id === folderId) return node;
                    if (node.children) {
                        const found = findNode(node.children);
                        if (found) return found;
                    }
                }
                return undefined;
            };

            const node = findNode(currentFolders);

            // We can't do async inside this synchronous state update.
            // So we just return currentFolders effectively, but trigger side effects? No, that's bad.
            // We should read state, then update.
            return currentFolders;
        });

        // Better approach: Functional updates for the state change, but we need to know "do we fetch?".
        // We can do this by using a ref for folders or just trusting the caller to pass the node?
        // Let's accept the node object in handleToggle, like useMoveDialog does.
        return; // See implementation below
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
