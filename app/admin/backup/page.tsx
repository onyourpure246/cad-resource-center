import React from 'react';
import ServerSuperAdminOnly from '@/components/Auth/ServerSuperAdminOnly';
import BackupRestoreView from '@/components/Admin/Backup/BackupRestoreView';
import { getBackupStatsAction } from '@/actions/backup-actions';

export const dynamic = 'force-dynamic';

export default async function AdminBackupPage() {
    const statsRes = await getBackupStatsAction();
    const stats = statsRes.success && statsRes.data ? statsRes.data : null;

    return (
        <ServerSuperAdminOnly>
            <div className="container mx-auto p-6 max-w-[1400px]">
                <BackupRestoreView initialStats={stats} />
            </div>
        </ServerSuperAdminOnly>
    );
}
