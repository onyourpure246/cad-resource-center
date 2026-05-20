import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFolderContents } from '@/hooks/useFolderContents';
import * as folderActions from '@/actions/folder-actions';

// Mock the action api
vi.mock('@/actions/folder-actions', () => ({
  adminGetFolderById: vi.fn(),
  getFolderPath: vi.fn(),
}));

describe('useFolderContents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set isLoading to false after successfully fetching data', async () => {
    // Arrange
    vi.spyOn(folderActions, 'adminGetFolderById').mockResolvedValue({
      folders: [
        { id: 1, name: 'Sub Folder', description: 'desc', abbr: 'SUB', created_at: '2026-04-24T00:00:00.000Z' }
      ],
      files: []
    } as any);
    
    vi.spyOn(folderActions, 'getFolderPath').mockResolvedValue([
      { id: 10, name: 'Root Folder' }
    ]);

    // Act
    const { result } = renderHook(() => useFolderContents(10));

    // Assert initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);

    // Wait for the hook to complete data fetching
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert updated state
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('Sub Folder');
    expect(result.current.items[0].type).toBe('folder');
    expect(result.current.breadcrumbs).toHaveLength(1);
    expect(result.current.currentFolder?.name).toBe('Root Folder');
  });

  it('should handle API errors and stop loading', async () => {
    // Arrange
    vi.spyOn(folderActions, 'adminGetFolderById').mockRejectedValue(new Error('Network error'));
    vi.spyOn(folderActions, 'getFolderPath').mockResolvedValue([]);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    const { result } = renderHook(() => useFolderContents(10));

    // Wait for the hook to finish
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Assert that items are empty
    expect(result.current.items).toEqual([]);
    
    // Clean up
    consoleErrorSpy.mockRestore();
  });

  it('should not fetch if folderId is NaN', async () => {
    // Act
    const { result } = renderHook(() => useFolderContents(NaN));

    // Fast return, isLoading might still be true or not even called depending on implementation.
    // Based on hook code, it does an early return if isNaN, so loading will stay true because it is initialized as true.
    expect(result.current.items).toEqual([]);
    expect(folderActions.adminGetFolderById).not.toHaveBeenCalled();
  });
});
