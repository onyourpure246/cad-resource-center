'use server'

import { auth } from '@/auth';
import { User } from '@/types/user';
// import { revalidatePath } from 'next/cache';

const API_URL = process.env.API_URL;

const getHeaders = (token: string) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
});

// 1. Get All Users
export async function getUsers(): Promise<User[]> {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

    if (!API_URL || !token) return [];

    try {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: getHeaders(token),
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) throw new Error('SESSION_EXPIRED');
            console.error('Failed to fetch users:', res.statusText);
            return [];
        }

        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error('getUsers error:', error);
        return [];
    }
}



// 2. Update User (Role/Status)
export async function updateUser(id: string | number, data: Partial<User>) {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

    if (!API_URL || !token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: getHeaders(token),
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) throw new Error('SESSION_EXPIRED');
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'Update failed');
        }

        // revalidatePath('/admin/usermanagement');
        return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('updateUser error:', error);
        return { success: false, message: error.message };
    }
}

// 3. Delete User
export async function deleteUser(id: string | number) {
    const session = await auth();
    const token = session?.accessToken || process.env.API_TOKEN;

    if (!API_URL || !token) throw new Error("Unauthorized");

    try {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders(token),
        });

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) throw new Error('SESSION_EXPIRED');
            throw new Error('Delete failed');
        }

        // revalidatePath('/admin/usermanagement');
        return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('deleteUser error:', error);
        return { success: false, message: error.message };
    }
}
