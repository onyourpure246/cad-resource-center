import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFolder } from '@/actions/folder-actions';
import * as documentService from '@/services/document-service';

// Mock the auth module
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ accessToken: 'fake-token', user: { id: 1 } })
}));

// Mock the services
vi.mock('@/services/document-service', () => ({
  apiGetRootFolder: vi.fn(),
  apiGetFolderById: vi.fn(),
  apiCreateFolder: vi.fn()
}));

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}));

describe('Folder Actions', () => {
  describe('createFolder', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return error if name is missing', async () => {
      const formData = new FormData();
      formData.append('abbr', 'TEST');

      const result = await createFolder(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('ข้อมูลไม่ถูกต้อง');
      expect(result.errors?.name).toBeDefined();
    });

    it('should return error if abbr is missing', async () => {
      const formData = new FormData();
      formData.append('name', 'My Folder');

      const result = await createFolder(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('ข้อมูลไม่ถูกต้อง');
      expect(result.errors?.abbr).toBeDefined();
    });

    it('should return error if abbr contains invalid characters', async () => {
      const formData = new FormData();
      formData.append('name', 'My Folder');
      formData.append('abbr', 'TEST @#$');

      const result = await createFolder(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('ข้อมูลไม่ถูกต้อง');
      expect(result.errors?.abbr).toBeDefined();
    });

    it('should return error if folder name is duplicate', async () => {
      const formData = new FormData();
      formData.append('name', 'Duplicate Name');
      formData.append('abbr', 'TEST');

      vi.spyOn(documentService, 'apiGetRootFolder').mockResolvedValueOnce({
        folders: [{ id: 1, name: 'Duplicate Name', abbr: 'OTHER' }],
        files: []
      } as any);

      const result = await createFolder(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('ชื่อโฟลเดอร์นี้มีอยู่แล้ว');
      expect(result.errors?.name).toBeDefined();
    });

    it('should call apiCreateFolder and return success when valid', async () => {
      const formData = new FormData();
      formData.append('name', 'Valid Folder');
      formData.append('abbr', 'VALID');

      vi.spyOn(documentService, 'apiGetRootFolder').mockResolvedValueOnce({
        folders: [{ id: 1, name: 'Other Name', abbr: 'OTHER' }],
        files: []
      } as any);

      vi.spyOn(documentService, 'apiCreateFolder').mockResolvedValueOnce({} as any);

      const result = await createFolder(null, formData);

      expect(documentService.apiCreateFolder).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Valid Folder',
          abbr: 'VALID',
          parent: null,
        }),
        'fake-token'
      );
      expect(result.success).toBe(true);
      expect(result.message).toBe('สร้างโฟลเดอร์สำเร็จ!');
    });
  });
});
