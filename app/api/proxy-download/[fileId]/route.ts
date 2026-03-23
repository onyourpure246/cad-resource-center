
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

        // Determine Token source (Service Token vs User Token)
        // Using API_TOKEN from env for simplicity as per user suggestion, or fallback to session token if available logic existed
        // The user suggestion used: `process.env.API_TOKEN || session.user.token`
        // However, our session doesn't seem to have a raw token stored based on auth.config.ts earlier. 
        // We will stick to API_TOKEN or AUTH_SECRET as primarily used for server-to-server.
        // Wait, the user prompt said: `Bearer ${process.env.API_TOKEN || session.user.token}`
        // Let's use AUTH_SECRET if API_TOKEN is missing, as that was used for verifyEmployee.
        const token = process.env.API_TOKEN || process.env.AUTH_SECRET;

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
