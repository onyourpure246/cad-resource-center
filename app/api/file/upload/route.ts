import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { apiUploadFile, apiUpdateFile } from '@/services/document-service';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const token = session?.accessToken || process.env.API_TOKEN;
        
        const formData = await req.formData();
        
        // Extract metadata items meant for patching, similar to file-actions.ts behavior
        const mui_icon = formData.get('mui_icon') as string;
        const mui_colour = formData.get('mui_colour') as string;
        
        // Ensure audit fields are added safely
        if (session?.user?.id) {
            formData.append('created_by', session.user.id);
            formData.append('updated_by', session.user.id);
        }
        
        // Proceed with file upload via document-service
        const newFileId = await apiUploadFile(formData, token);
        
        if (newFileId) {
            // Force update audit fields and icon/color
            try {
                const updatePayload: Record<string, string | number> = {};
                if (mui_icon) updatePayload.mui_icon = mui_icon;
                if (mui_colour) updatePayload.mui_colour = mui_colour;

                if (session?.user?.id) {
                    updatePayload.created_by = session.user.id;
                    updatePayload.updated_by = session.user.id;
                }

                if (Object.keys(updatePayload).length > 0) {
                    await apiUpdateFile(newFileId, updatePayload, token);
                }
            } catch (updateError) {
                console.error('Failed to update file metadata after upload:', updateError);
            }
        }
        
        revalidatePath('/admin/documents', 'layout');
        return NextResponse.json({ success: true, message: 'อัปโหลดไฟล์สำเร็จ' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัปโหลด';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
