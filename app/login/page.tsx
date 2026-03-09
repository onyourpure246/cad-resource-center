import { Suspense } from "react";
import { LoginBackground } from "./_components/LoginBackground";
import { LoginHeader } from "./_components/LoginHeader";
import { ThaIDLoginButton } from "./_components/ThaIDLoginButton";
import { LoginFooter } from "./_components/LoginFooter";
import { SessionExpiredToast } from "./_components/SessionExpiredToast";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
            <LoginBackground />

            <div className="z-10 w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl backdrop-blur-sm p-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <LoginHeader />
                <ThaIDLoginButton />
                <LoginFooter />
            </div>

            <Suspense fallback={null}>
                <SessionExpiredToast />
            </Suspense>
        </div>
    );
}
