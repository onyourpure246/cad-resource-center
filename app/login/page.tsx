
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldCheck, ArrowLeft } from "lucide-react"

export default function LoginPage() {
    const THAID_AUTH_URL = process.env.NEXT_PUBLIC_THAID_AUTH_URL || "https://imauth.bora.dopa.go.th/api/v2/oauth2/auth";
    const CLIENT_ID = process.env.NEXT_PUBLIC_THAID_CLIENT_ID || "YOUR_THAID_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/auth/callback";

    const thaidUrl = `${THAID_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid offline_access pid name&state=random_state_string`;

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl backdrop-blur-sm p-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-4 bg-primary/10 rounded-full mb-2">
                        <ShieldCheck className="w-12 h-12 text-primary" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        เข้าสู่ระบบ
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        CAD Resource Center
                        <br />
                        ศูนย์รวมข้อมูลและทรัพยากร
                    </p>
                </div>

                <div className="space-y-4">
                    <Button
                        asChild
                        className="w-full h-12 text-lg font-medium shadow-md transition-all hover:scale-[1.02]"
                        variant="default"
                    >
                        <Link href={thaidUrl}>
                            <div className="flex items-center gap-3">
                                <span className="font-bold">ThaID</span>
                                <span className="opacity-90 font-normal">| ลงชื่อเข้าใช้ด้วย ThaID</span>
                            </div>
                        </Link>
                    </Button>

                    {/* Development Only Bypass Button */}
                    {process.env.NODE_ENV === 'development' && (
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

                <div className="pt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        กลับสู่หน้าหลัก
                    </Link>
                </div>
            </div>
        </div>
    )
}
