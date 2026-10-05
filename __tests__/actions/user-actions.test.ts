process.env.API_URL = 'https://fake-api.com';
process.env.API_TOKEN = 'fake-token';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getUsers, updateUser } from '@/actions/user-actions';

// Mock auth
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ accessToken: 'fake-token', user: { id: 1 } })
}));

describe('User Actions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_URL: 'https://fake-api.com', API_TOKEN: 'fake-token' };
    
    // Mock global fetch
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('getUsers', () => {
    it('returns an array of users when successful', async () => {
      const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockUsers }),
      });

      const result = await getUsers();

      expect(global.fetch).toHaveBeenCalledWith('https://fake-api.com/users', expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer fake-token'
        })
      }));
      expect(result).toEqual(mockUsers);
    });

    it('returns empty array when API fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error'
      });
      
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await getUsers();

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateUser', () => {
    it('returns success: true when update is successful', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
      });

      const result = await updateUser(1, { name: 'Updated' } as any);

      expect(global.fetch).toHaveBeenCalledWith('https://fake-api.com/users/1', expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ name: 'Updated' })
      }));
      expect(result).toEqual({ success: true });
    });

    it('returns success: false with message when update fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Update error from server' })
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await updateUser(1, { name: 'Failed' } as any);

      expect(result).toEqual({ success: false, message: 'Update error from server' });
      
      consoleErrorSpy.mockRestore();
    });
  });
});
