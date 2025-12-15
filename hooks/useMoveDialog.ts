import { useState, useEffect } from 'react';
import { adminGetRootFolder, adminGetFolderById, updateFolder } from '@/actions/folder-actions';
import { updateFile } from '@/actions/file-actions';
import { toast } from 'sonner';
import { FolderNode, MoveDialogProps } from '../types/MoveDialog.types';

type UseMoveDialogProps = Pick<MoveDialogProps, 'item' | 'currentParentId' | 'onMoveSuccess'>;

export const useMoveDialog = ({ item, currentParentId, onMoveSuccess }: UseMoveDialogProps) => {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState<FolderNode[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(currentParentId);
    const [isLoadingRoot, setIsLoadingRoot] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        if (open) {
            fetchRootFolders();
        }
    }, [open]);

    const fetchRootFolders = async () => {
        setIsLoadingRoot(true);
        try {
            const rootData = await adminGetRootFolder();
            const rootFolders: FolderNode[] = rootData.folders.map(f => ({ ...f, children: [], isOpen: false, hasLoaded: false }));
            setFolders(rootFolders);
        } catch (error) {
            console.error("Failed to fetch folders", error);
            toast.error("ไม่สามารถโหลดข้อมูลโฟลเดอร์ได้");
        } finally {
            setIsLoadingRoot(false);
        }
    };

    const handleToggle = async (folder: FolderNode, e: React.MouseEvent) => {
        e.stopPropagation();

        if (folder.isOpen) {
            // Just close it
            updateFolderNode(folder.id, { isOpen: false });
        } else {
            // Open it
            if (folder.hasLoaded) {
                updateFolderNode(folder.id, { isOpen: true });
            } else {
                // Fetch children
                updateFolderNode(folder.id, { isLoading: true });
                try {
                    const data = await adminGetFolderById(folder.id);
                    const children: FolderNode[] = data.folders.map(f => ({ ...f, children: [], isOpen: false, hasLoaded: false }));
                    updateFolderNode(folder.id, {
                        isOpen: true,
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
    };

    const updateFolderNode = (id: number, updates: Partial<FolderNode>) => {
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
    };

    const handleMove = async () => {
        if (selectedFolderId === currentParentId) {
            setOpen(false);
            return;
        }

        setIsMoving(true);
        const formData = new FormData();
        formData.append('id', item.id.toString());

        if (selectedFolderId !== null) {
            formData.append('parent', selectedFolderId.toString());
        } else {
            formData.append('parent', '');
        }

        try {
            let result;
            if (item.type === 'folder') {
                formData.append('name', item.name || '');
                result = await updateFolder(null, formData);
            } else {
                result = await updateFile(null, formData);
            }

            if (result.success) {
                toast.success(`ย้าย ${item.type === 'folder' ? 'โฟลเดอร์' : 'ไฟล์'} สำเร็จ`);
                onMoveSuccess();
                setOpen(false);
            } else {
                toast.error(result.message || "เกิดข้อผิดพลาดในการย้าย");
            }
        } catch (error) {
            console.error("Move error", error);
            toast.error("เกิดข้อผิดพลาดในการย้าย");
        } finally {
            setIsMoving(false);
        }
    };

    return {
        open,
        setOpen,
        folders,
        selectedFolderId,
        setSelectedFolderId,
        isLoadingRoot,
        isMoving,
        handleToggle,
        handleMove
    };
};
