import { State } from "./common";

// Database Entities
export interface FolderContentResponse {
    folders: Folder[];
    name: string;
    description: string;
    files: File[];
    currentFolder?: CurrentFolder;
    breadcrumbs?: Breadcrumb[];
}

export interface CurrentFolder {
    id: number;
    name: string;
    abbr: string;
    parent: number | null;
}

export interface Folder {
    id: number;
    name: string;
    description: string;
    abbr: string;
    parent: number | null;
    created_at?: string;
    updated_at?: string;
    updated_by?: number;
    mui_icon?: string;
    mui_colour?: string;
}

export interface Breadcrumb {
    id: number;
    name: string;
}

export interface File {
    id: number;
    parent: number | null;
    name: string;
    description?: string | null;
    filename: string;
    sysname: string;
    isactive: number;
    created_at: string;
    updated_at: string;
    created_by?: number | null;
    updated_by?: number | null;
    mui_icon?: string;
    mui_colour?: string;
}

export interface DownloadItem {
    id: number;
    abbr?: string;
    parent?: number | null;
    name: string | null;
    filename: string;
    sysname?: string;
    description?: string | null;
    version?: string;
    updated_at: string;
    isactive?: number;
    created_by?: number | null;
    created_at?: string;
    updated_by?: number | null;
    tags?: string[];
    downloadUrl?: string;
    mui_icon?: string;
    mui_colour?: string;
}

export interface DownloadFolderPageProps {
    params: Promise<{ folderId: string }>;
}

export interface Item {
    id: number;
    name: string | null;
    description?: string | null;
    abbr?: string | null;
    filename?: string;
    parent?: number | null;
    type: 'folder' | 'file';
    created: string;
    modified: string;
    modifiedBy: string;
    mui_icon?: string;
    mui_colour?: string;
}

// Component Props
// Base Interfaces
export interface BaseParentProps {
    parentId: number | null;
}

export interface BaseSuccessCallback {
    onSuccess: () => void;
}

export interface BaseDialogTrigger {
    trigger: React.ReactNode;
}

export interface BaseItemProps {
    item: Item;
}

// Component Props
export interface AddFolderDialogProps extends BaseParentProps, BaseSuccessCallback { }

export interface DeleteConfirmationDialogProps extends BaseDialogTrigger, BaseSuccessCallback {
    id: number;
    name: string | null;
    type: 'folder' | 'file';
}

export interface EditFolderDialogProps extends BaseParentProps, BaseDialogTrigger, BaseSuccessCallback {
    folder: Item;
}

export interface EditFolderFormProps extends BaseParentProps, BaseSuccessCallback {
    folder: Item;
}

export interface FolderFormProps extends BaseParentProps, BaseSuccessCallback {
    folder?: Item;
}


export interface CreateNewFormProps extends BaseParentProps, BaseSuccessCallback {
    sysname?: string;
}

export interface DataManagementLayoutProps {
    searchPlaceholder: string;
    actionButtons: React.ReactNode;
    children: React.ReactNode;
    breadcrumbs?: Breadcrumb[];
    showBreadcrumbs?: boolean;
    showSearch?: boolean;
    onSearchChange?: (value: string) => void;
    footer?: React.ReactNode;
}

export interface ItemsTableProps extends BaseParentProps {
    items: Item[];
    isLoading: boolean;
    onItemClick: (item: Item) => void;
    onRefresh: () => void;
    sortConfig?: { key: keyof Item; direction: 'asc' | 'desc' } | null;
    onSort?: (key: keyof Item) => void;
}

export interface CategoryCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactElement;
}

export interface DownloadListProps {
    items: DownloadItem[];
    filterTags?: string[];
    filterMap?: Record<string, string>;
}

export interface ListItem {

}

export interface ActionButtonsProps {
    parentId: number | null;
    onRefresh: () => void;
}

export interface SubFolderBadgesProps {
    subFolders: Folder[];
    parentFolderId: number;
    backLink?: string;
}

// From newcdm_types.ts
// Database Types for Download System
export interface DLFolder {
    id: number;
    abbr?: string;
    name: string | null;
    description?: string | null;
    parent?: number | null;
    isactive?: number;
    created_by?: number | null;
    created_at?: string;
    updated_by?: number | null;
    updated_at: string;
}

export interface DLFile {
    id: number;
    parent: number | null;
    name: string;
    description?: string | null;
    filename: string;
    sysname: string;
    isactive: number;
    created_by: number | null;
    created_at: string;
    updated_by: number | null;
    updated_at: string;
}

// Request/Response DTOs
export interface CreateFolderRequest {
    abbr: string;
    name?: string;
    description?: string;
    parent?: number | null;
}

export interface UpdateFolderRequest {
    abbr?: string;
    name?: string;
    description?: string;
    parent?: number | null;
    isactive?: number;
}

export interface CreateFileRequest {
    parent?: number | null;
    name: string;
    description?: string;
    filename: string;
    sysname: string;
}

export interface UpdateFileRequest {
    parent?: number | null;
    name?: string;
    description?: string;
    filename?: string;
    isactive?: number;
}
