'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod';
import { ApiResponse, State } from '@/types/common';
import { FolderContentResponse } from '@/types/api';

// fetch root folder
export const adminGetRootFolder = async () => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;

    if (!API_URL || !API_TOKEN) { throw new Error('Missing API_URL or API_TOKEN in .env.local') };

    const res = await fetch(`${API_URL}/dl/folder`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้');
    }

    const json: ApiResponse<FolderContentResponse> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.message || 'เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้');
    }

    return json.data;
}

// fetch selected folder using folderId
export const adminGetFolderById = async (id: number) => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;

    if (!API_URL || !API_TOKEN) { throw new Error('Missing API_URL or API_TOKEN in .env.local') };

    const res = await fetch(`${API_URL}/dl/folder/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch folder contents');
    }

    const json: ApiResponse<FolderContentResponse> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.message || 'Failed to get folder contents data');
    }

    return json.data;
}

// For Create Folder
export const createFolder = async (prevState: any, formData: FormData): Promise<State> => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }

    //Validate form data
    const schema = z.object({
        name: z.string().min(1, 'กรุณากรอกชื่อโฟลเดอร์'),
        abbr: z.string().min(1, 'กรุณากรอกชื่อย่อ').regex(/^[a-zA-Z0-9_-]+$/, 'ชื่อย่อต้องเป็นภาษาอังกฤษ ตัวเลข หรือเครื่องหมาย -_ เท่านั้น'),
        parent: z.string().optional(),
        mui_colour: z.string().optional(),
    });

    const rawData = Object.fromEntries(formData);
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { name, abbr } = parsed.data;
    const parentId = rawData.parent ? parseInt(rawData.parent as string, 10) : null;

    // Validation for duplicate name or abbr
    const currentFolderContents = parentId ? await adminGetFolderById(parentId) : await adminGetRootFolder();

    const isDuplicateName = currentFolderContents.folders.some(folder => folder.name === name);
    if (isDuplicateName) {
        return {
            success: false,
            message: 'ชื่อโฟลเดอร์นี้มีอยู่แล้ว',
            errors: { name: ['ชื่อโฟลเดอร์นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น'] }
        };
    }

    const isDuplicateAbbr = currentFolderContents.folders.some(folder => folder.abbr === abbr);
    if (isDuplicateAbbr) {
        return {
            success: false,
            message: 'ชื่อย่อนี้มีอยู่แล้ว',
            errors: { abbr: ['ชื่อย่อนี้มีอยู่แล้ว กรุณาใช้ชื่อย่ออื่น'] }
        };
    }
    // End validation

    const parentValue = rawData.parent ? parseInt(rawData.parent as string, 10) : null;

    const body = {
        name: rawData.name,
        abbr: rawData.abbr,
        parent: parentValue,
        mui_colour: rawData.mui_colour,
    };

    const res = await fetch(`${API_URL}/dl/folder`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorResponse = await res.json();
        console.error('Failed to create folder:', errorResponse);
        return { success: false, message: errorResponse.message || 'สร้างโฟลเดอร์ไม่สำเร็จ' } as const;
    }

    revalidatePath('/admin/documents', 'layout');
    return { success: true, message: 'สร้างโฟลเดอร์สำเร็จ!' } as const;
}


// update folder
// PATCH https://casdu-backops.witspleasure.com/api/fy2569/dl/folder/:id
export const updateFolder = async (prevState: any, formData: FormData): Promise<State> => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }

    const schema = z.object({
        id: z.string().min(1, 'ไม่พบ ID ของโฟลเดอร์'),
        name: z.string().min(1, 'กรุณากรอกชื่อโฟลเดอร์'),
        description: z.string().optional(),
        parent: z.string().optional(),
        mui_colour: z.string().optional(),
    });

    const rawData = Object.fromEntries(formData);
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { id, name } = parsed.data;
    const folderId = parseInt(id, 10);
    const parentId = rawData.parent ? parseInt(rawData.parent as string, 10) : null;

    // Validation for duplicate name or abbr
    const currentFolderContents = parentId ? await adminGetFolderById(parentId) : await adminGetRootFolder();

    const isDuplicateName = currentFolderContents.folders.some(folder => folder.name === name && folder.id !== folderId);
    if (isDuplicateName) {
        return {
            success: false,
            message: 'ชื่อโฟลเดอร์นี้มีอยู่แล้ว',
            errors: { name: ['ชื่อโฟลเดอร์นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น'] }
        };
    }
    // End validation

    const body = {
        name: rawData.name,
        description: rawData.description,
        mui_colour: rawData.mui_colour,
        parent: parentId
    };

    const res = await fetch(`${API_URL}/dl/folder/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorResponse = await res.json();
        console.error('Failed to update folder:', errorResponse);
        return { success: false, message: errorResponse.message || 'อัปเดตโฟลเดอร์ไม่สำเร็จ' };
    }

    revalidatePath('/admin/documents', 'layout');
    return { success: true, message: 'อัปเดตโฟลเดอร์สำเร็จ!' };
}

// Helper to find path to a folder
export const getFolderPath = async (targetId: number): Promise<{ id: number; name: string }[]> => {
    // 1. Get Root Folders
    try {
        const rootData = await adminGetRootFolder();
        const rootFolders = rootData.folders;

        // Check if target is in root
        const foundInRoot = rootFolders.find(f => f.id === targetId);
        if (foundInRoot) {
            return [{ id: foundInRoot.id, name: foundInRoot.name }];
        }

        // 2. BFS Search
        // Queue holds: { folderId: number, path: {id, name}[] }
        // We start with root folders
        let queue = rootFolders.map(f => ({
            id: f.id,
            path: [{ id: f.id, name: f.name }]
        }));

        // Safety break to prevent infinite loops or too many requests
        let attempts = 0;
        const MAX_ATTEMPTS = 100; // Adjust based on expected tree size

        while (queue.length > 0 && attempts < MAX_ATTEMPTS) {
            attempts++;
            // Process level by level to find shortest path (though tree path is unique)
            // To optimize, we can process the whole queue in parallel if we want, 
            // but let's do one by one or small batches to avoid rate limits.
            // For simplicity and to avoid complex concurrency management here: shift one.

            const current = queue.shift();
            if (!current) continue;

            try {
                const contents = await adminGetFolderById(current.id);

                // Check children
                const foundChild = contents.folders.find(f => f.id === targetId);
                if (foundChild) {
                    return [...current.path, { id: foundChild.id, name: foundChild.name }];
                }

                // Add children to queue
                for (const child of contents.folders) {
                    queue.push({
                        id: child.id,
                        path: [...current.path, { id: child.id, name: child.name }]
                    });
                }
            } catch (e) {
                // Ignore errors for individual folder fetches and continue
                console.warn(`Failed to fetch contents for folder ${current.id} during path search`, e);
            }
        }

        return []; // Not found
    } catch (error) {
        console.error("Error finding folder path:", error);
        return [];
    }
}
