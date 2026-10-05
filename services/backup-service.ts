'use server';

import { ApiResponse } from '@/types/common';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

const getHeaders = (token?: string) => {
    const validToken = token || API_TOKEN;
    if (!API_URL || !validToken) {
        throw new Error('Missing API_URL or API_TOKEN in environment');
    }
    return {
        'Authorization': `Bearer ${validToken}`,
    };
};

export interface BackupStats {
    userCount: number;
    folderCount: number;
    fileCount: number;
    categoryCount: number;
    announcementCount: number;
    uploadsSizeMB: number;
}

export async function apiGetBackupStats(token?: string): Promise<BackupStats> {
    const headers = getHeaders(token);

    const res = await fetch(`${API_URL}/backup/stats`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        throw new Error('Failed to fetch backup statistics');
    }

    const json: ApiResponse<BackupStats> = await res.json();
    if (!json.success || !json.data) {
        throw new Error(json.message || 'Failed to load backup stats');
    }

    return json.data;
}

export async function apiExportBackup(token?: string): Promise<{ blob: Blob; fileName: string }> {
    const headers = getHeaders(token);

    const res = await fetch(`${API_URL}/backup/export`, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || 'Failed to export backup');
    }

    const contentDisposition = res.headers.get('Content-Disposition') || '';
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    const fileName = match ? match[1] : `backup_${Date.now()}.zip`;

    const blob = await res.blob();
    return { blob, fileName };
}

export async function apiRestoreBackup(formData: FormData, token?: string): Promise<void> {
    const headers = getHeaders(token);

    const res = await fetch(`${API_URL}/backup/restore`, {
        method: 'POST',
        headers,
        body: formData,
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) throw new Error("SESSION_EXPIRED");
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || 'Failed to restore backup');
    }
}
