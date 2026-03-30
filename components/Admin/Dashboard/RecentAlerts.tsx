import { ShieldAlert, Trash2, AlertOctagon, UserX, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface RecentAlertsProps {
    logs: Array<{
        id: number;
        action: string;
        details: Record<string, unknown> | string;
        user_id: number | null;
        created_at: string;
    }> | null;
}

export default function RecentAlerts({ logs }: RecentAlertsProps) {
    const getIcon = (action: string) => {
        if (action.includes('DELETE_USER')) return UserX;
        if (action.includes('DELETE_FILE') || action.includes('DELETE_FOLDER')) return Trash2;
        if (action.includes('SYSTEM_CRASH')) return AlertOctagon;
        return FileWarning;
    };

    const getColors = (action: string) => {
        if (action === 'SYSTEM_CRASH') return "text-destructive bg-destructive/10";
        if (action.includes('DELETE')) return "text-orange-600 bg-orange-100 dark:bg-orange-900/20"; // Keep orange for warnings
        return "text-chart-1 bg-chart-1/10";
    };

    const getActionLabel = (action: string) => {
        switch (action) {
            case 'DELETE_USER': return 'ลบผู้ใช้งาน';
            case 'DELETE_FILE': return 'ลบไฟล์เอกสาร';
            case 'DELETE_FOLDER': return 'ลบโฟลเดอร์';
            case 'DELETE_NEWS': return 'ลบข่าวประชาสัมพันธ์';
            case 'SYSTEM_CRASH': return 'ระบบขัดข้อง';
            default: return action;
        }
    };

    return (
        <Card className="overflow-hidden shadow-sm">
            <CardHeader className="border-b bg-muted/40 flex flex-row items-center justify-between py-2 px-6 space-y-0 [.border-b]:pb-2">
                <div className="grid gap-0.5">
                    <CardTitle className="leading-normal">แจ้งเตือนความปลอดภัย</CardTitle>
                    <CardDescription className="leading-normal">การกระทำที่สำคัญและสถานะความปลอดภัยล่าสุด</CardDescription>
                </div>
                <div className="p-2 bg-destructive/10 rounded-full">
                    <ShieldAlert className="w-5 h-5 text-destructive" />
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {!logs?.length ? (
                        <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-emerald-500" />
                            </div>
                            <p>สถานะปกติ ไม่พบการแจ้งเตือน</p>
                        </div>
                    ) : (
                        logs.map((log) => {
                            const Icon = getIcon(log.action);
                            const colors = getColors(log.action);

                            // Parse details if string
                            let detailsObj: { filename?: string; sysname?: string } | null = null;
                            if (typeof log.details === 'string') {
                                try { detailsObj = JSON.parse(log.details) as { filename?: string; sysname?: string }; } catch { }
                            } else if (typeof log.details === 'object' && log.details !== null) {
                                detailsObj = log.details as { filename?: string; sysname?: string };
                            }

                            return (
                                <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors group">
                                    <div className={cn("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1", colors)}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                                {getActionLabel(log.action)}
                                            </h4>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {new Date(log.created_at).toLocaleString('th-TH')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 break-words">
                                            {/* Display logic for details */}
                                            {detailsObj?.filename ? `File: ${detailsObj.filename}` :
                                                detailsObj?.sysname ? `ID: ${detailsObj.sysname}` :
                                                    JSON.stringify(detailsObj || log.details)}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border border-transparent group-hover:border-border transition-colors">
                                                User ID: {log.user_id || 'System'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
