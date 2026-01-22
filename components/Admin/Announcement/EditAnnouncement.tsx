'use client';

import { updateAnnouncement } from '@/actions/announcement-actions'
import { SubmitButton } from '@/components/Form/Button'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Form/TextInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { State } from '@/types/common'
import { Label } from '@/components/ui/label';
import { Editor } from '@/components/blocks/editor-00/editor';
import { useRouter } from 'next/navigation'
import React, { useActionState, useState, useEffect } from 'react'
import AnnouncementCard from '@/components/HomePage/AnnouncementCard'
import { ANNOUNCEMENT_CATEGORIES } from '@/utils/constants';
import SelectInput from '@/components/Form/SelectInput';
import ImageUpload from '@/components/Form/ImageUpload';
import { Announcement } from '@/types/announcement';

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

interface EditAnnouncementProps {
    announcement: Announcement;
    className?: string;
}

const EditAnnouncement = ({ announcement, className }: EditAnnouncementProps) => {
    // Bind the ID to the update action but wrap it to match useActionState signature
    const updateAction = async (prevState: State, formData: FormData) => {
        return await updateAnnouncement(Number(announcement.id), formData);
    };

    // action function
    const [state, formAction] = useActionState(updateAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push('/admin/announcement');
        }
    }, [state.success, router]);

    // Form States for Preview - Initialize with announcement data
    const [contentHTML, setContentHTML] = useState<string>(announcement.content || '');
    const [title, setTitle] = useState<string>(announcement.title || '');
    const [category, setCategory] = useState<string>(announcement.category || 'ประชาสัมพันธ์');
    // If there is an existing cover image, we might need a way to show it. 
    // The ImageUpload component might need to handle initial values or we just show it in preview.
    // For now, let's assume previewImage is for the *new* image selected. 
    // If we want to show the existing one, we can initialize it here if it matches the format, 
    // but usually existing images are URLs, and ImageUpload creates object URLs or expects files.
    // Let's rely on the card preview to show the existing image effectively if we pass it correctly.
    const [previewImage, setPreviewImage] = useState<string | null>(announcement.cover_image || null);

    const [status, setStatus] = useState<string>(announcement.status || 'draft');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };

    return (
        <div className={`w-full max-w-[1320px] mx-auto ${className}`}>
            <FormContainer action={formAction} state={state}>
                <input type="hidden" name="status" value={status} />
                <div className='mt-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        {/* Column 1 - Preview */}
                        <div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='text-2xl'>ตัวอย่างการแสดงผล (Preview)</Label>
                                <p className="text-muted-foreground text-sm mb-4">
                                    นี่คือรูปแบบที่ผู้ใช้งานทั่วไปจะเห็นบนหน้าเว็บไซต์
                                </p>
                            </div>

                            <div className="border rounded-xl p-6 bg-muted/30 flex justify-center items-center min-h-[400px]">
                                <div className="w-full max-w-[350px] relative pointer-events-none sm:pointer-events-auto">
                                    <AnnouncementCard
                                        announcement={{
                                            ...announcement,
                                            title: title || "หัวข้อประกาศตัวอย่าง...",
                                            content: contentHTML || "<p>เนื้อหาตัวอย่าง...</p>",
                                            category: category,
                                            cover_image: previewImage || undefined,
                                            status: status as any,
                                            updated_at: new Date().toISOString(),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-xs text-muted-foreground">
                                    *สามารถคลิกที่การ์ดเพื่อดูรายละเอียดฉบับเต็ม (Pop-up)
                                </span>
                            </div>
                        </div>

                        {/* Column 2 - Form Inputs */}
                        <div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='text-2xl'>รายละเอียดประกาศ</Label>
                            </div>

                            <div className='mb-0 flex flex-col gap-1'>
                                <ImageUpload
                                    name='cover_image'
                                    label='รูปภาพหน้าปก'
                                    onChange={handleImageChange}
                                />
                                {announcement.cover_image && !previewImage && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        มีรูปภาพเดิมอยู่แล้ว หากต้องการเปลี่ยนให้เลือกรูปภาพใหม่
                                    </p>
                                )}
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <TextInput
                                    name='name'
                                    type='text'
                                    label='หัวข้อ'
                                    placeholder='กรอกชื่อหัวข้อ'
                                    defaultValue={title}
                                    required={true}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <SelectInput
                                    label='หมวดหมู่'
                                    name="category"
                                    defaultValue={category}
                                    options={ANNOUNCEMENT_CATEGORIES}
                                    onValueChange={setCategory}
                                />
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='mb-1'>ข้อความ</Label>
                                <div className="min-h-[300px]">
                                    {/* Note: Editor component needs to support initialContent */}
                                    <Editor onChangeHtml={setContentHTML} initialHtml={contentHTML} />
                                </div>
                                <input type="hidden" name="messages" value={contentHTML} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-8">
                        <Link href="/admin/announcement">
                            <Button variant="outline" type="button" className='cursor-pointer'>ยกเลิก</Button>
                        </Link>

                        <SubmitButton
                            text="บันทึกฉบับร่าง"
                            variant="secondary"
                            className='font-bold cursor-pointer'
                            onClick={() => setStatus('draft')}
                        />

                        <SubmitButton
                            text="บันทึกการแก้ไข"
                            className='font-bold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90'
                            onClick={() => setStatus('published')}
                        />
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default EditAnnouncement
