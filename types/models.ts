
// Core Database/Domain Entities

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

export interface CurrentFolder {
    id: number;
    name: string;
    abbr: string;
    parent: number | null;
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
    downloadUrl?: string;
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

// From newcdm_types.ts (Database Types for Download System)
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
