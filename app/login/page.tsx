import { LoginBackground } from "../../components/LoginPage/LoginBackground";
import { LoginHeader } from "../../components/LoginPage/LoginHeader";
import { ThaIDLoginButton } from "../../components/LoginPage/ThaIDLoginButton";
import { LoginFooter } from "../../components/LoginPage/LoginFooter";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background">
            <LoginBackground />

            <div className="z-10 w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl backdrop-blur-sm p-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <LoginHeader />
                <ThaIDLoginButton />
                <LoginFooter />
            </div>
        </div>
    );
}
