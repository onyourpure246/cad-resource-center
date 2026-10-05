import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Secure Web Skills Validation:
    // 1. File Type Validation
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 });
    }

    // 2. File Size Validation (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Secure file name generation (uuid)
    const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg';
    const uniqueFilename = `${crypto.randomUUID()}.${extension}`;
    
    // Directory path
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }

    const path = join(uploadDir, uniqueFilename);
    await writeFile(path, buffer);
    console.log(`Uploaded file saved at: ${path}`);

    // Return the URL for the frontend (using dynamic route to bypass static caching)
    const url = `/api/uploads/${uniqueFilename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error during upload:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload' }, { status: 500 });
  }
}
