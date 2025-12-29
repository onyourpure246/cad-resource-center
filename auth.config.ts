import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateWithBackend } from "./lib/backend-api-mock"

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

                const user = await authenticateWithBackend(code);
                return user;
            }
        })
    ],
} satisfies NextAuthConfig
