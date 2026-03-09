import { fetchApi } from "./fetch-api";

export const backendApi = {
    async getDashboardStats(token: string) {
        try {
            const apiUrl = process.env.API_URL;
            if (!apiUrl) return null;

            const res = await fetchApi(`${apiUrl}/dashboard/stats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!res.ok) return null;
            const json = await res.json();
            return json.success ? json.data : null;
        } catch (error) {
            console.error('getDashboardStats error:', error);
            return null;
        }
    },

    async getDashboardChartData(token: string) {
        try {
            const apiUrl = process.env.API_URL;
            if (!apiUrl) return null;

            const res = await fetchApi(`${apiUrl}/dashboard/chart-data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!res.ok) return null;
            const json = await res.json();
            return json.success ? json.data : null;
        } catch (error) {
            console.error('getDashboardChartData error:', error);
            return null;
        }
    },

    async getDashboardAuditLogs(token: string) {
        try {
            const apiUrl = process.env.API_URL;
            if (!apiUrl) return null;

            const res = await fetchApi(`${apiUrl}/dashboard/audit-logs`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!res.ok) return null;
            const json = await res.json();
            return json.success ? json.data : null;
        } catch (error) {
            console.error('getDashboardAuditLogs error:', error);
            return null;
        }
    }
};
