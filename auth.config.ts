import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { verifyEmployeeStatus } from "./lib/backend-api-mock"
import { getThaIDOwner } from "./lib/thaid-service"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/downloads');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Optional: Redirect to dashboard if already logged in and visiting login page
                // if (nextUrl.pathname === '/login') return Response.redirect(new URL('/admin/documents', nextUrl));
            }
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    providers: [
        Credentials({
            name: "ThaID-Backend",
            credentials: {
                code: { label: "Code", type: "text" }
            },
            async authorize(credentials) {
                const code = credentials.code as string;
                if (!code) return null;

                console.log("[Auth] Starting authentication flow...");

                // 1. Exchange Code -> PID (via ThaID Service)
                // This runs on Next.js Server Side
                const thaidUser = await getThaIDOwner(code);

                if (!thaidUser || !thaidUser.pid) {
                    console.error("[Auth] Failed to retrieve PID from ThaID.");
                    return null;
                }

                console.log(`[Auth] ThaID Verified. PID: ${thaidUser.pid}, Name: ${thaidUser.name}`);

                // 2. Verify PID -> Employee Info (via Internal Backend)
                // TODO: When Real API is ready, update verifyEmployeeStatus in /lib/backend-api-mock.ts to fetch from your actual endpoint.
                const employeeInfo = await verifyEmployeeStatus(thaidUser.pid);

                if (!employeeInfo) {
                    console.error(`[Auth] PID ${thaidUser.pid} is not a valid employee.`);
                    return null; // Reject login if not an employee
                }

                // 3. Return User Session
                return {
                    id: thaidUser.pid,
                    name: thaidUser.name,
                    email: employeeInfo.email,
                    role: employeeInfo.role,
                };
            }
        })
    ],
} satisfies NextAuthConfig
