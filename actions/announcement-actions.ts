'use server'
import { revalidatePath } from 'next/cache'

// fetch ข้อมูลประกาศประชาสัมพันธ์


// create ข้อมูลประกาศประชาสัมพันธ์
export const createAnnouncement = async (prevState: any, formData: FormData) => {
    const rawData = Object.fromEntries(formData);
    const data = Object.fromEntries(
        Object.entries(rawData).filter(([key]) => !key.startsWith("$ACTION"))
    );

    revalidatePath('/admin/announcement', 'layout');
    return { success: true, message: "อัปโหลดไฟล์สำเร็จ!" };
};


// update ข้อมูลประกาศประชาสัมพันธ์


// delete ข้อมูลประกาศประชาสัมพันธ์
