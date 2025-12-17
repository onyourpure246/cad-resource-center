'use server'

import { revalidatePath } from 'next/cache'
import { deleteItemById } from './common-actions'
import { updateFolder } from './folder-actions'
import { updateFile } from './file-actions'

export type BulkItem = {
    id: number;
    type: 'folder' | 'file';
    name: string;
}

export const bulkDeleteItems = async (items: BulkItem[]) => {
    let successCount = 0;
    let failCount = 0;

    for (const item of items) {
        try {
            const result = await deleteItemById(item.id, item.type);
            if (result.success) {
                successCount++;
            } else {
                failCount++;
                console.error(`Failed to delete ${item.type} ${item.id}: ${result.message}`);
            }
        } catch (error) {
            failCount++;
            console.error(`Error deleting ${item.type} ${item.id}:`, error);
        }
    }

    // Revalidate once at the end (though deleteItemById also does it, doing it here ensures consistency)
    revalidatePath('/admin/documents', 'layout');

    return {
        success: failCount === 0,
        message: `ลบสำเร็จ ${successCount} รายการ${failCount > 0 ? `, ล้มเหลว ${failCount} รายการ` : ''}`,
        successCount,
        failCount
    };
}

export const bulkMoveItems = async (items: BulkItem[], targetParentId: number | null) => {
    let successCount = 0;
    let failCount = 0;

    for (const item of items) {
        try {
            const formData = new FormData();
            formData.append('id', item.id.toString());
            // If targetParentId is null, send empty string or handle logic as per existing actions
            // In hooks/useMoveDialog.ts: formData.append('parent', selectedFolderId !== null ? selectedFolderId.toString() : '');
            formData.append('parent', targetParentId !== null ? targetParentId.toString() : '');

            // Name is required for updateFolder logic validation, though technically we aren't changing it.
            // updateFolder schema: name: z.string().min(1)
            // So we must pass the current name.
            formData.append('name', item.name);

            let result;
            if (item.type === 'folder') {
                result = await updateFolder(null, formData);
            } else {
                result = await updateFile(null, formData);
            }

            if (result.success) {
                successCount++;
            } else {
                failCount++;
                console.error(`Failed to move ${item.type} ${item.id}: ${result.message}`);
            }
        } catch (error) {
            failCount++;
            console.error(`Error moving ${item.type} ${item.id}:`, error);
        }
    }

    revalidatePath('/admin/documents', 'layout');

    return {
        success: failCount === 0,
        message: `ย้ายสำเร็จ ${successCount} รายการ${failCount > 0 ? `, ล้มเหลว ${failCount} รายการ` : ''}`,
        successCount,
        failCount
    };
}
