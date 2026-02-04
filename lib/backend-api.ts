
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
    }
};
