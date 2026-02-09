'use server'

import { adminGetFolderById, adminGetRootFolder } from './folder-actions';
import { File, Folder } from '@/types/models';
import { auth } from '@/auth';

// Define a Search Result type that flattens the structure
export interface SearchResultItem extends File {
    folderName: string;
    folderId: number;
    folderPath: string; // Breadcrumb-like string "Root > Folder A"
}

/**
 * Recursive function to traverse folders and find matching files.
 * @param folderId - Current folder ID to search
 * @param query - Search query string
 * @param currentPath - Path string for display
 * @param results - Accumulator for results
 * @param depth - Recursion depth limit
 */
const traverseAndSearch = async (
    folderId: number,
    query: string,
    currentPath: string,
    results: SearchResultItem[],
    depth: number = 0
) => {
    // Safety break for recursion depth (adjust as needed)
    const MAX_DEPTH = 5;
    const MAX_RESULTS = 100; // Limit total results to avoid huge payloads

    if (depth > MAX_DEPTH) return;
    if (results.length >= MAX_RESULTS) return;

    try {
        const content = await adminGetFolderById(folderId);

        // 1. Search Files in current folder
        const normalizedQuery = query.toLowerCase();

        for (const file of content.files) {
            if (results.length >= MAX_RESULTS) break;

            const matchName = file.name.toLowerCase().includes(normalizedQuery);
            const matchFilename = file.filename.toLowerCase().includes(normalizedQuery);
            const matchDesc = file.description?.toLowerCase().includes(normalizedQuery);

            if (matchName || matchFilename || matchDesc) {
                results.push({
                    ...file,
                    folderName: content.name,
                    folderId: content.currentFolder?.id || folderId,
                    folderPath: currentPath
                });
            }
        }

        // 2. Recurse into subfolders
        const folderPromises = content.folders.map(folder => {
            const newPath = currentPath ? `${currentPath} > ${folder.name}` : folder.name;
            return traverseAndSearch(folder.id, query, newPath, results, depth + 1);
        });

        await Promise.all(folderPromises);

    } catch (error) {
        console.error(`Error searching folder ${folderId}:`, error);
        // Continue searching other branches even if one fails
    }
};

export const searchFiles = async (query: string): Promise<SearchResultItem[]> => {
    if (!query || query.trim().length === 0) return [];

    const results: SearchResultItem[] = [];

    try {
        // 1. Get all root folders
        const rootData = await adminGetRootFolder();

        // 2. Search in each root folder tree
        const searchPromises = rootData.folders.map(folder =>
            traverseAndSearch(folder.id, query, folder.name, results)
        );

        await Promise.all(searchPromises);

    } catch (error) {
        console.error("Error initializing search:", error);
    }

    return results;
};

export async function trackSearch(keyword: string) {
    try {
        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
            console.error('API_URL not configured');
            return false;
        }

        // Get session for token
        const session = await auth();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = session?.accessToken || session?.user?.accessToken;

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn('[trackSearch] No access token found in session. Aborting.');
            return false; // Safety: Never send request without token
        }

        // Fire and forget
        fetch(`${apiUrl}/search/track`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ keyword }),
            cache: 'no-store'
        })
            .then(async res => {
                if (!res.ok) console.error(`[trackSearch] Failed: ${res.status} ${res.statusText}`);
            })
            .catch(err => console.error('[trackSearch] Network error:', err));

        return true;
    } catch (error) {
        console.error('trackSearch action error:', error);
        return false;
    }
}

export async function getPopularTags(days: number = 30, limit: number = 10) {
    try {
        const apiUrl = process.env.API_URL;
        if (!apiUrl) return [];

        const session = await auth();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = session?.accessToken || session?.user?.accessToken;

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${apiUrl}/search/popular?days=${days}&limit=${limit}`, {
            method: 'GET',
            headers,
            next: { revalidate: 0 }
        });

        if (!res.ok) return [];
        const json = await res.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error('getPopularTags action error:', error);
        return [];
    }
}
