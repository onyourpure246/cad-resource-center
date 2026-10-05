import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename;

  if (!filename) {
    return new NextResponse('Filename is required', { status: 400 });
  }

  // Security check: prevent directory traversal
  // Ensure the filename only contains alphanumeric characters, hyphens, underscores, and a single dot
  const safeFilenameRegex = /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+$/;
  if (!safeFilenameRegex.test(filename)) {
    return new NextResponse('Invalid filename', { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), 'public', 'uploads', filename);
    const fileBuffer = await readFile(filePath);

    // Determine content type based on extension
    const ext = filename.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
    else if (ext === 'png') contentType = 'image/png';
    else if (ext === 'gif') contentType = 'image/gif';
    else if (ext === 'webp') contentType = 'image/webp';
    else if (ext === 'svg') contentType = 'image/svg+xml';

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // Cache aggressively

    return new NextResponse(fileBuffer, { headers });
  } catch (error) {
    console.error('Error serving local upload:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
