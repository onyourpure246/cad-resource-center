import { ShieldCheck } from "lucide-react";

export function LoginHeader() {
    return (
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
    );
}
