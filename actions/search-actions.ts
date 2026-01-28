'use server'

import { adminGetFolderById, adminGetRootFolder } from './folder-actions';
import { File, Folder } from '@/types/models';

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
