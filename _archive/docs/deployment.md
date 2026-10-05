# การนำระบบขึ้นใช้งาน (Deployment Guide)

คำแนะนำสำหรับการนำโปรเจกต์ **Resource Center** ขึ้นสู่ Production Server

## 1. Build Project

ในเครื่อง Server ให้รันคำสั่งเพื่อ Build เป็น Production Mode:

```bash
npm run build
```

ระบบจะสร้างโฟลเดอร์ `.next` ที่มีไฟล์ที่พร้อมใช้งาน

## 2. Start Application

รัน Service ด้วยคำสั่ง:

```bash
npm start
```

โดยปกติจะรันที่ Port `24990` (แก้ไขได้โดย `npm start -- -p 24990`)

## 3. Environment Variables (Production)

ตรวจสอบไฟล์ `.env` บน Server ว่าค่าต่างๆ ถูกต้องสำหรับ Production:

*   `NEXT_PUBLIC_APP_URL`: ต้องเป็น Domain จริง (เช่น `https://resource.cad.go.th`)
*   `API_TOKEN`: ต้องเป็น Key จริงที่ใช้เชื่อมต่อ Backend
*   `AUTH_SECRET`: ต้องเป็นค่าสุ่มที่ปลอดภัย (ห้ามใช้ค่า Default)
*   **ปิดโหมด Mock**: ในไฟล์ Code ที่เกี่ยวข้อง (`backend-api-mock.ts`) ให้แน่ใจว่าไม่ได้เปิดใช้งาน Mock Data

## 4. Reverse Proxy (Nginx/IIS)

แนะนำให้ใช้ Nginx หรือ IIS เป็น Reverse Proxy เพื่อจัดการ SSL (HTTPS) และ Forward Request ไปยัง Port 24990

ตัวอย่าง Config Nginx:
```nginx
server {
    listen 80;
    server_name resource.cad.go.th;

    location / {
        proxy_pass http://localhost:24990;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 5. Security Checklist

*   [ ] ตรวจสอบว่า `console.log` ที่แสดงข้อมูลสำคัญถูกลบออกแล้ว
*   [ ] ตั้งค่า Firewall ให้เปิดเฉพาะ Port ที่จำเป็น (80, 443) และปิด Port 24990 จากภายนอก
*   [ ] ตั้งค่า `AUTH_TRUST_HOST=true` หากอยู่หลัง Proxy
