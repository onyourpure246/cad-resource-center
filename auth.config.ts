import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { backendApi } from "@/lib/backend-api"
import { getThaIDOwner } from "@/lib/thaid-service"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        maxAge: 86400, // 24 Hours
        strategy: 'jwt'
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
                session.accessToken = token.accessToken as string; // Persist token to session
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken; // Persist token to JWT
            }
            return token;
        }
    },
    providers: [
        Credentials({
            name: "ThaID",
            credentials: { code: { label: "Code", type: "text" } },
            async authorize(credentials) {
                const code = credentials.code as string;
                if (!code) return null;

                console.log("[Auth] Starting authentication flow...");

                try {
                    // 1. แลก Code เป็น PID จาก ThaID
                    const thaidUser = await getThaIDOwner(code);

                    if (!thaidUser || !thaidUser.pid) {
                        throw new Error("ThaID verification failed");
                    }

                    console.log(`[Auth] ThaID Verified. PID: ${thaidUser.pid}`);

                    // 2. เช็คกับ Backend เรา
                    const result = await backendApi.verifyEmployee(thaidUser.pid);

                    if (!result || !result.user) {
                        console.error(`[Auth] PID ${thaidUser.pid} is not a valid employee.`);
                        throw new Error("Access Denied: You are not an employee.");
                    }

                    const { user: systemUser, token } = result;

                    // 3. สร้าง Session
                    return {
                        id: systemUser.id.toString(), // ใช้ ID ของเรา ไม่ใช่ PID
                        name: systemUser.displayname, // ชื่อจาก DB เรา
                        email: systemUser.username,   // หรือ PID
                        image: null,
                        role: systemUser.isadmin === 1 ? 'admin' : 'user', // ส่ง Role เข้า Session
                        accessToken: token // Access Token from backend
                    };
                } catch (error) {
                    console.error("[Auth] Authorize error:", error);
                    return null;
                }
            }
        })
    ],
} satisfies NextAuthConfig
