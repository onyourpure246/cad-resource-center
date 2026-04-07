"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SessionWatcher() {
    const { data: session, status } = useSession();
    const isSigningOut = useRef(false);
    const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);
    const router = useRouter();

    const checkSessionActivity = useCallback(() => {
        if (status === "authenticated" && session?.expires && !isSigningOut.current) {
            const expiresDate = new Date(session.expires).getTime();
            const now = Date.now();

            if (now > expiresDate) {
                isSigningOut.current = true;
                setIsExpiredModalOpen(true);
            }
        }
    }, [session, status]);

    useEffect(() => {
        if (status !== "authenticated") return;

        // Events that indicate user interaction
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'mousemove'];
        let timeoutId: NodeJS.Timeout | undefined;

        const throttledHandleActivity = () => {
            // Throttle to check at most once per second for continuous events like scroll/mousemove
            if (!timeoutId) {
                checkSessionActivity();
                timeoutId = setTimeout(() => {
                    timeoutId = undefined;
                }, 1000);
            }
        };

        events.forEach(event => {
            window.addEventListener(event, throttledHandleActivity, { passive: true });
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, throttledHandleActivity);
            });
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [status, checkSessionActivity]);

    const handleConfirm = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsExpiredModalOpen(false); // Close modal smoothly first

        // Wait for Radix UI dialog close animation (usually ~150-200ms) before doing a soft routing
        setTimeout(async () => {
            await signOut({ redirect: false });
            router.push("/login?expired=true");
            router.refresh();
        }, 300);
    };

    return (
        <AlertDialog open={isExpiredModalOpen} onOpenChange={setIsExpiredModalOpen}>
            <AlertDialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-[0px_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0px_10px_40px_rgba(0,0,0,0.5)]">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
                    
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10 pt-2">
                        {/* Animated Icon Badge */}
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 ring-[12px] ring-red-50 dark:ring-red-950/20">
                            <svg className="h-12 w-12 text-red-600 dark:text-red-400 shrink-0 animate-[pulse_2s_ease-in-out_infinite]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div className="absolute -right-1 -bottom-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 ring-4 ring-white dark:ring-zinc-900">
                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <path d="M12 9v4" />
                                    <path d="M12 17h.01" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <AlertDialogTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                เซสชันของคุณหมดอายุ
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-[300px] mx-auto">
                                เพื่อความปลอดภัยของข้อมูล ระบบได้ทำการออกจากระบบอัตโนมัติ กรุณาเข้าสู่ระบบใหม่อีกครั้ง
                            </AlertDialogDescription>
                        </div>

                        <div className="w-full pt-4 pb-2">
                            <AlertDialogAction 
                                onClick={handleConfirm} 
                                className="w-full h-12 text-[15px] font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 dark:shadow-red-900/20"
                            >
                                รับทราบ และ กลับสู่หน้าล็อกอิน
                            </AlertDialogAction>
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
