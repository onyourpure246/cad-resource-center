import { Folder as FolderType, Item } from '@/types/models';

export interface MoveDialogProps {
    item: Item;
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
    itemType: 'folder' | 'file';
    onToggle: (folder: FolderNode, e: React.MouseEvent) => void;
    onSelect: (id: number) => void;
    level?: number;
}

export interface UseFolderTreeProps {
    initialParentId: number | null;
    enableAutoFetch?: boolean;
}
