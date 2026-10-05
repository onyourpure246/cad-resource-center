'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod';
import { State } from '@/types/common';
import { apiGetFolderById, apiGetRootFolder } from '@/services/document-service';
import { apiUploadFile, apiUpdateFile, apiGetCategories, apiCreateCategory, apiDeleteCategory, apiUpdateCategory } from '@/services/document-service';
import { auth } from '@/auth';

// create ข้อมูลไฟล์ดาวน์โหลด
// POST /api/fy2569/dl/file
export const uploadFile = async (prevState: State | null, formData: FormData): Promise<State> => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

    // Validate schema by zod
    const schema = z.object({
        name: z.string().min(1, 'กรุณากรอกชื่อไฟล์'),
        description: z.string().optional(),
        parent: z.string().optional(),
        file: z.any().refine(file => file instanceof File && file.size > 0, 'กรุณาเลือกไฟล์'),
        isactive: z.string().optional(), // รับค่า isactive
        category_id: z.string().optional(),
    });

    // Convert from FormData to Object
    const rawData = Object.fromEntries(formData);
    // Validate rawData using creted zod schema
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { name, description, parent, file, isactive, category_id } = parsed.data;
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
    if (category_id) {
        formDataForFileUpload.append('category_id', category_id);
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
                const updatePayload: Record<string, string | number> = {};
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, message: error.message || 'เกิดข้อผิดพลาดในการอัปโหลด' };
    }
}

// update ข้อมูลไฟล์
// PATCH /api/dl/file/:id
export const updateFile = async (prevState: State | null, formData: FormData): Promise<State> => {
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
        category_id: z.string().optional(),
        version: z.string().optional(),
    });

    const rawData = Object.fromEntries(formData);
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return { success: false, message: 'ข้อมูลไม่ถูกต้อง', errors };
    }

    const { id, name, description, filename, isactive, category_id, version } = parsed.data;
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

    const body: Record<string, string | number | null> = {};
    if (name) body.name = name;
    if (description !== undefined) body.description = description;
    if (filename !== undefined) body.filename = filename;
    if (rawData.parent !== undefined) body.parent = parentId;
    if (isactive !== undefined) body.isactive = parseInt(isactive, 10);
    if (category_id !== undefined) body.category_id = category_id === 'unassigned' ? null : parseInt(category_id, 10);
    if (version !== undefined) body.version = version;

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

import { File as FileModel } from '@/types/models';

export const updateCategory = async (id: number, name: string, group_name?: string) => {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;
    return apiUpdateCategory(id, name, group_name, token);
};

export const getLatestFiles = async (limit: number = 3, categoryGroup?: string): Promise<FileModel[]> => {
    try {
        let allowedCategoryIds: Set<number> | null = null;
        if (categoryGroup) {
            try {
                const categories = await apiGetCategories();
                allowedCategoryIds = new Set(
                    categories
                        .filter(c => c.group_name === categoryGroup)
                        .map(c => c.id)
                );
            } catch (catErr) {
                console.warn("Could not fetch categories for filtering:", catErr);
            }
        }

        const rootData = await apiGetRootFolder();
        const allFiles: FileModel[] = [];
        const visitedFolderIds = new Set<number>();

        const isAllowedFile = (file: FileModel) => {
            if (file.isactive !== 1) return false;
            if (allowedCategoryIds !== null) {
                if (!file.category_id || !allowedCategoryIds.has(file.category_id)) {
                    return false;
                }
            }
            return true;
        };

        const collectFilesFromFolder = async (folderId: number, depth: number = 0) => {
            if (depth > 5 || visitedFolderIds.has(folderId)) return;
            visitedFolderIds.add(folderId);
            try {
                const content = await apiGetFolderById(folderId);
                if (content.files) {
                    for (const file of content.files) {
                        if (isAllowedFile(file)) {
                            allFiles.push(file);
                        }
                    }
                }
                if (content.folders) {
                    const activeFolders = content.folders.filter(f => f.isactive === 1 || f.isactive === undefined);
                    await Promise.all(activeFolders.map(f => collectFilesFromFolder(f.id, depth + 1)));
                }
            } catch (err) {
                console.error(`Error collecting files for folder ${folderId}:`, err);
            }
        };

        if (rootData.files) {
            for (const file of rootData.files) {
                if (isAllowedFile(file)) {
                    allFiles.push(file);
                }
            }
        }

        if (rootData.folders) {
            const activeRootFolders = rootData.folders.filter(f => f.isactive === 1 || f.isactive === undefined);
            await Promise.all(activeRootFolders.map(f => collectFilesFromFolder(f.id, 0)));
        }

        // Deduplicate files by id
        const uniqueMap = new Map<number, FileModel>();
        for (const file of allFiles) {
            if (!uniqueMap.has(file.id)) {
                uniqueMap.set(file.id, file);
            }
        }

        const sortedFiles = Array.from(uniqueMap.values()).sort((a, b) => {
            const dateA = new Date(a.created_at || a.updated_at || 0).getTime();
            const dateB = new Date(b.created_at || b.updated_at || 0).getTime();
            return dateB - dateA;
        });

        return sortedFiles.slice(0, limit);
    } catch (error) {
        console.error("Failed to get latest files:", error);
        return [];
    }
};

export interface CategorizedScriptFiles {
    categoryName: string;
    files: FileModel[];
}

export const getNewScriptFilesGrouped = async (): Promise<CategorizedScriptFiles[]> => {
    try {
        const categories = await apiGetCategories();
        const scriptCategories = categories.filter(c => c.group_name === 'ชุดคำสั่ง');

        const targetCategoryNames = [
            'CATS สหกรณ์การเกษตร',
            'CATS สหกรณ์ออมทรัพย์',
            'ชุดคำสั่งโปรแกรมผู้อื่น'
        ];

        const allScriptFiles = await getLatestFiles(100, 'ชุดคำสั่ง');

        const result: CategorizedScriptFiles[] = targetCategoryNames.map(targetName => {
            const keyword = targetName.includes('การเกษตร') ? 'เกษตร' : targetName.includes('ออมทรัพย์') ? 'ออมทรัพย์' : 'ผู้อื่น';
            
            const matchingCatIds = new Set(
                scriptCategories
                    .filter(c => c.name.toLowerCase().includes(keyword))
                    .map(c => c.id)
            );

            let catFiles = allScriptFiles.filter(f => f.category_id && matchingCatIds.has(f.category_id));

            if (catFiles.length === 0) {
                catFiles = allScriptFiles.filter(f => (f.category_name || '').toLowerCase().includes(keyword));
            }

            // Find newest file for each version to match Download Page's isLatestInVersion rule
            const versions = Array.from(new Set(catFiles.map(f => f.version).filter(Boolean)));
            const latestVersionFileIds = new Set<number>();

            versions.forEach(v => {
                const vFiles = catFiles.filter(f => f.version === v);
                if (vFiles.length > 0) {
                    const latest = vFiles.reduce((a, b) => {
                        const timeA = new Date(a.created_at || a.updated_at || 0).getTime();
                        const timeB = new Date(b.created_at || b.updated_at || 0).getTime();
                        return timeB > timeA ? b : a;
                    });
                    latestVersionFileIds.add(latest.id);
                }
            });

            // If file has no version, mark newest overall file as latest
            if (latestVersionFileIds.size === 0 && catFiles.length > 0) {
                latestVersionFileIds.add(catFiles[0].id);
            }

            // Filter ONLY files that meet the exact Download Page NEW criteria: (within 7 days OR is latest in version)
            const newOnlyFiles = catFiles.filter(file => {
                const isLatestInVersion = latestVersionFileIds.has(file.id);

                const getValidDate = (dateStr?: string | null) => {
                    if (!dateStr) return null;
                    const str = String(dateStr).trim();
                    if (!str) return null;
                    const formattedStr = str.includes(' ') && !str.includes('T') ? str.replace(' ', 'T') : str;
                    const parsed = new Date(formattedStr);
                    return isNaN(parsed.getTime()) ? null : parsed;
                };

                const createdDate = getValidDate(file.created_at) || getValidDate(file.updated_at);
                let isWithin7Days = false;
                if (createdDate) {
                    const now = new Date();
                    const diffDays = Math.ceil(Math.abs(now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                    if (diffDays <= 7) isWithin7Days = true;
                }

                return isWithin7Days || isLatestInVersion;
            });

            return {
                categoryName: targetName,
                files: newOnlyFiles.slice(0, 5)
            };
        });

        return result;
    } catch (error) {
        console.error("Error in getNewScriptFilesGrouped:", error);
        return [
            { categoryName: 'CATS สหกรณ์การเกษตร', files: [] },
            { categoryName: 'CATS สหกรณ์ออมทรัพย์', files: [] },
            { categoryName: 'ชุดคำสั่งโปรแกรมผู้อื่น', files: [] }
        ];
    }
};



