// Database Types for Download System
// GET https://casdu-backops.witspleasure.com/api/fy2569/dl/folder/:id
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

// GET https://casdu-backops.witspleasure.com/api/fy2569/dl/file/:id
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
// POST https://casdu-backops.witspleasure.com/api/fy2569/dl/folder
export interface CreateFolderRequest {
	abbr: string;
	name?: string;
	description?: string;
	parent?: number | null;
}

// PATCH https://casdu-backops.witspleasure.com/api/fy2569/dl/folder/:id
export interface UpdateFolderRequest {
	abbr?: string;
	name?: string;
	description?: string;
	parent?: number | null;
	isactive?: number;
}

// POST https://casdu-backops.witspleasure.com/api/fy2569/dl/file
export interface CreateFileRequest {
	parent?: number | null;
	name: string;
	description?: string;
	filename: string;
	sysname: string;
}

// PATCH https://casdu-backops.witspleasure.com/api/fy2569/dl/file/:id
export interface UpdateFileRequest {
	parent?: number | null;
	name?: string;
	description?: string;
	filename?: string;
	isactive?: number;
}



