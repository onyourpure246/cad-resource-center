import { SvgIconProps } from '@mui/material';
import { Item, DownloadItem, Folder } from './models';
import { Announcement } from './announcement'; // Assuming types/announcement exists since AnnouncementCard used it.
// If it doesn't exist, I might need to find where Announcement is defined. 
// AnnouncementCard.tsx imported it from '@/types/announcement'.
// I will assume it exists.
import { Breadcrumb } from './models'; // or from api/models depending on usage, but Breadcrumb is in models.

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

// Admin Dialog/Form Props
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

export interface EditFileDrawerProps {
    file: Item;
    trigger: React.ReactNode;
    onSuccess: () => void;
}

// Admin Layout/Table Props
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
    selectedIds: (string | number)[];
    onSelectionChange: (ids: (string | number)[]) => void;
}

export interface ActionButtonsProps {
    parentId: number | null;
    onRefresh: () => void;
    selectedItems?: Item[];
}

export interface RowActionsProps {
    item: Item;
    parentId: number | null;
    onRefresh: () => void;
}

export interface TableSkeletonProps {
    showCheckbox?: boolean;
}

// Downloads Page Props
export interface DownloadFolderPageProps {
    params: Promise<{ folderId: string }>;
}

export interface CategoryCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactElement;
    mui_icon?: string;
    mui_colour?: string;
}

export interface DownloadListProps {
    items: DownloadItem[];
    filterTags?: string[];
    filterMap?: Record<string, string>;
}

export interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface TagCloudProps {
    tags: string[];
}

export interface SubFolderBadgesProps {
    subFolders: Folder[];
    parentFolderId: number;
    backLink?: string;
}

export interface ListItem {

}

export interface MuiIconRendererProps extends SvgIconProps {
    iconName?: string;
    iconColor?: string;
}

export interface ErrorStateProps {
    title?: string;
    description?: string;
    retry?: () => void;
    showReload?: boolean;
}

export interface DownloadCardProps {
    item: DownloadItem;
}

export interface UserActionButtonsProps {
    userId?: string;
    userName?: string;
    onDeleteSuccess?: () => void;
    onRefresh?: () => void;
    selectedIds?: (string | number)[];
}

export interface BulkDeleteDialogProps {
    items: any[];
    trigger: React.ReactNode;
    onSuccess: () => void;
}

export interface BulkMoveDialogProps {
    items: any[];
    currentParentId: number | null;
    trigger: React.ReactNode;
    onSuccess: () => void;
}

export interface PaginationFooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface EditFileFormProps extends BaseSuccessCallback {
    file: Item;
    onCancel: () => void;
}

export interface AnnouncementCardProps {
    announcement: Announcement;
    isAdmin?: boolean;
    onEdit?: (announcement: Announcement) => void;
    onDelete?: (id: number) => void;
}

export interface UseItemsTableColumnsProps {
    parentId: number | null;
    onItemClick: (item: Item) => void;
    onRefresh: () => void;
    sortConfig?: { key: keyof Item; direction: 'asc' | 'desc' } | null;
    onSort?: (key: keyof Item) => void;
}

export interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}
