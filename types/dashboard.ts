import { LucideIcon } from "lucide-react";

export interface DashboardStatsData {
    total_logins: number;
    active_users: number;
    total_users: number;
    total_files: number;
    system_crashes: number;
}

export interface DashboardStatsProps {
    stats: DashboardStatsData | null;
}

export interface DashboardItem {
    title: string;
    value: number | string;
    unit?: string;
    icon: LucideIcon;
    iconClassName: string;
    bgClassName: string;
    description: string;
    secondaryValue?: number | string;
    secondaryUnit?: string;
    secondaryDescription?: string;
}
