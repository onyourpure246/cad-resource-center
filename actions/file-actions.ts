'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod';
import { ApiResponse, State } from '@/types/common';
import { adminGetFolderById, adminGetRootFolder } from './folder-actions';

// create ข้อมูลไฟล์ดาวน์โหลด
// POST https://casdu-backops.witspleasure.com/api/fy2569/dl/file
export const uploadFile = async (prevState: any, formData: FormData): Promise<State> => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }

    // Validate schema by zod
    const schema = z.object({
        name: z.string().min(1, 'กรุณากรอกชื่อไฟล์'),
        description: z.string().optional(),
        parent: z.string().optional(),
        file: z.any().refine(file => file instanceof File && file.size > 0, 'กรุณาเลือกไฟล์'),
    });

    // Convert from FormData to Object
    const rawData = Object.fromEntries(formData);
    // Validate rawData using creted zod schema
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { name, description, parent, file } = parsed.data;
    const parentId = parent ? parseInt(parent, 10) : null;

    // Auto-detect icon and colour based on extension
    const fileNameLower = file.name.toLowerCase();
    let mui_icon = undefined;
    let mui_colour = undefined;

    if (fileNameLower.endsWith('.pdf')) {
        mui_icon = 'PictureAsPdf';
        mui_colour = '#E73E29';
    } else if (fileNameLower.endsWith('.zip')) {
        mui_icon = 'FolderZip';
        mui_colour = '#FFCE3C';
    }

    // // We need to use FormData to send file to the backend
    const formDataForFileUpload = new FormData();
    formDataForFileUpload.append('name', name);
    if (description) {
        formDataForFileUpload.append('description', description);
    }
    if (parentId !== null) {
        formDataForFileUpload.append('parent', String(parentId));
    }
    if (mui_icon) {
        formDataForFileUpload.append('mui_icon', mui_icon);
    }
    if (mui_colour) {
        formDataForFileUpload.append('mui_colour', mui_colour);
    }

    formDataForFileUpload.append('file', file, file.name);

    // Request to Server
    const res = await fetch(`${API_URL}/dl/file`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        },
        body: formDataForFileUpload,
    });

    if (!res.ok) {
        const errorResponse = await res.json().catch(() => ({ message: res.statusText }));
        console.error('Failed to upload file:', errorResponse);
        return { success: false, message: 'อัปโหลดไฟล์ไม่สำเร็จ' };
    }

    // Parse response to get the new file ID
    const json = await res.json();
    if (json.success && json.data && json.data.id && (mui_icon || mui_colour)) {
        try {
            const newFileId = json.data.id;
            const updateBody: any = {};
            if (mui_icon) updateBody.mui_icon = mui_icon;
            if (mui_colour) updateBody.mui_colour = mui_colour;

            // Step 2: Update with icon data
            await fetch(`${API_URL}/dl/file/${newFileId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateBody),
            });
        } catch (error) {
            console.error('Failed to update file icon after upload:', error);
            // Continue execution as the file was uploaded successfully
        }
    }

    revalidatePath('/admin/documents', 'layout');
    return { success: true, message: 'อัปโหลดไฟล์สำเร็จ!' };
}


// update ข้อมูลไฟล์
// PATCH /api/dl/file/:id
export const updateFile = async (prevState: any, formData: FormData): Promise<State> => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }

    const schema = z.object({
        id: z.string().min(1, 'ไม่พบ ID ของไฟล์'),
        name: z.string().optional(),
        description: z.string().optional(),
        filename: z.string().optional(),
        parent: z.string().optional(),
    });

    const rawData = Object.fromEntries(formData);
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { id, name, description, filename } = parsed.data;
    const parentId = rawData.parent ? parseInt(rawData.parent as string, 10) : null;

    // Server-side validation for duplicate filename
    // We need to check in the target folder (parentId) if 'filename' already exists
    try {
        const targetFolderContents = parentId
            ? await adminGetFolderById(parentId)
            : await adminGetRootFolder();

        // Check if any file in the target folder has the same filename, excluding the current file itself
        const isDuplicate = targetFolderContents.files.some(
            file => file.filename === filename && file.id !== parseInt(id)
        );

        if (isDuplicate) {
            return { success: false, message: 'ชื่อไฟล์นี้มีอยู่แล้วในโฟลเดอร์นี้' };
        }
    } catch (error) {
        console.error("Failed to validate duplicate filename:", error);
        // Optionally tolerate error or return failure. 
        // For safety, maybe better to fail? Or just proceed? 
        // If we can't check, we might risk duplicate. Let's log and proceed or fail.
        // Let's decide to fail validation if we can't fetch folder.
        return { success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบชื่อไฟล์ซ้ำ' };
    }

    const body: any = {};
    if (name) body.name = name;
    if (description !== undefined) body.description = description;
    if (filename) body.filename = filename;
    // Only set parent if it's explicitly provided in the form data (meaning we intend to move it or confirm it)
    if (rawData.parent !== undefined) body.parent = parentId;

    const res = await fetch(`${API_URL}/dl/file/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorResponse = await res.json().catch(() => ({ message: res.statusText }));
        console.error('Failed to update file:', errorResponse);
        return { success: false, message: errorResponse.message || 'อัปเดตไฟล์ไม่สำเร็จ' };
    }

    revalidatePath('/admin/documents', 'layout');
    return { success: true, message: 'อัปเดตไฟล์สำเร็จ!' };
}
