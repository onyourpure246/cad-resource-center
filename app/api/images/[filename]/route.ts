import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const filename = (await params).filename;

    if (!filename) {
        return new NextResponse('Filename is required', { status: 400 });
    }

    const API_URL = process.env.API_URL;
    const API_TOKEN = process.env.API_TOKEN;

    if (!API_URL || !API_TOKEN) {
        return new NextResponse('Server misconfiguration', { status: 500 });
    }

    try {
        // Fetch image from backend with Authorization header
        // Endpoint updated per backend dev: /dl/file/uuid/:sysname
        const backendRes = await fetch(`${API_URL}/dl/file/uuid/${filename}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            },
            cache: 'no-store' // Do not cache strictly if permissions change, or use default
        });

        if (!backendRes.ok) {
            return new NextResponse('Image not found or access denied', { status: backendRes.status });
        }

        const blob = await backendRes.blob();
        const headers = new Headers();
        headers.set('Content-Type', blob.type || 'application/octet-stream');
        headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

        return new NextResponse(blob, { headers });

    } catch (error) {
        console.error('Image proxy error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
