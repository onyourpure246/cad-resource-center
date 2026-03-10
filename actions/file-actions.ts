'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod';
import { ApiResponse, State } from '@/types/common';
import { apiGetFolderById, apiGetRootFolder } from '@/services/document-service';
import { apiUploadFile, apiUpdateFile, apiGetCategories, apiCreateCategory, apiDeleteCategory, apiUpdateCategory } from '@/services/document-service';
import { auth } from '@/auth';

// create ข้อมูลไฟล์ดาวน์โหลด
// POST /api/fy2569/dl/file
export const uploadFile = async (prevState: any, formData: FormData): Promise<State> => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

    // Validate schema by zod
    const schema = z.object({
        name: z.string().min(1, 'กรุณากรอกชื่อไฟล์'),
        description: z.string().optional(),
        parent: z.string().optional(),
        file: z.any().refine(file => file instanceof File && file.size > 0, 'กรุณาเลือกไฟล์'),
        isactive: z.string().optional(), // รับค่า isactive
    });

    // Convert from FormData to Object
    const rawData = Object.fromEntries(formData);
    // Validate rawData using creted zod schema
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { name, description, parent, file, isactive } = parsed.data;
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

    // Prepare FormData for API
    const formDataForFileUpload = new FormData();
    formDataForFileUpload.append('name', name);
    if (description) {
        formDataForFileUpload.append('description', description);
    }
    if (parentId !== null) {
        formDataForFileUpload.append('parent', String(parentId));
    }
    if (isactive) {
        formDataForFileUpload.append('isactive', isactive);
    }
    // API expects these in initial POST if possible, although logic below handles PATCH too.
    // We stick to sending them in POST as well for safety/consistency with old code.
    if (mui_icon) {
        formDataForFileUpload.append('mui_icon', mui_icon);
    }
    if (mui_colour) {
        formDataForFileUpload.append('mui_colour', mui_colour);
    }

    formDataForFileUpload.append('file', file, file.name);

    // Add Audit fields
    if (session?.user?.id) {
        formDataForFileUpload.append('created_by', session.user.id);
        formDataForFileUpload.append('updated_by', session.user.id);
        console.log('UploadFile: Appending Audit IDs:', session.user.id);
    } else {
        console.warn('UploadFile: No user ID found in session');
    }

    try {
        const newFileId = await apiUploadFile(formDataForFileUpload, token);

        if (newFileId) {
            // Force update audit fields and icon/color
            // This ensures created_by is set even if POST FormData ignored it
            try {
                const updatePayload: any = {};
                if (mui_icon) updatePayload.mui_icon = mui_icon;
                if (mui_colour) updatePayload.mui_colour = mui_colour;

                if (session?.user?.id) {
                    updatePayload.created_by = session.user.id;
                    updatePayload.updated_by = session.user.id;
                }

                console.log('UploadFile: Patching file with metadata:', JSON.stringify(updatePayload));
                await apiUpdateFile(newFileId, updatePayload, token);
            } catch (updateError) {
                console.error('Failed to update file metadata after upload:', updateError);
            }
        }

        revalidatePath('/admin/documents', 'layout');
        return { success: true, message: 'อัปโหลดไฟล์สำเร็จ' };

    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, message: error.message || 'เกิดข้อผิดพลาดในการอัปโหลด' };
    }
}

// update ข้อมูลไฟล์
// PATCH /api/dl/file/:id
export const updateFile = async (prevState: any, formData: FormData): Promise<State> => {
    const session = await auth();
    const API_URL = process.env.API_URL;
    const token = session?.accessToken || process.env.API_TOKEN;

    if (!API_URL) {
        throw new Error('Missing API_URL in .env.local');
    }

    const schema = z.object({
        id: z.string().min(1, 'ไม่พบ ID ของไฟล์'),
        name: z.string().optional(),
        description: z.string().optional(),
        filename: z.string().optional(),
        parent: z.string().optional(),
        isactive: z.string().optional(),
    });

    const rawData = Object.fromEntries(formData);
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { id, name, description, filename, isactive } = parsed.data;
    const parentId = rawData.parent ? parseInt(rawData.parent as string, 10) : null;

    try {
        const targetFolderContents = parentId
            ? await apiGetFolderById(parentId)
            : await apiGetRootFolder();

        const isDuplicate = targetFolderContents.files.some(
            file => file.filename === filename && file.id !== parseInt(id)
        );

        if (isDuplicate) {
            return { success: false, message: 'ชื่อไฟล์นี้มีอยู่แล้วในโฟลเดอร์นี้' };
        }
    } catch (error) {
        console.error("Failed to validate duplicate filename:", error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบชื่อไฟล์ซ้ำ' };
    }

    const body: any = {};
    if (name) body.name = name;
    if (description !== undefined) body.description = description;
    if (filename) body.filename = filename;
    if (rawData.parent !== undefined) body.parent = parentId;
    if (isactive) body.isactive = parseInt(isactive, 10);

    // Add Audit field
    if (session?.user?.id) {
        body.updated_by = session.user.id;
    } else {
        console.warn('UpdateFile: No user ID found in session for audit logs');
    }

    try {
        await apiUpdateFile(parseInt(id), body, token);
        revalidatePath('/admin/documents', 'layout');
        return { success: true, message: 'อัปเดตไฟล์สำเร็จ!' };
    } catch (error: any) {
        console.error('Failed to update file:', error);
        return { success: false, message: error.message || 'อัปเดตไฟล์ไม่สำเร็จ' };
    }
}

export const getCategories = async () => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;
    return apiGetCategories(token);
};

export const createCategory = async (name: string, group_name?: string) => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;
    return apiCreateCategory(name, group_name, token);
};

export const deleteCategory = async (id: number) => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;
    return apiDeleteCategory(id, token);
};

export const updateCategory = async (id: number, name: string, group_name?: string) => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;
    return apiUpdateCategory(id, name, group_name, token);
};
