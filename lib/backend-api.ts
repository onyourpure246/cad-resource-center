
export const backendApi = {
    async verifyEmployee(pid: string) {
        try {
            const apiUrl = process.env.API_URL;
            const authSecret = process.env.AUTH_SECRET;

            if (!apiUrl || !authSecret) {
                console.error('Missing API_URL or AUTH_SECRET');
                return null;
            }

            const res = await fetch(`${apiUrl}/employee/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authSecret}`, // Server-to-Server Auth
                },
                body: JSON.stringify({ pid }),
                cache: 'no-store' // สำคัญมาก! ห้าม cache verify request
            });

            if (!res.ok) {
                console.error(`Backend verify failed: ${res.status} ${res.statusText}`);
                return null;
            }

            const json = await res.json();
            return json.success ? json.data : null;
        } catch (error) {
            console.error('Backend verify error:', error);
            return null;
        }
    },

    async getDashboardStats(token: string) {
        try {
            const apiUrl = process.env.API_URL;
            if (!apiUrl) return null;

            const res = await fetch(`${apiUrl}/dashboard/stats`, {
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

            const res = await fetch(`${apiUrl}/dashboard/chart-data`, {
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

            const res = await fetch(`${apiUrl}/dashboard/audit-logs`, {
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
