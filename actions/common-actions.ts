'use server'
import { revalidatePath } from 'next/cache'

// For Delete Item (Folder or File) by id
// DELETE /api/dl/folder/:id or /api/dl/file/:id
export const deleteItemById = async (id: number, type: 'folder' | 'file') => {
    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }

    const endpoint = type === 'folder' ? `/dl/folder/${id}` : `/dl/file/${id}`;
    const successMessage = type === 'folder' ? 'ลบโฟลเดอร์สำเร็จ!' : 'ลบไฟล์สำเร็จ!';
    const errorMessage = type === 'folder' ? 'ลบโฟลเดอร์ไม่สำเร็จ' : 'ลบไฟล์ไม่สำเร็จ';

    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
        },
    });

    if (!res.ok) {
        const errorResponse = await res.json().catch(() => ({ message: 'An unexpected error occurred' }));
        console.error(`Failed to delete ${type}:`, errorResponse);
        return { success: false, message: errorResponse.message || errorMessage };
    }

    revalidatePath('/admin/documents', 'layout');
    return { success: true, message: successMessage };
}
