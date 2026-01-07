import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LoginFooter() {
    return (
        <div className="pt-6 text-center">
            <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                กลับสู่หน้าหลัก
            </Link>
        </div>
    );
}
