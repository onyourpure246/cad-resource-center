import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isSuperAdminRole } from '@/lib/auth-helpers';

export async function GET() {
    try {
        const session = await auth();
        if (!session || !isSuperAdminRole(session)) {
            return new NextResponse('Unauthorized: Super Admin access required', { status: 401 });
        }

        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
            console.error('[Backup Export Proxy] Missing API_URL');
            return new NextResponse('Server Configuration Error', { status: 500 });
        }

        const token = session.accessToken || process.env.API_TOKEN || process.env.AUTH_SECRET;

        const backendRes = await fetch(`${apiUrl}/backup/export`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!backendRes.ok) {
            const errorText = await backendRes.text();
            console.error(`[Backup Export Proxy] Backend error ${backendRes.status}:`, errorText);
            return new NextResponse(`Export failed: ${errorText}`, { status: backendRes.status });
        }

        const headers = new Headers();
        headers.set('Content-Type', backendRes.headers.get('Content-Type') || 'application/zip');
        const contentDisposition = backendRes.headers.get('Content-Disposition');
        if (contentDisposition) {
            headers.set('Content-Disposition', contentDisposition);
        } else {
            headers.set('Content-Disposition', `attachment; filename="backup_${Date.now()}.zip"`);
        }

        return new NextResponse(backendRes.body, {
            status: 200,
            headers
        });
    } catch (error: unknown) {
        console.error('[Backup Export Proxy] Internal Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
