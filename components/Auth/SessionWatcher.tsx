"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useCallback, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SessionWatcher() {
    const { data: session, status } = useSession();
    const isSigningOut = useRef(false);
    const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);

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

    return (
        <AlertDialog open={isExpiredModalOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>เซสชันหมดอายุ</AlertDialogTitle>
                    <AlertDialogDescription>
                        เซสชันของคุณหมดอายุแล้ว กรุณากดตกลงเพื่อกลับสู่หน้าหลัก
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => signOut({ redirectTo: "/" })}>
                        ตกลง
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
