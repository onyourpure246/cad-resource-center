"use client"

import { FileIcon, TrendingUp, Download } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import MuiIconRenderer from '@/components/ui/MuiIconRenderer';
import { getFileIconAndColor } from '@/lib/file-icon-utils';

interface ActivityChartProps {
    data: {
        login_trends: Array<{ date: string, count: number }>;
        top_downloads: Array<{ file_id: number, name: string, filename: string, download_count: number, mui_icon?: string | null, mui_colour?: string | null }>;
    } | null;
}

const chartConfig = {
    count: {
        label: "จำนวนครั้ง",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export default function ActivityChart({ data }: ActivityChartProps) {
    // Format date for display in chart
    const chartData = data?.login_trends.map(item => ({
        ...item,
        dateStr: new Date(item.date).toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })
    })) || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Login Trends Chart */}
            <Card className="lg:col-span-2 flex flex-col shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-6 space-y-0">
                    <div className="grid gap-0.5">
                        <CardTitle className="leading-normal">แนวโน้มการใช้งาน</CardTitle>
                        <CardDescription className="leading-normal">สถิติการเข้าสู่ระบบย้อนหลัง 14 วัน</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="py-2 px-6">
                    {!chartData.length ? (
                        <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                            ไม่มีข้อมูล
                        </div>
                    ) : (
                        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                            <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="dateStr"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line
                                    dataKey="count"
                                    type="monotone"
                                    stroke="var(--color-count)"
                                    strokeWidth={2}
                                    dot={{ fill: "var(--color-count)" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            {/* Top Downloads */}
            <Card className="flex flex-col shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-6 space-y-0">
                    <div className="grid gap-0.5">
                        <CardTitle className="leading-normal">ดาวน์โหลดสูงสุด</CardTitle>
                        <CardDescription className="leading-normal">ความนิยม 5 อันดับแรก</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Download className="w-5 h-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="py-2 px-6">
                    <div className="flex flex-col gap-4">
                        {!data?.top_downloads?.length ? (
                            <p className="text-sm text-muted-foreground italic py-8 text-center bg-muted/20 rounded-lg">
                                ยังไม่มีประวัติการดาวน์โหลด
                            </p>
                        ) : (
                            data.top_downloads.map((file, i) => {
                                let iconName = file.mui_icon;
                                let iconColor = file.mui_colour;

                                if (!iconName) {
                                    const fileName = (file.filename || '').toLowerCase();
                                    const iconConfig = getFileIconAndColor(fileName);
                                    iconName = iconConfig.mui_icon as string;
                                    iconColor = iconConfig.mui_colour as string;
                                }

                                return (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                            {iconName ? (
                                                <MuiIconRenderer iconName={iconName} iconColor={iconColor || undefined} className="w-5 h-5 flex-shrink-0" />
                                            ) : (
                                                <FileIcon className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate" title={file.name}>
                                                {file.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground truncate" title={file.filename}>
                                                {file.filename}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${Math.min((file.download_count / (data.top_downloads[0]?.download_count || 1)) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap min-w-[3ch] text-right">
                                                    {file.download_count}
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
        </div>
    );
}
