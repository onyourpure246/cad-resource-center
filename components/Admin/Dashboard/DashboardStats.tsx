import { Users, FileText, Activity, AlertTriangle, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
    stats: {
        total_logins: number;
        active_users: number;
        total_files: number;
        system_crashes: number;
    } | null;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const items = [
        {
            title: "เข้าใช้งานระบบ (ครั้ง)",
            value: stats?.total_logins ?? 0,
            icon: Users,
            iconClassName: "text-chart-1", // Using chart colors for variety or primary
            bgClassName: "bg-chart-1/10",
            description: "ยอดการยืนยันตัวตนทั้งหมด"
        },
        {
            title: "ผู้ใช้งาน (คน)",
            value: stats?.active_users ?? 0,
            icon: Activity,
            iconClassName: "text-chart-2",
            bgClassName: "bg-chart-2/10",
            description: "จำนวนผู้ใช้งานที่ไม่ซ้ำกัน"
        },
        {
            title: "เอกสารในระบบ",
            value: stats?.total_files ?? 0,
            icon: FileText,
            iconClassName: "text-chart-3",
            bgClassName: "bg-chart-3/10",
            description: "จำนวนไฟล์ที่เผยแพร่"
        },
        {
            title: "สถานะระบบ",
            value: stats?.system_crashes === 0 ? "ปกติ" : `${stats?.system_crashes} ครั้ง`,
            icon: stats?.system_crashes === 0 ? MonitorPlay : AlertTriangle,
            iconClassName: stats?.system_crashes === 0 ? "text-primary" : "text-destructive",
            bgClassName: stats?.system_crashes === 0 ? "bg-primary/10" : "bg-destructive/10",
            description: "แจ้งเตือนระบบล่มใน 24 ชม."
        }
    ];

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
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
