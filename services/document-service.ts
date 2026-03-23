'use server';

import { CreateFolderRequest, UpdateFolderRequest, FolderContentResponse } from '@/types/api';
import { ApiResponse } from '@/types/common';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const getHeaders = (token?: string) => {
    const validToken = token || API_TOKEN;
    if (!API_URL || !validToken) {
        throw new Error('Missing API_URL or API_TOKEN in .env.local');
    }
    return {
        'Authorization': `Bearer ${validToken}`,
    };
};

// CreateFolderParams replaced by CreateFolderRequest

export async function apiCreateFolder(params: CreateFolderRequest, token?: string): Promise<number> {
    const headers = {
        ...(await getHeaders(token)),
        'Content-Type': 'application/json',
    };

    const body: any = {
        name: params.name,
        isactive: params.isactive,
        mui_colour: params.mui_colour,
        description: params.description,
        created_by: params.created_by,
        updated_by: params.updated_by,
    };

    if (params.abbr) body.abbr = params.abbr;
    if (params.parent) body.parent = params.parent;

    const res = await fetch(`${API_URL}/dl/folder`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || res.statusText);
    }

    const json = await res.json();
    if (!json.success || !json.data?.id) {
        throw new Error(json.message || "Invalid response from create folder");
    }

    return json.data.id;
}

export type UpdateFolderParams = UpdateFolderRequest & { id: number };

export async function apiUpdateFolder(params: UpdateFolderParams, token?: string): Promise<void> {
    const headers = {
        ...(await getHeaders(token)),
        'Content-Type': 'application/json',
    };

    const body: any = {
        ...params
    };
    delete body.id; // Don't send ID in body if it's in URL

    const res = await fetch(`${API_URL}/dl/folder/${params.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update Folder Failed");
    }
}

export async function apiUploadFile(formData: FormData, token?: string): Promise<number> {
    const headers = await getHeaders(token);
    // Content-Type is set automatically by fetch when body is FormData

    const res = await fetch(`${API_URL}/dl/file`, {
        method: 'POST',
        headers, // No Content-Type header for FormData
        body: formData,
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Upload Failed");
    }

    const json = await res.json();
    return json.data?.id;
}

export async function apiUpdateFile(id: number, data: any, token?: string): Promise<void> {
    const headers = {
        ...(await getHeaders(token)),
        'Content-Type': 'application/json',
    };

    const res = await fetch(`${API_URL}/dl/file/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update File Failed");
    }
}



export async function apiGetRootFolder(token?: string): Promise<FolderContentResponse> {
    const headers = await getHeaders(token);

    // Default to API_TOKEN if no session token provided (for initial load)
    // getHeaders already handles this fallback to process.env.API_TOKEN

    const res = await fetch(`${API_URL}/dl/folder`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้');
    }

    const json: ApiResponse<FolderContentResponse> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.message || 'เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้');
    }

    return json.data;
}

export async function apiGetFolderById(id: number, token?: string): Promise<FolderContentResponse> {
    const headers = await getHeaders(token);

    const res = await fetch(`${API_URL}/dl/folder/${id}`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('Failed to fetch folder contents');
    }

    const json: ApiResponse<FolderContentResponse> = await res.json();

    if (!json.success || !json.data) {
        throw new Error(json.message || 'Failed to get folder contents data');
    }

    return json.data;
}

export async function apiGetCategories(token?: string): Promise<any[]> {
    const headers = await getHeaders(token);
    const res = await fetch(`${API_URL}/category`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('Failed to fetch categories');
    }
    const json = await res.json();
    return json.success ? json.data : [];
}

export async function apiCreateCategory(name: string, group_name?: string, token?: string): Promise<void> {
    const headers = { ...(await getHeaders(token)), 'Content-Type': 'application/json' };
    const body: any = { name };
    if (group_name) body.group_name = group_name;

    const res = await fetch(`${API_URL}/category`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('Failed to create category');
    }
}

export async function apiUpdateCategory(id: number, name: string, group_name?: string, token?: string): Promise<void> {
    const headers = { ...(await getHeaders(token)), 'Content-Type': 'application/json' };
    const body: any = { name };
    if (group_name) body.group_name = group_name;

    const res = await fetch(`${API_URL}/category/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        // Fallback to PUT if PATCH fails
        const resPut = await fetch(`${API_URL}/category/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        });
        if (!resPut.ok) {
            if (resPut.status === 401 || resPut.status === 403) throw new Error("SESSION_EXPIRED");
            throw new Error('Failed to update category');
        }
    }
}

export async function apiDeleteCategory(id: number, token?: string): Promise<void> {
    const headers = await getHeaders(token);
    const res = await fetch(`${API_URL}/category/${id}`, {
        method: 'DELETE',
        headers,
    });
    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('Failed to delete category');
    }
}
