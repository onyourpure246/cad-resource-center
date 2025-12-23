import { Folder, File, CurrentFolder, Breadcrumb } from './models';

// Responses
export interface FolderContentResponse {
    folders: Folder[];
    name: string;
    description: string;
    files: File[];
    currentFolder?: CurrentFolder;
    breadcrumbs?: Breadcrumb[];
}

// Request DTOs
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
    isactive?: number; // Added based on inference, though not in original DTO, it matches DLFile sometimes. Keeping strict to original if possible. Original didn't have isactive in CreateFileRequest.
}

export interface UpdateFileRequest {
    parent?: number | null;
    name?: string;
    description?: string;
    filename?: string;
    isactive?: number;
}
