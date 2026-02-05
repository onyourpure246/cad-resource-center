'use server';

import { CreateFolderRequest, UpdateFolderRequest } from '@/types/api';

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
        ...getHeaders(token),
        'Content-Type': 'application/json',
    };

    const body: any = {
        name: params.name,
        isactive: params.isactive,
        mui_colour: params.mui_colour,
        description: params.description,
    };

    if (params.abbr) body.abbr = params.abbr;
    if (params.parent) body.parent = params.parent;

    const res = await fetch(`${API_URL}/dl/folder`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
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
        ...getHeaders(token),
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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update Folder Failed");
    }
}

export async function apiUploadFile(formData: FormData, token?: string): Promise<number> {
    const headers = getHeaders(token);
    // Content-Type is set automatically by fetch when body is FormData

    const res = await fetch(`${API_URL}/dl/file`, {
        method: 'POST',
        headers, // No Content-Type header for FormData
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Upload Failed");
    }

    const json = await res.json();
    return json.data?.id;
}

export async function apiUpdateFile(id: number, data: any, token?: string): Promise<void> {
    const headers = {
        ...getHeaders(token),
        'Content-Type': 'application/json',
    };

    const res = await fetch(`${API_URL}/dl/file/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update File Failed");
    }
}
