# แผนผังและแนวทางการทำ Unit Test สำหรับ Full-Stack (Next.js & Hono)

เอกสารฉบับนี้จัดทำขึ้นเพื่อใช้เป็นแนวทางในการเขียนสคริปต์ทดสอบ (Unit Test) สำหรับระบบแบบ Full-Stack ที่ครอบคลุมทั้ง **ระบบหน้าบ้าน (Frontend: Next.js)** ซึ่งมีการใช้งาน Server Actions, Custom Hooks และ UI Components และ **ระบบหลังบ้าน (Backend: Hono)** ที่ทำงานระดับ Services และ API Routes อย่างมีประสิทธิภาพ

---

## 1. วัตถุประสงค์ (Objective)
1. **คุณภาพระดับโปรดักชั่นแบบครบวงจร (Full-Stack Production-Grade Quality):** เพื่อให้มั่นใจว่าการทำงานประสานกันของระบบ ตั้งแต่หน้าบ้าน (UI, Server Actions) จนถึงหลังบ้าน (Database Services, API Routes) รวมไปถึงระบบความปลอดภัย ทำงานได้อย่างถูกต้องและเสถียร
2. **ลดข้อผิดพลาดแต่เนิ่นๆ (Early Bug Prevention):** ตรวจจับข้อผิดพลาดและ Edge Cases ที่อาจเกิดขึ้น ทั้งฝั่งผู้ใช้งาน Client และฝั่งการทรานแซคชันระดับฐานข้อมูล
3. **ความยั่งยืนของโครงสร้างโค้ด (Refactoring without Fear):** ควบคุมและให้ความมั่นใจแก่นักพัฒนาว่าการเพิ่มฟีเจอร์ใหม่หรือการรื้อโครงสร้างโค้ด (Refactor) จะไม่ไปกระทบโมดูลเดิมที่เคยทำงานได้
4. **ความน่าเชื่อถือและการเป็นบรรทัดฐาน (Reliability & Documentation Benchmark):** ใช้ Test Suite เป็นมาตรฐานการพัฒนาซอฟต์แวร์ขององค์กร และใช้ Test Cases เป็นเหมือนเอกสารมีชีวิต (Living Documentation) อธิบายพฤติกรรมของระบบจากโค้ดจริง

---

## 2. เครื่องมือที่แนะนำ (Recommended Tech Stack)
เนื่องจากทั้งระบบยึดโครงสร้างบนระบบนิเวศของ JavaScript/TypeScript จึงแนะนำให้ใช้ **Vitest** เป็นแกนหลักทั้งคู่:
- **[Vitest](https://vitest.dev/):** Test Runner แกนหลักของทั้งหน้าบ้านและหลังบ้าน ทำงานได้รวดเร็ว (Lightning Fast ~500ms สำหรับ Backend) พร้อมรองรับ TypeScript 
- **ฝั่งหน้าบ้าน (Frontend - Next.js):**
  - **React Testing Library (RTL):** ใช้ทดสอบการเรนเดอร์ UI Components, Events และ Custom Hooks บนมุมมองผู้ใช้งาน
  - **Mock Functions (vi.mock / MSW):** จำลองสถานการณ์การเรียก API นอกและการเรียกคืน Server Actions
- **ฝั่งหลังบ้าน (Backend - Hono):**
  - **Hono Testing Utility (`app.request`):** ฟังก์ชันจำลอง HTTP Request เพื่อทดสอบ Routes แบบ In-Memory โดยไม่ต้องรันเซิร์ฟเวอร์จริงขึ้นมา
  - **Service API Mocking:** ใช้สำหรับจำลองหรือทดสอบ Database Connector และ Service Logic ชั้นในเพื่อดูความถูกต้อง

---

## 3. ขอบเขตและกลยุทธ์การทดสอบ (Testing Scope)

การประเมินผล Unit Test ของโปรเจกต์บรรลุเป้าหมายการทดสอบแบบคู่ขนาน (Parallel Testing Strategy) โดยแบ่งเป็น 2 ขอบเขตหลัก ได้แก่ **7 โฟกัสสำหรับฝั่งหน้าบ้าน** และ **9 โฟกัสหลักสำหรับฝั่งหลังบ้าน** ครอบคลุมจุดสำคัญของแอปพลิเคชันทั้งหมด ดังนี้:

### 3.1. ขอบเขตฝั่งระบบหน้าบ้าน (Frontend Scope - `cad-resource-center`)
ทำงานทดสอบสำเร็จรวมแล้ว 27 Tests (Pass rate 100% ด้วยความเร็ว ~1.83s):
- **1. 🌐 เซิร์ฟเวอร์แอคชัน (Server Actions):** ทดสอบการดึงข้อมูลและตรวจสอบความถูกต้อง (Validation) ได้แก่ 
  - `user-actions`: ทดสอบระบบจัดการบัญชี และพฤติกรรมเมื่อคืนค่า Status ต่างๆ
  - `announcement-actions`: ทดสอบการสร้างและปรับเปลี่ยนสถานะข่าวอัปเดตแบบ End-to-End Logic
  - `folder-actions`: ทดสอบการทำงานร่วมกับ Zod ก่อนส่งไปสร้างแฟ้มใหม่ เพื่อป้องกันไฟล์ชื่อซ้ำหรือใส่ค่าผิด
- **2. 🔌 เซอร์วิสและ API (API & Services):** ครอบคลุมถึงการดึงข้อมูล Dashboard และทำการจำลองความสำเร็จของ **ระบบพร็อกซีดาวน์โหลดไฟล์ (`proxy-download`)** ที่สกัดการเข้าใช้งานกรณี Unauthorized (401) ป้องกันการเข้าถึงผิดสิทธิ์ได้อย่างไม่มีข้อผิดพลาด
- **3. 🎣 React Hooks (`useFolderContents`):** ตรวจเช็คสถานะ Loading เมื่อเกิดการเชื่อมต่อเครือข่าย หรือกระเด้งหยุดการทำงานเมื่อเจอข้อมูลแบบ NaN  
- **4. 🧩 ส่วนติดต่อผู้ใช้ (UI Components):** ทดสอบพฤติกรรม UI เชิงลึกใน `ConfirmationDialog` ยืนยันการคลิกและสิทธิประโยชน์การแสดงผล

### 3.2. ขอบเขตฝั่งระบบหลังบ้าน (Backend Scope - `farside_source`)
ทำงานทดสอบสำเร็จรวมแล้ว 36 Tests กระจายตัวคลุมครบในทุก Router Module (Pass rate 100% ด้วยความเร็วสูงสุด ~508ms):
- **1. 🗄️ กระบวนการฐานข้อมูล (Database Service):** ทดสอบฟังก์ชันเปิด-ปิด Connection Pool ตลอดจนการทำ `query()`, `queryOne()`, และ `execute()` ว่าส่งออกข้อมูลจริง หรือคืนค่า Error ได้เมื่อ Database มีปัญหาได้อย่างรัดกุม
- **2. 🔐 เส้นทางข้อมูล (API Routes):** ได้เพิ่ม Test Suite เข้ากับระบบ Routes **ทุกโมดูลเต็ม 100%** ได้แก่
  - `auth`: ทดสอบการล็อกอิน และ ThaID Authentication ว่าให้ผลลัพธ์การคัดกรอง Missing CID หรือ Password ถูกต้องไหม และต้องปล่อย Token สำเร็จด้วยสถานะ 200 เมื่อครบ
  - `category` & `dashboard`: ทดสอบการดึงค่าสถิติ ข้อมูลหมวดการจัดไฟล์ ตลอดจนการจัดการสถานะความผิดพลาดระดับ DB Error (500)
  - `download`: ทดสอบกระบวนการ POST ข้อมูลไฟล์ และ DELETE 
  - `employee`, `news`, `search`, `user`: จัดเก็บสถานการณ์ Edge cases ทั้งการร้องขอ 400 Bad request หากไม่ได้ส่งตัวแปร (เช่น pid, keyword) เข้ามา และสถานะการพบ/ไม่พบข้อมูลที่ร้องขอ

---

## 4. ตัวอย่างการเขียน Test Case (Examples)

ด้านล่างนี้คือตัวอย่างวิธีการเขียน Unit Test ในส่วนต่างๆ ของระบบ ทั้งการใช้ **React Testing Library** สำหรับหน้าบ้าน และ **Hono Testing Utility** สำหรับหลังบ้าน 

> **รูปแบบการเขียนที่ดีที่สุดคือ AAA (Arrange, Act, Assert)**
> - **Arrange:** เตรียมข้อมูลและตั้งค่า (Mock)
> - **Act:** เรียกใช้งานฟังก์ชัน เรนเดอร์ Component หรือยิง Request
> - **Assert:** ตรวจสอบผลลัพธ์ว่าตรงกับที่คาดหวังหรือไม่

### 4.1. [ระบบหน้าบ้าน] การทดสอบ Server Action: `folder-actions.ts`
ทดสอบฟังก์ชัน `createFolder` ว่าถ้าข้อมูลไม่ครบตาม Zod Schema จะต้องคืนค่า error

```typescript
// __tests__/actions/folder-actions.test.ts
import { describe, it, expect, vi } from 'vitest';
import { createFolder } from '@/actions/folder-actions';

// Mock Authentication
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue({ accessToken: 'fake-token', user: { id: 1 } })
}));

describe('Folder Actions: createFolder', () => {
  it('ควรคืนค่า error หากไม่ได้กรอกชื่อโฟลเดอร์', async () => {
    // Arrange
    const formData = new FormData();
    formData.append('abbr', 'TEST'); 
    // ตั้งใจไม่ใส่ 'name' เพื่อให้ตก Validation

    // Act
    const result = await createFolder(null, formData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('ข้อมูลไม่ถูกต้อง');
  });
});
```

### 4.2. [ระบบหลังบ้าน] การทดสอบ API Route: `category.routes.ts`
ทดสอบการร้องขอของ Hono endpoint แบบ In-Memory โดยไม่ได้รันเซิร์ฟเวอร์จริงขึ้นมา

```typescript
// __tests__/routes/category.routes.test.ts
import { describe, it, expect, vi } from 'vitest';
import { Hono } from 'hono';
import categoryRouter from '../../src/routes/category.routes';
import * as dbService from '../../src/services/database.service';

vi.mock('../../src/services/database.service');

describe('Category Routes', () => {
  const app = new Hono().route('/category', categoryRouter);

  it('GET /category ควรคืนค่า 200 พร้อมกับรายการหมวดหมู่ (Categories)', async () => {
    // Arrange
    const mockCategories = [{ id: 1, name: 'เอกสารทั่วไป' }];
    vi.spyOn(dbService, 'query').mockResolvedValue(mockCategories);

    // Act
    const res = await app.request('/category');
    
    // Assert
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual(mockCategories);
  });
});
```

---

## 5. แผนการนำไปปฏิบัติ (Implementation Plan)
เนื่องจากระบบแบ่งออกเป็น 2 Project (หน้าบ้านและหลังบ้าน) ทิศทางการตั้งค่าจึงแยกโซนกันอย่างชัดเจน:

### 5.1. การติดตั้งฝั่งหน้าบ้าน (`cad-resource-center`)
1. **ติดตั้ง Dependencies:** รันคำสั่ง `npm install -D vitest @testing-library/react @testing-library/dom @testing-library/user-event jsdom @vitejs/plugin-react`
2. **การตั้งค่า (Configuration):** กำหนด `vitest.config.ts` ให้ใช้ environment เป็น `jsdom` และแมป Alias ของ Next.js (`@/*`) ให้ถูกต้องตรงกัน
3. **กำหนดการรันสคริปต์:** เพิ่ม Script เข้า `package.json` เช่น `"test": "vitest"`

### 5.2. การติดตั้งฝั่งระบบหลังบ้าน (`farside_source`)
1. **ติดตั้ง Dependencies:** รันคำสั่ง `npm install -D vitest` (ฝั่งหลังบ้านเบามาก ไม่ต้องใช้ RTL หรือ jsdom เพราะเทสแค่โค้ด Data ล้วนและ HTTP แบบ In-Memory)
2. **การตั้งค่า (Configuration):** สร้าง `vitest.config.ts` แบบเบสิคที่สุด โดยระบุ `environment: 'node'` 
3. **ดูความครอบคลุม (Coverage UI):** ใช้คำสั่ง `"test": "vitest"` ตามปกติ หรือ `"test:ui": "vitest --ui"` เพื่อดู Coverage ผ่านเบราว์เซอร์ สรุปเปอร์เซ็นต์ของ API ทุกเส้น

### 5.3. ข้อแนะนำการเริ่มเขียน
แนะนำให้เริ่มไล่เขียนจาก **Core Logic แกนหลัก** ก่อน เช่น สคริปต์ **Services/Routes** ฝั่งหลังบ้าน และ **Server Actions** ฝั่งหน้าบ้าน เพราะจุดนี้คือหัวใจควบคุมของโปรเจกต์ ถ้าระบบฐานข้อมูลและ Data Fetching มั่นคง UI ของ Client ก็จะทำงานได้อย่างไร้กังวลตามไปด้วย
