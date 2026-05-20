import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { backendApi } from '@/services/backend-api';
import * as fetchApiModule from '@/services/fetch-api';

vi.mock('@/services/fetch-api', () => ({
  fetchApi: vi.fn(),
}));

describe('backendApi', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_URL: 'https://fake-api.com' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getDashboardStats', () => {
    it('returns data when successful', async () => {
      // Arrange
      const mockData = { totalUsers: 100, activeUsers: 80 };
      vi.spyOn(fetchApiModule, 'fetchApi').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockData }),
      } as any);

      // Act
      const result = await backendApi.getDashboardStats('test-token');

      // Assert
      expect(fetchApiModule.fetchApi).toHaveBeenCalledWith('https://fake-api.com/dashboard/stats', expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token'
        })
      }));
      expect(result).toEqual(mockData);
    });

    it('returns null if response is not ok', async () => {
      // Arrange
      vi.spyOn(fetchApiModule, 'fetchApi').mockResolvedValueOnce({
        ok: false,
      } as any);

      // Act
      const result = await backendApi.getDashboardStats('test-token');

      // Assert
      expect(result).toBeNull();
    });

    it('returns null if API_URL is undefined', async () => {
      // Arrange
      delete process.env.API_URL;

      // Act
      const result = await backendApi.getDashboardStats('test-token');

      // Assert
      expect(result).toBeNull();
      expect(fetchApiModule.fetchApi).not.toHaveBeenCalled();
    });

    it('returns null and catches error if fetchApi throws', async () => {
      // Arrange
      vi.spyOn(fetchApiModule, 'fetchApi').mockRejectedValueOnce(new Error('Network failure'));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      const result = await backendApi.getDashboardStats('test-token');

      // Assert
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });
});
