'use server'

import { revalidatePath } from 'next/cache';
import { adminGetFolderById, adminGetRootFolder } from './folder-actions';
import { apiCreateFolder, apiUploadFile, apiUpdateFile } from './document-service';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

import { ImportStats, FileEntry } from '@/types/api';
// Interfaces moved to @/types/api

export const importFolderTree = async (formData: FormData, parentId: number | null): Promise<{ success: boolean; message: string; stats?: ImportStats }> => {
    if (!API_URL || !API_TOKEN) {
        return { success: false, message: 'ไม่พบการตั้งค่า API (Missing API Configuration)' };
    }

    const stats: ImportStats = {
        totalFiles: 0,
        successFiles: 0,
        failedFiles: 0,
        foldersCreated: 0,
        errors: []
    };

    try {
        // 1. Group files by directory structure
        const files = formData.getAll('files') as File[];
        const paths = formData.getAll('paths') as string[]; // "folder/subfolder/file.ext"

        if (files.length !== paths.length) {
            return { success: false, message: 'จำนวนไฟล์และเส้นทางไม่ถูกต้อง (Mismatch between files and paths count)' };
        }

        stats.totalFiles = files.length;

        // Map paths to files
        const fileEntries: FileEntry[] = files.map((file, index) => ({
            file,
            path: paths[index]
        }));


        // 2. Build Directory Tree & Create Folders
        const folderIdMap = new Map<string, number>();

        for (const entry of fileEntries) {
            const parts = entry.path.split('/');
            const fileName = parts.pop(); // Remove file name
            // Now parts is just folders: ["SelectedFolder", "Sub"]

            let currentParentId = parentId;
            let currentPath = "";

            for (const folderName of parts) {
                currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;

                if (folderIdMap.has(currentPath)) {
                    currentParentId = folderIdMap.get(currentPath)!;
                } else {
                    // Create this folder
                    try {
                        const newFolderId = await createFolder(folderName, currentParentId);
                        folderIdMap.set(currentPath, newFolderId);
                        currentParentId = newFolderId;
                        stats.foldersCreated++;
                    } catch (err: any) {
                        stats.errors.push(`ไม่ได้สร้างโฟลเดอร์ '${currentPath}': ${err.message}`);
                        break;
                    }
                }
            }
        }

        // 3. Upload Files
        for (const entry of fileEntries) {
            const parts = entry.path.split('/');
            const fileName = parts.pop();
            const folderPath = parts.join('/');

            // Get the parent ID for this file
            let targetParentId = parentId;
            if (folderPath && folderIdMap.has(folderPath)) {
                targetParentId = folderIdMap.get(folderPath)!;
            } else if (folderPath) {
                // Folder creation failed previously, skip file
                stats.failedFiles++;
                continue;
            }

            // Upload
            try {
                await uploadFile(entry.file, targetParentId);
                stats.successFiles++;
            } catch (err: any) {
                stats.failedFiles++;
                stats.errors.push(`อัปโหลดไฟล์ไม่สำเร็จ ${entry.path}: ${err.message}`);
            }
        }

        revalidatePath('/admin/documents', 'layout');
        return {
            success: true,
            message: `นำเข้าข้อมูลเสร็จสิ้น: สำเร็จ ${stats.successFiles}/${stats.totalFiles} ไฟล์`,
            stats
        };

    } catch (error: any) {
        console.error("Import Error:", error);
        return { success: false, message: `เกิดข้อผิดพลาดในระบบ: ${error.message}` };
    }


    // --- Helper Functions ---

    async function createFolder(name: string, parentId: number | null): Promise<number> {
        try {
            const contents = parentId ? await adminGetFolderById(parentId) : await adminGetRootFolder();
            const existing = contents.folders.find((f: any) => f.name === name);
            if (existing) return existing.id;
        } catch (e) {
            // Ignore fetch error, try create
        }

        return await apiCreateFolder({
            name,
            parent: parentId,
            isactive: 1, // Active mode
            mui_colour: '#FFCE3C' // Default yellow color
        });
    }


    async function uploadFile(file: File, parentId: number | null) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('isactive', '2'); // Draft mode
        if (parentId) formData.append('parent', String(parentId));

        // Auto icons
        const nameLower = file.name.toLowerCase();
        let mui_icon = undefined;
        let mui_colour = undefined;

        if (nameLower.endsWith('.pdf')) {
            mui_icon = 'PictureAsPdf';
            mui_colour = '#E73E29'; // Red for PDF
        } else if (nameLower.endsWith('.zip') || nameLower.endsWith('.rar') || nameLower.endsWith('.7z')) {
            mui_icon = 'FolderZip';
            mui_colour = '#FFCE3C'; // Yellow for ZIP
        } else {
            // Default fallback
            mui_icon = 'InsertDriveFile';
        }

        if (mui_icon) formData.append('mui_icon', mui_icon);
        if (mui_colour) formData.append('mui_colour', mui_colour);

        const newFileId = await apiUploadFile(formData);
    }
}
