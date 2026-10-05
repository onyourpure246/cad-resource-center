'use server';

import { auth } from '@/auth';
import { isSuperAdminRole } from '@/lib/auth-helpers';
import { apiGetBackupStats, apiRestoreBackup, BackupStats } from '@/services/backup-service';

export async function getBackupStatsAction(): Promise<{ success: boolean; data?: BackupStats; message?: string }> {
    try {
        const session = await auth();
        if (!isSuperAdminRole(session)) {
            return { success: false, message: 'Access Denied: Super Admin privilege required' };
        }

        const stats = await apiGetBackupStats(session?.accessToken);
        return { success: true, data: stats };
    } catch (error: any) {
        console.error('getBackupStatsAction error:', error);
        return { success: false, message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' };
    }
}

export async function restoreBackupAction(formData: FormData): Promise<{ success: boolean; message: string }> {
    try {
        const session = await auth();
        if (!isSuperAdminRole(session)) {
            return { success: false, message: 'Access Denied: Super Admin privilege required' };
        }

        await apiRestoreBackup(formData, session?.accessToken);
        return { success: true, message: 'คืนค่าข้อมูลระบบจากไฟล์ Zip สำเร็จแล้ว' };
    } catch (error: any) {
        console.error('restoreBackupAction error:', error);
        return { success: false, message: error.message || 'เกิดข้อผิดพลาดในการคืนค่าระบบ' };
    }
}
