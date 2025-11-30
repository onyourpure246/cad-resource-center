import { Folder as FolderType } from '@/types/documents';

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
