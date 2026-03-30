'use server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers';
import { State, ApiResponse } from '@/types/common';
import { Announcement } from '@/types/announcement';
import { auth } from '@/auth';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const getAuthHeaders = async () => {
    const session = await auth();
    const token = session?.accessToken || API_TOKEN;

    if (!API_URL) {
        throw new Error('Missing API_URL in .env.local');
    }

    return {
        'Authorization': `Bearer ${token}`
    };
};

/**
 * Fetch all announcements (GET /news)
 */
export const getAnnouncements = async (status: string = 'all'): Promise<Announcement[]> => {
    try {
        const headers = await getAuthHeaders();
        // Pass status parameter to fetch specific status (e.g. 'published') or 'all'
        const res = await fetch(`${API_URL}/news?status=${status}`, {
            method: 'GET',
            headers: headers,
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) throw new Error('SESSION_EXPIRED');
            console.error('Failed to fetch announcements:', res.statusText);
            return [];
        }

        const json: ApiResponse<Announcement[]> = await res.json();
        return json.data || [];
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
};

/**
 * Fetch single announcement by ID (GET /news/:id)
 */
export const getAnnouncementById = async (id: number): Promise<Announcement | null> => {
    try {
        const headersList = await headers();
        const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
        const userAgent = headersList.get('user-agent');

        const requestHeaders: Record<string, string> = await getAuthHeaders();

        if (clientIp) {
            requestHeaders['X-Forwarded-For'] = clientIp;
        }
        if (userAgent) {
            requestHeaders['User-Agent'] = userAgent;
        }

        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'GET',
            headers: requestHeaders,
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) throw new Error('SESSION_EXPIRED');
            return null;
        }

        const json: ApiResponse<Announcement> = await res.json();
        return json.data || null;
    } catch (error) {
        console.error(`Error fetching announcement ${id}:`, error);
        return null;
    }
};

/**
 * Create a new announcement (POST /news)
 */
export const createAnnouncement = async (prevState: State | null, formData: FormData): Promise<State> => {
    try {
        const headers = await getAuthHeaders();

        // Prepare FormData for the backend
        const backendFormData = new FormData();

        // Map frontend fields to backend expected fields
        const title = formData.get('name') as string;
        const content = formData.get('messages') as string;
        const category = formData.get('category') as string;
        // Default status to 'draft' if not specified
        const status = (formData.get('status') as string) || 'draft';

        if (!title) {
            return { success: false, message: 'กรุณาระบุหัวข้อประกาศ' };
        }

        backendFormData.append('title', title);
        backendFormData.append('content', content || '');
        backendFormData.append('status', status);

        if (category) {
            backendFormData.append('category', category);
        }

        const isUrgent = formData.get('is_urgent') as string;
        if (isUrgent !== null) {
            backendFormData.append('is_urgent', isUrgent);
        }

        // Handle Cover Image
        // Frontend typically sends 'file' or 'cover_image'
        // Let's check what CreateNewAnnouncement sends. It usually doesn't have file input yet in the snippet shown provided code
        // But assuming we will add it.
        const file = formData.get('cover_image') as File;
        if (file && file.size > 0) {
            backendFormData.append('cover_image', file);
        }

        const res = await fetch(`${API_URL}/news`, {
            method: 'POST',
            headers: headers, // Just auth header
            body: backendFormData,
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) return { success: false, message: 'SESSION_EXPIRED' };
            const errorText = await res.text();
            console.error('Failed to create announcement:', errorText);
            return { success: false, message: 'สร้างประกาศไม่สำเร็จ: ' + res.statusText };
        }

        revalidatePath('/admin/announcement');

        let successMessage = "สร้างประกาศสำเร็จ!";
        if (status.toLowerCase() === 'draft') {
            successMessage = "สร้างแบบร่างประกาศสำเร็จ";
        } else if (status.toLowerCase() === 'published') {
            successMessage = "สร้างและเผยแพร่ประกาศสำเร็จ";
        }

        return { success: true, message: successMessage };

    } catch (error) {
        console.error('Create announcement error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อระบบ' };
    }
};

/**
 * Update an announcement (PATCH /news/:id)
 */
export const updateAnnouncement = async (id: number, formData: FormData): Promise<State> => {
    try {
        const headers = await getAuthHeaders();
        const backendFormData = new FormData();

        const title = formData.get('name') as string;
        const content = formData.get('messages') as string;

        if (title) backendFormData.append('title', title);
        if (content) backendFormData.append('content', content);

        const category = formData.get('category') as string;
        if (category) backendFormData.append('category', category);

        const isUrgent = formData.get('is_urgent') as string;
        if (isUrgent !== null) {
            backendFormData.append('is_urgent', isUrgent);
        }

        // Handle Cover Image update
        const file = formData.get('cover_image') as File;
        const removeImage = formData.get('remove_cover_image') === 'true';

        if (file && file.size > 0) {
            backendFormData.append('cover_image', file);
        } else if (removeImage) {
            backendFormData.append('remove_cover_image', 'true');
        }

        // Handle logic for status updates if needed
        const status = formData.get('status') as string;
        if (status) backendFormData.append('status', status);

        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'PATCH', // or PUT depending on backend
            headers: headers,
            body: backendFormData,
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) return { success: false, message: 'SESSION_EXPIRED' };
            return { success: false, message: 'แก้ไขประกาศไม่สำเร็จ' };
        }

        revalidatePath('/admin/announcement');

        let successMessage = 'บันทึกการแก้ไขสำเร็จ';
        const newStatus = formData.get('status') as string;

        if (newStatus) {
            switch (newStatus.toLowerCase()) {
                case 'draft':
                    successMessage = 'บันทึกแบบร่างสำเร็จ';
                    break;
                case 'published':
                    successMessage = 'เผยแพร่ประกาศสำเร็จ';
                    break;
                case 'archived':
                    successMessage = 'จัดเก็บประกาศสำเร็จ';
                    break;
            }
        }

        return { success: true, message: successMessage };

    } catch (error) {
        console.error('Update announcement error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อระบบ' };
    }
}

/**
 * Update announcement status (PATCH /news/:id/status)
 * or re-use update endpoint if backend supports partial updates
 */
export const updateAnnouncementStatus = async (id: number, status: string): Promise<State> => {
    try {
        const formData = new FormData();
        formData.append('status', status);

        // We reuse the update logic, but we want custom messages
        const result = await updateAnnouncement(id, formData);

        if (result.success) {
            let message = 'เปลี่ยนสถานะสำเร็จ';
            switch (status.toLowerCase()) {
                case 'draft':
                    message = 'ยกเลิกการเผยแพร่/เรียกคืนประกาศสำเร็จ';
                    break;
                case 'published':
                    message = 'เผยแพร่ประกาศสำเร็จ';
                    break;
                case 'archived':
                    message = 'จัดเก็บประกาศสำเร็จ';
                    break;
            }
            return { success: true, message };
        }

        return result;

    } catch (error) {
        console.error('Update status error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเปลี่ยนสถานะ' };
    }
}


/**
 * Delete an announcement (DELETE /news/:id)
 */
export const deleteAnnouncement = async (id: number): Promise<State> => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) return { success: false, message: 'SESSION_EXPIRED' };
            return { success: false, message: 'ลบประกาศไม่สำเร็จ' };
        }

        revalidatePath('/admin/announcement');
        return { success: true, message: 'ลบประกาศสำเร็จ' };

    } catch (error) {
        console.error('Delete announcement error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อระบบ' };
    }
}
