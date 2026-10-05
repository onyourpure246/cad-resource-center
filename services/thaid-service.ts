interface ThaIDTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

interface ThaIDUserInfo {
    sub: string;
    pid: string;
    name: string;
}

// Sandbox Credentials & Config Defaults
// NOTE: Configuration is now handled via .env.local

export async function getThaIDOwner(code: string): Promise<{ pid: string; name: string } | null> {
    const THAID_TOKEN_URL = process.env.THAID_TOKEN_URL;
    const THAID_USERINFO_URL = process.env.THAID_USERINFO_URL;
    const BASIC_TOKEN = process.env.THAID_BASIC_TOKEN;
    const API_KEY = process.env.THAID_API_KEY;

    // Use dynamic URL for production, fallback to localhost for dev
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://auditdocs.cad.go.th/casdu_cdm";
    const REDIRECT_URI = `${APP_URL}/auth/callback`;

    if (!THAID_TOKEN_URL || !THAID_USERINFO_URL || !BASIC_TOKEN) {
        console.error("[ThaID Service] Missing Environment Variables (TOKEN_URL, USERINFO_URL, or BASIC_TOKEN)");
        return null;
    }

    console.log("[ThaID Service] Exchanging code:", code.substring(0, 5) + "...");

    // --- 1. MOCK MODE (For Local Development Bypass Only) ---
    // IMPORTANT: This block is strictly for development.
    if (process.env.NODE_ENV === 'development' && (code === 'TEST_ADMIN' || code.startsWith('MOCK_'))) {
        console.log("[ThaID Service] ⚠️ Using MOCK mode (TEST code)");
        await new Promise(r => setTimeout(r, 800)); // Simulate delay
        return {
            pid: "1234567890123",
            name: "นายทดสอบ ม็อคโหมด (Dev)"
        };
    }

    // --- 2. REAL MODE (Sandbox/Production) ---
    try {
        // Step A: Exchange Code for Token
        const authHeader = `Basic ${BASIC_TOKEN}`;

        const headers: HeadersInit = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader,
        };

        if (API_KEY) {
            headers["x-imauth-apikey"] = API_KEY;
        }

        const tokenResponse = await fetch(THAID_TOKEN_URL, {
            method: "POST",
            headers: headers,
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error("[ThaID Service] Token exchange failed:", errorText);
            // Fallback for clearer error debugging
            console.error("[ThaID Service] URL was:", THAID_TOKEN_URL);
            return null;
        }

        const tokenData: ThaIDTokenResponse = await tokenResponse.json();
        console.log("[ThaID Service] Token received. Fetching UserInfo...");

        // Step B: Get User Info using Token
        const userResponse = await fetch(THAID_USERINFO_URL, {
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`
            }
        });

        if (!userResponse.ok) {
            console.error("[ThaID Service] User info failed:", await userResponse.text());
            return null;
        }

        const userData: ThaIDUserInfo = await userResponse.json();

        // --- DEBUG LOG START ---
        console.log("\n🟡 [ThaID Debug] Raw User Data Received from Sandbox:");
        console.log(JSON.stringify(userData, null, 2));
        console.log("--------------------------------------------------\n");
        // --- DEBUG LOG END ---

        console.log("[ThaID Service] UserInfo success. PID:", userData.pid || userData.sub);

        return {
            pid: userData.pid || userData.sub,
            name: userData.name
        };

    } catch (error) {
        console.error("[ThaID Service] Unexpected error:", error);
        return null;
    }
}
