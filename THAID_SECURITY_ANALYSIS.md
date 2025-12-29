# Security Analysis: ThaID Integration (Production)

เอกสารนี้วิเคราะห์ความปลอดภัยของระบบ **Resource Center** เมื่อใช้งานจริง (Production) โดยเชื่อมต่อกับ **ThaID** ผ่านสถาปัตยกรรมที่ได้วางไว้

## 1. ระดับความมั่นคงปลอดภัย (Security Assurance)

### ✅ High Assurance (ความปลอดภัยระดับสูง)
ระบบของเรามีความปลอดภัยในระดับ "สูง" (High) เนื่องจากปัจจัยต่อไปนี้:

1.  **Identity LoA (Level of Assurance) จาก ThaID:**
    *   **IAL (Identity Assurance Level) - สูงมาก:** การยืนยันตัวตนทำผ่านแอป ThaID ของกรมการปกครอง ซึ่งมีการตรวจสอบตัวบุคคลจริง (e-KYC/Face Verify) หรือยืนยันผ่านเจ้าหน้าที่ เชื่อถือได้ว่า "เป็นคนๆ นั้นจริง" ยากต่อการปลอมตัว
    *   **AAL (Authenticator Assurance Level) - สูงมาก:** ThaID บังคับใช้ PIN หรือ Biometric (Face/Fingerprint) ในการเข้าสู่ระบบ เทียบเท่ากับ 2FA (Two-Factor Authentication) โดยอัตโนมัติ

2.  **มาตรฐาน OIDC (OpenID Connect):**
    *   เราใช้มาตรฐานสากล (OAuth 2.0 / OIDC) ในการแลกเปลี่ยนข้อมูล
    *   ไม่มีการส่ง Password ของผู้ใช้มาที่ระบบของเราเลย (Credential ไม่รั่วไหลแน่นอน)
    *   มีการตรวจสอบ `state` และ `nonce` เพื่อป้องกันการโจมตีแบบ CSRF และ Replay Attack

3.  **สถาปัตยกรรม Backend-for-Frontend (BFF) ด้วย Auth.js:**
    *   **Token Hiding:** Access Token และ Refresh Token ของ ThaID จะถูกเก็บและใช้งานที่ฝั่ง Server (Next.js/Backend) เท่านั้น ไม่ถูกส่งมาที่ Browser ของผู้ใช้ ทำให้ Hacker ขโมย Token ไม่ได้ (No XSS Token Theft)
    *   **HttpOnly Cookies:** Session ของเราถูกเก็บใน Encrypted HttpOnly Cookie ซึ่ง JavaScript เข้าถึงไม่ได้ ป้องกัน XSS ได้อย่างดี

## 2. จุดที่ระบบช่วยป้องกัน (Security Features)

| ภัยคุกคาม (Threat) | การป้องกันในระบบของเรา (Mitigation) |
| :--- | :--- |
| **การปลอมตัว (Impersonation)** | ป้องกันโดยระบบ ThaID (ต้องสแกนหน้า/กด PIN) |
| **การขโมยรหัสผ่าน (Phishing)** | ระบบเราไม่ได้รับรหัสผ่านเลย ผู้ใช้กรอกที่ ThaID เท่านั้น |
| **การดักจับข้อมูล (Man-in-the-Middle)** | บังคับใช้ HTTPS (SSL/TLS) ตลอดเส้นทาง |
| **การแอบอ้างสิทธิ์ (Privilege Escalation)** | มีการตรวจสอบ SOAP API อีกชั้นเพื่อยืนยันว่าเป็น "พนักงานตัวจริง" ก่อนให้สิทธิ์ Admin |
| **Session Hijacking** | Auth.js ใช้ Cookie แบบ `HttpOnly`, `Secure`, `SameSite` และมีการเข้ารหัส (JWE) |

## 3. สิ่งที่ต้องระวัง (Remaining Risks & Responsibility)

ถึงแม้ระบบจะออกแบบมาปลอดภัย แต่ความปลอดภัยสุดท้ายจะขึ้นอยู่กับการ Implementation ของฝั่ง **Main Backend** ด้วย ดังนี้:

1.  **ThaID Client Secret (สำคัญที่สุด!):**
    *   ในการแลก Code เป็น Token ฝั่ง Backend **ต้อง** เก็บ `Client Secret` เป็นความลับสูงสุด ห้ามหลุดไปหน้าเว็บหรือ Code ฝั่ง Client เด็ดขาด (ระบบที่วางไว้ตอนนี้ Frontend ส่งแค่ `code` จึงปลอดภัย แต่ Backend ต้องระวังฝั่งตัวเอง)

2.  **การตรวจสอบ SOAP API:**
    *   Backend ต้องมั่นใจว่า PID ที่ได้จาก ThaID ถูกนำไปตรวจสอบกับ SOAP API อย่างถูกต้อง ไม่มีการ Hardcode หรือ Bypass

3.  **Callback URL Validation:**
    *   ต้องลงทะเบียน Callback URL กับ ThaID ให้ตรงเป๊ะๆ เพื่อป้องกัน Hacker หลอกให้ Redirect ไปเว็บอื่น (Open Redirect)

## สรุป (Verdict)
ในโหมด Production ระบบนี้มีความปลอดภัยในระดับ **Enterprise Grade** เหมาะสมสำหรับการใช้งานในองค์กรภาครัฐหรือเอกชนที่ต้องการความน่าเชื่อถือสูง โดยเฉพาะเมื่อมีการใช้ ThaID ที่เป็น National ID Platform
*   **User Identity:** ปลอดภัยมาก (ระดับชาติ)
*   **System Access:** ปลอดภัยตามมาตรฐานสากล (OIDC + BFF)
