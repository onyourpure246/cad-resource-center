"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function SessionWatcher() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.expires) {
            // session.expires is an ISO string, e.g., "2024-10-12T09:30:00.000Z"
            const expiresDate = new Date(session.expires).getTime();
            const now = Date.now();
            const timeUntilExpiry = expiresDate - now;

            if (timeUntilExpiry > 0) {
                // Set a timeout to log out when the explicit expiration time is reached
                const timer = setTimeout(() => {
                    signOut({ redirectTo: "/login?expired=true" });
                }, timeUntilExpiry);

                return () => clearTimeout(timer);
            } else {
                // Already expired
                signOut({ redirectTo: "/login?expired=true" });
            }
        }
    }, [session, status]);

    return null;
}
