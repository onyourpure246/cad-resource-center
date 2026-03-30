import { Folder, File as DLFile, CurrentFolder, Breadcrumb } from './models';

// Responses
export interface FolderContentResponse {
    folders: Folder[];
    name: string;
    description: string;
    files: DLFile[];
    currentFolder?: CurrentFolder;
    breadcrumbs?: Breadcrumb[];
}

// Request DTOs
export interface CreateFolderRequest {
    abbr?: string;
    name?: string;
    description?: string;
    parent?: number | null;
    mui_colour?: string;
    isactive?: number;
    created_by?: number;
    updated_by?: number;
}

export interface UpdateFolderRequest {
    abbr?: string;
    name?: string;
    description?: string;
    parent?: number | null;
    isactive?: number;
    mui_colour?: string;
    updated_by?: number;
    created_by?: number;
}

export interface FileEntry {
    path: string; // "folder/subfolder/file.txt"
    file: File;
}


export interface CreateFileRequest {
    parent?: number | null;
    name: string;
    description?: string;
    filename: string;
    sysname: string;
    isactive?: number; // Added based on inference, though not in original DTO, it matches DLFile sometimes. Keeping strict to original if possible. Original didn't have isactive in CreateFileRequest.
    category_id?: number | null;
}

export interface UpdateFileRequest {
    parent?: number | null;
    name?: string;
    description?: string;
    filename?: string;
    isactive?: number;
    category_id?: number | null;
}

export interface ImportStats {
    totalFiles: number;
    successFiles: number;
    failedFiles: number;
    foldersCreated: number;
    errors: string[];
}

