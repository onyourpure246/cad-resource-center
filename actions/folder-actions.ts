'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod';
import { State } from '@/types/common';
import { apiCreateFolder, apiUpdateFolder } from '@/services/document-service';
import { auth } from '@/auth';

import { apiGetRootFolder, apiGetFolderById } from '@/services/document-service';

// fetch root folder
export const adminGetRootFolder = async () => {
    return await apiGetRootFolder();
}

// fetch selected folder using folderId
export const adminGetFolderById = async (id: number) => {
    return await apiGetFolderById(id);
}

// For Create Folder
export const createFolder = async (prevState: any, formData: FormData): Promise<State> => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

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
    try {
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
    } catch (error) {
        console.error('Validation error:', error);
        // Treat as non-blocking for now or return error? 
        // safely ignore read error and proceed to try create
    }
    // Add Audit fields
    const payload: any = {
        name: rawData.name as string,
        abbr: rawData.abbr as string,
        parent: parentId,
        mui_colour: rawData.mui_colour as string,
    };

    if (session?.user?.id) {
        payload.created_by = session.user.id;
        payload.updated_by = session.user.id;
    }

    try {
        await apiCreateFolder(payload, token);

        revalidatePath('/admin/documents', 'layout');
        return { success: true, message: 'สร้างโฟลเดอร์สำเร็จ!' };
    } catch (error: any) {
        console.error('Failed to create folder:', error);
        return { success: false, message: error.message || 'สร้างโฟลเดอร์ไม่สำเร็จ' };
    }
}


// update folder
// PATCH https://casdu-backops.witspleasure.com/api/fy2569/dl/folder/:id
export const updateFolder = async (prevState: any, formData: FormData): Promise<State> => {
    const session = await auth();
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    const token = session?.accessToken || API_TOKEN;

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

    const body: any = {
        name: rawData.name,
        description: rawData.description,
        mui_colour: rawData.mui_colour,
        parent: parentId
    };

    // Add Audit field
    if (session?.user?.id) {
        body.updated_by = session.user.id;
    } else {
        console.warn('UpdateFolder: No user ID found in session for audit logs');
    }

    const res = await fetch(`${API_URL}/dl/folder/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) return { success: false, message: 'SESSION_EXPIRED' };
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
