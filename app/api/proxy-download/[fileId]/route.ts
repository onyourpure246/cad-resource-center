
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ fileId: string }> }
) {
    const params = await props.params;

    try {
        const session = await auth();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Use API_URL from env
        const apiUrl = process.env.API_URL;
        if (!apiUrl) {
            console.error('Missing API_URL');
            return new NextResponse('Server Configuration Error', { status: 500 });
        }

        const token = process.env.API_TOKEN || process.env.AUTH_SECRET;

        // Check live user status from backend DB in case status was updated after login
        try {
            const usersRes = await fetch(`${apiUrl}/users`, {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: 'no-store'
            });
            if (usersRes.ok) {
                const usersJson = await usersRes.json();
                const usersList: Array<{ id: string | number; status: string }> = usersJson.data || [];
                const liveUser = usersList.find((u) => String(u.id) === String(session.user.id));
                if (liveUser && liveUser.status === 'shadowbanned') {
                    console.log(`[Proxy Download] Intercepted download for live shadowbanned user ${session.user.id}`);
                    return new NextResponse('File Not Found', { status: 404 });
                }
            }
        } catch (e) {
            console.error('[Proxy Download] Error fetching live user status:', e);
        }

        // Stealth Block (Shadowban): Fallback check on session user status
        if (session.user?.status === 'shadowbanned') {
            console.log(`[Proxy Download] Intercepted download for shadowbanned user ${session.user.id}`);
            return new NextResponse('File Not Found', { status: 404 });
        }

        const backendUrl = `${apiUrl}/dl/file/${params.fileId}?dl=true`;



        const res = await fetch(backendUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Forwarded-User': String(session.user.id)
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`[Proxy] Backend error: ${res.status}`);
            return new NextResponse('Download Failed', { status: res.status });
        }

        // Create a new response with the body stream
        const response = new NextResponse(res.body, {
            status: 200,
            headers: new Headers(res.headers)
        });

        // Ensure Content-Disposition is passed through (it should be in res.headers already)
        // If backend doesn't set it, we might need to synthetically create it if we knew the filename, 
        // but the backend is supposed to send it.

        return response;

    } catch (error) {
        console.error('[Proxy] Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
