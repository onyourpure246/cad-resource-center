import { Folder as FolderType } from '@/types/models';

export interface MoveDialogProps {
    item: { id: number; name: string | null; type: 'folder' | 'file' };
    currentParentId: number | null;
    trigger: React.ReactNode;
    onMoveSuccess: () => void;
}

export interface FolderNode extends FolderType {
    children?: FolderNode[];
    isOpen?: boolean;
    isLoading?: boolean;
    hasLoaded?: boolean;
}

export interface FolderTreeProps {
    nodes: FolderNode[];
    selectedFolderId: number | null;
    itemId: number;
    onToggle: (folder: FolderNode, e: React.MouseEvent) => void;
    onSelect: (id: number) => void;
    level?: number;
}
