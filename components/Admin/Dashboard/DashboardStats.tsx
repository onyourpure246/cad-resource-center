import { Users, FileText, Activity, AlertTriangle, MonitorPlay, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DashboardStatsProps, DashboardStatsData, DashboardItem } from "@/types/dashboard";

const getDashboardItems = (stats: DashboardStatsData | null): DashboardItem[] => [
    {
        title: "เข้าใช้งานระบบ",
        value: (stats?.total_logins ?? 0).toLocaleString(),
        unit: "ครั้ง",
        icon: Users,
        iconClassName: "text-chart-1", // Using chart colors for variety or primary
        bgClassName: "bg-chart-1/10",
        description: "ยอดการยืนยันตัวตนทั้งหมด"
    },
    {
        title: "ผู้ใช้งาน",
        value: (stats?.active_users ?? 0).toLocaleString(),
        unit: "คน",
        secondaryValue: (stats?.total_users ?? 0).toLocaleString(),
        secondaryUnit: "คน",
        icon: Activity,
        iconClassName: "text-chart-2",
        bgClassName: "bg-chart-2/10",
        description: "จำนวนผู้ใช้งานจริง",
        secondaryDescription: "ผู้ใช้งานทั้งหมด"
    },
    {
        title: "เอกสารในระบบ",
        value: (stats?.total_files ?? 0).toLocaleString(),
        unit: "ไฟล์",
        icon: FileText,
        iconClassName: "text-chart-3",
        bgClassName: "bg-chart-3/10",
        description: "จำนวนไฟล์ที่เผยแพร่"
    },
    {
        title: "สถานะระบบ",
        value: stats?.system_crashes === 0 ? "ปกติ" : `${stats?.system_crashes}`,
        unit: stats?.system_crashes === 0 ? undefined : "ครั้ง",
        icon: stats?.system_crashes === 0 ? MonitorPlay : AlertTriangle,
        iconClassName: stats?.system_crashes === 0 ? "text-primary" : "text-destructive",
        bgClassName: stats?.system_crashes === 0 ? "bg-primary/10" : "bg-destructive/10",
        description: "แจ้งเตือนระบบล่มใน 24 ชม."
    }
];

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const items = getDashboardItems(stats);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {items.map((item, index) => (
                <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pt-2 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground leading-normal">
                            {item.title}
                        </CardTitle>
                        <div className={cn("p-2 rounded-full", item.bgClassName)}>
                            <item.icon className={cn("w-4 h-4", item.iconClassName)} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {item.secondaryValue !== undefined ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="min-w-[45%]">
                                    <div className="flex items-end gap-2">
                                        <div className="text-2xl font-bold">{item.value}</div>
                                        {item.unit && <div className="text-sm text-primary font-medium mb-1">{item.unit}</div>}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="h-8 w-px bg-border mx-2"></div>
                                <div className="min-w-[45%]">
                                    <div className="flex items-end gap-2 justify-end">
                                        <div className="text-2xl font-bold">{item.secondaryValue}</div>
                                        {item.secondaryUnit && <div className="text-sm text-primary font-medium mb-1">{item.secondaryUnit}</div>}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">
                                        {item.secondaryDescription}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-end gap-2">
                                    <div className="text-2xl font-bold">{item.value}</div>
                                    {item.unit && <div className="text-sm text-primary font-medium mb-1">{item.unit}</div>}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {item.description}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
