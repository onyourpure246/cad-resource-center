import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ThaIDLoginButton() {
    const THAID_AUTH_URL =
        process.env.NEXT_PUBLIC_THAID_AUTH_URL ||
        "https://imauthsbx.bora.dopa.go.th/api/v2/oauth2/auth/"; // Sandbox + Trailing Slash
    const CLIENT_ID =
        process.env.NEXT_PUBLIC_THAID_CLIENT_ID || "bDNWUDBJYVNJVE4xNDhPRUhsTDdZSXNRM0RLZzl6WE4"; // Sandbox Client ID
    // Fixed: Changed from REDIRECT_URL to REDIRECT_URI and updated the query param
    const REDIRECT_URI = "http://localhost:3000/auth/callback";

    // Sandbox Supported Scopes: openid pid name given_name family_name
    // Removing 'offline_access' as it causes invalid_scope in Sandbox
    const thaidUrl = `${THAID_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid pid name&state=random_state_string`;

    return (
        <div className="space-y-4">
            <Button
                asChild
                className="w-full h-12 text-lg font-medium shadow-md transition-all hover:scale-[1.02]"
                variant="default"
            >
                <Link href={thaidUrl}>
                    <div className="flex items-center gap-3">
                        <span className="font-bold">ThaID</span>
                        <span className="opacity-90 font-normal">
                            | ลงชื่อเข้าใช้ด้วย ThaID
                        </span>
                    </div>
                </Link>
            </Button>

            {/* Development Only Bypass Button */}
            {process.env.NODE_ENV === "development" && (
                <Button
                    asChild
                    variant="destructive"
                    className="w-full h-10 opacity-70 hover:opacity-100 mt-2"
                >
                    <Link href="/auth/callback?code=TEST_ADMIN">
                        [DEV] Bypass Login (Simulate Admin)
                    </Link>
                </Button>
            )}

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Secure Authentication
                    </span>
                </div>
            </div>

            <p className="text-xs text-center text-muted-foreground/80">
                ระบบรองรับการยืนยันตัวตนผ่าน ThaID
                <br />
                กรมการปกครอง
            </p>
        </div>
    );
}
