'use server'
import { revalidatePath } from 'next/cache'
import { State, ApiResponse } from '@/types/common';
import { Announcement } from '@/types/announcement';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const getHeaders = () => {
    if (!API_URL || !API_TOKEN) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }
    return {
        'Authorization': `Bearer ${API_TOKEN}`
    };
};

/**
 * Fetch all announcements (GET /news)
 */
export const getAnnouncements = async (status: string = 'all'): Promise<Announcement[]> => {
    try {
        const headers = getHeaders();
        // Pass status parameter to fetch specific status (e.g. 'published') or 'all'
        const res = await fetch(`${API_URL}/news?status=${status}`, {
            method: 'GET',
            headers: headers,
            cache: 'no-store'
        });

        if (!res.ok) {
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
        const headers = getHeaders();
        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'GET',
            headers: headers,
            cache: 'no-store'
        });

        if (!res.ok) {
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
export const createAnnouncement = async (prevState: any, formData: FormData): Promise<State> => {
    try {
        const headers = getHeaders(); // Ensures env vars are present

        // Prepare FormData for the backend
        const backendFormData = new FormData();

        // Map frontend fields to backend expected fields
        const title = formData.get('name') as string;
        const content = formData.get('messages') as string;
        const scheduleDateStr = formData.get('scheduleDate') as string;
        const scheduleTimeStr = formData.get('scheduleTime') as string;

        // Default status to 'published' for now
        const status = 'published';

        if (!title) {
            return { success: false, message: 'กรุณาระบุหัวข้อประกาศ' };
        }

        backendFormData.append('title', title);
        backendFormData.append('content', content || '');
        backendFormData.append('status', status);

        // Handle publish_date
        if (scheduleDateStr) {
            // scheduleDateStr is ISO (e.g., 2024-01-01T00:00:00.000Z)
            // scheduleTimeStr is HH:mm:ss (e.g. 10:30:00)
            try {
                const datePart = scheduleDateStr.split('T')[0]; // YYYY-MM-DD
                const timePart = scheduleTimeStr || '00:00:00';
                const publishDate = `${datePart} ${timePart}`;
                backendFormData.append('publish_date', publishDate);
            } catch (e) {
                console.warn("Error parsing schedule date/time", e);
            }
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
            const errorText = await res.text();
            console.error('Failed to create announcement:', errorText);
            return { success: false, message: 'สร้างประกาศไม่สำเร็จ: ' + res.statusText };
        }

        revalidatePath('/admin/announcement');
        return { success: true, message: "สร้างประกาศสำเร็จ!" };

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
        const headers = getHeaders();
        const backendFormData = new FormData();

        const title = formData.get('name') as string;
        const content = formData.get('messages') as string;

        if (title) backendFormData.append('title', title);
        if (content) backendFormData.append('content', content);

        // Handle logic for status updates if needed
        const status = formData.get('status') as string;
        if (status) backendFormData.append('status', status);

        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'PATCH', // or PUT depending on backend
            headers: headers,
            body: backendFormData,
        });

        if (!res.ok) {
            return { success: false, message: 'แก้ไขประกาศไม่สำเร็จ' };
        }

        revalidatePath('/admin/announcement');
        return { success: true, message: 'แก้ไขประกาศสำเร็จ' };

    } catch (error) {
        console.error('Update announcement error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อระบบ' };
    }
}


/**
 * Delete an announcement (DELETE /news/:id)
 */
export const deleteAnnouncement = async (id: number): Promise<State> => {
    try {
        const headers = getHeaders();
        const res = await fetch(`${API_URL}/news/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (!res.ok) {
            return { success: false, message: 'ลบประกาศไม่สำเร็จ' };
        }

        revalidatePath('/admin/announcement');
        return { success: true, message: 'ลบประกาศสำเร็จ' };

    } catch (error) {
        console.error('Delete announcement error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเชื่อมต่อระบบ' };
    }
}
