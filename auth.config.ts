import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authApi } from "@/services/auth-api"
import { getThaIDOwner } from "@/services/thaid-service"

export const authConfig = {
    trustHost: true,
    basePath: '/api/auth',   // 👈 Next.js App Router จะตัด /casdu_cdm ออกให้อยู่แล้วครับ ห้ามใส่ซ้อน
    pages: {
        signIn: '/login',
    },
    session: {
        maxAge: 86400, // 24 Hours
        strategy: 'jwt'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            return true; // Let middleware.ts strictly handle route interception and redirects.
        },
        async session({ session, token }) {
            // If the token is already expired according to the server clock, mark it
            if (token.accessTokenExpires && Date.now() > (token.accessTokenExpires as number)) {
                (session as any).error = "AccessTokenExpired";
            }

            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role as string;
                session.accessToken = token.accessToken as string; // Persist token to session

                // Overwrite NextAuth session expiration with our Backend Token's expiration
                if (token.accessTokenExpires) {
                    session.expires = new Date(token.accessTokenExpires as number).toISOString() as Date & string;
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken; // Persist token to JWT

                // ถอดรหัส JWT จากหลังบ้าน เพื่อดึงเวลาหมดอายุออกมาตรวจสอบ
                try {
                    if (user.accessToken) {
                        const payloadBase64 = user.accessToken.split('.')[1];
                        const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
                        const decoded = JSON.parse(decodedJson);
                        if (decoded.exp) {
                            token.accessTokenExpires = decoded.exp * 1000;
                        }
                    }
                } catch (e) {
                    console.error("[Auth] Error decoding JWT timestamp", e);
                }
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
                    const result = await authApi.verifyEmployee(thaidUser.pid);

                    if (!result || !result.user) {
                        console.error(`[Auth] PID ${thaidUser.pid} is not a valid employee.`);
                        throw new Error("Access Denied: You are not an employee.");
                    }

                    const { user: systemUser, token } = result;

                    // 4. เช็คสถานะ User (Active เท่านั้นถึงจะเข้าได้)
                    if (systemUser.status && systemUser.status !== 'active') {
                        console.error(`[Auth] User ${systemUser.username} is ${systemUser.status}. Access Denied.`);
                        throw new Error("Access Denied: Your account is inactive.");
                    }

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
