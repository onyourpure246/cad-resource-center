process.env.API_URL = 'https://fake-api.com';
process.env.API_TOKEN = 'fake-token';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/proxy-download/[fileId]/route';

// Mock auth
vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

describe('Proxy Download API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_URL: 'https://fake-api.com', API_TOKEN: 'fake-token' };
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('returns 401 Unauthorized if no session', async () => {
    const { auth } = await import('@/auth');
    (auth as any).mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost/api/proxy-download/123');
    const params = Promise.resolve({ fileId: '123' });
    
    const response = await GET(req, { params });

    expect(response.status).toBe(401);
  });

  it('returns 500 if API_URL is missing', async () => {
    const { auth } = await import('@/auth');
    (auth as any).mockResolvedValueOnce({ user: { id: 1 } });
    delete process.env.API_URL;

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const req = new NextRequest('http://localhost/api/proxy-download/123');
    const params = Promise.resolve({ fileId: '123' });
    
    const response = await GET(req, { params });

    expect(response.status).toBe(500);
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('proxies the request and returns 200 with stream', async () => {
    const { auth } = await import('@/auth');
    (auth as any).mockResolvedValueOnce({ user: { id: 1 } });

    // Mock fetch response
    const mockBody = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2, 3]));
        controller.close();
      }
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/pdf' }),
      body: mockBody,
    });

    const req = new NextRequest('http://localhost/api/proxy-download/123');
    const params = Promise.resolve({ fileId: '123' });
    
    const response = await GET(req, { params });

    expect(global.fetch).toHaveBeenCalledWith('https://fake-api.com/dl/file/123?dl=true', expect.objectContaining({
      headers: expect.objectContaining({
        'Authorization': 'Bearer fake-token',
        'X-Forwarded-User': '1'
      })
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
  });

  it('returns backend error status if fetch is not ok', async () => {
    const { auth } = await import('@/auth');
    (auth as any).mockResolvedValueOnce({ user: { id: 1 } });

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const req = new NextRequest('http://localhost/api/proxy-download/123');
    const params = Promise.resolve({ fileId: '123' });
    
    const response = await GET(req, { params });

    expect(response.status).toBe(404);
    
    consoleErrorSpy.mockRestore();
  });
});
