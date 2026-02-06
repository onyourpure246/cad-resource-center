import { auth } from "@/auth";
import { backendApi } from "@/lib/backend-api";
import DashboardStats from "@/components/Admin/Dashboard/DashboardStats";
import ActivityChart from "@/components/Admin/Dashboard/ActivityChart";
import RecentAlerts from "@/components/Admin/Dashboard/RecentAlerts";
import Header from "@/components/Layout/Header/Header";

export default async function DashboardPage() {
  // 1. Get Session for Token
  const session = await auth();
  const token = session?.accessToken || process.env.API_TOKEN || "";

  // 2. Parallel Data Fetching
  const [stats, chartData, riskLogs] = await Promise.all([
    backendApi.getDashboardStats(token),
    backendApi.getDashboardChartData(token),
    backendApi.getDashboardAuditLogs(token)
  ]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Header matches Admin Theme */}
      <Header
        title="ภาพรวมระบบ"
        description="สรุปสถิติการใช้งาน, กิจกรรมของผู้ใช้ และการแจ้งเตือนความปลอดภัย"
      />

      {/* Content Container - Matching DataManagementLayout padding style if needed, 
                but AdminLayout already provides p-6. We just need to manage internal spacing. */}
      <div className="px-1 space-y-6">
        {/* 1. Stats Cards */}
        <DashboardStats stats={stats} />

        {/* 2. Charts & Trends */}
        <ActivityChart data={chartData} />

        {/* 3. Audit Logs / Risks */}
        <RecentAlerts logs={riskLogs} />
      </div>
    </div>
  );
}