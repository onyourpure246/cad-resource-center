
import fs from 'fs';
import path from 'path';

// Manual .env parser to avoid external dependencies
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            const lines = content.split('\n');
            const env: Record<string, string> = {};

            for (const line of lines) {
                const trimmed = line.trim();
                // Skip comments and empty lines
                if (!trimmed || trimmed.startsWith('#')) continue;

                // Match KEY="VALUE" or KEY=VALUE
                const match = trimmed.match(/^([^=]+)=(.*)$/);
                if (match) {
                    let key = match[1].trim();
                    let value = match[2].trim();

                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }

                    env[key] = value;
                }
            }
            return env;
        }
    } catch (e) {
        console.error('Failed to load .env.local', e);
    }
    return {};
}

async function testBackend() {
    const env = loadEnv();
    const API_URL = env['API_URL'] || process.env.API_URL;
    const AUTH_SECRET = env['AUTH_SECRET'] || process.env.AUTH_SECRET;

    console.log('--- Debugging Backend Connection ---');
    console.log(`Target URL: ${API_URL}/employee/verify`);
    console.log(`Auth Secret: ${AUTH_SECRET ? 'Found' : 'Missing'}`);

    if (!API_URL) {
        console.error('❌ Error: API_URL is missing in .env.local');
        return;
    }

    try {
        console.log('Sending generic test request...');
        const res = await fetch(`${API_URL}/employee/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_SECRET}`
            },
            body: JSON.stringify({ pid: '1234567890123' }) // Sample ThaID Sandbox PID
        });

        console.log(`Status Code: ${res.status} ${res.statusText}`);

        if (res.ok) {
            const data = await res.json();
            console.log('✅ Connection Successful!');
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.error('⚠️ Backend returned an error response.');
            const text = await res.text();
            console.error('Response Body:', text);
            console.error('Hint: If 404, the endpoint might not exist. If 500, check Backend logs.');
        }

    } catch (error: any) {
        console.error('❌ Network Error (Backend might be down or unreachable):');
        if (error.cause) console.error('Cause:', error.cause);
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        console.log('Hint: Ensure the backend is running at ' + API_URL);
    }
}

testBackend();
