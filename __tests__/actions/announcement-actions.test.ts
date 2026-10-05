process.env.API_URL = 'https://fake-api.com';
process.env.API_TOKEN = 'fake-token';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAnnouncements, createAnnouncement, updateAnnouncementStatus } from '@/actions/announcement-actions';

// Mock auth
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ accessToken: 'fake-token', user: { id: 1 } })
}));

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}));

describe('Announcement Actions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_URL: 'https://fake-api.com', API_TOKEN: 'fake-token' };
    
    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('getAnnouncements', () => {
    it('returns an array of announcements when successful', async () => {
      const mockNews = [{ id: 1, title: 'Test News', status: 'published' }];
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockNews }),
      });

      const result = await getAnnouncements('published');

      expect(global.fetch).toHaveBeenCalledWith('https://fake-api.com/news?status=published', expect.any(Object));
      expect(result).toEqual(mockNews);
    });
  });

  describe('createAnnouncement', () => {
    it('returns error if title is missing', async () => {
      const formData = new FormData();
      formData.append('messages', 'News content here');
      
      const result = await createAnnouncement(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('กรุณาระบุหัวข้อประกาศ');
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('submits correctly and returns success', async () => {
      const formData = new FormData();
      formData.append('name', 'Valid Title');
      formData.append('messages', 'Valid Content');
      formData.append('status', 'draft');

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const result = await createAnnouncement(null, formData);

      expect(global.fetch).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.message).toBe('สร้างแบบร่างประกาศสำเร็จ');
    });
  });
  
  describe('updateAnnouncementStatus', () => {
    it('updates status and returns correct success message for published', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const result = await updateAnnouncementStatus(1, 'published');

      expect(global.fetch).toHaveBeenCalledWith('https://fake-api.com/news/1', expect.objectContaining({
        method: 'PATCH'
      }));
      expect(result.success).toBe(true);
      expect(result.message).toBe('เผยแพร่ประกาศสำเร็จ');
    });
  });
});
