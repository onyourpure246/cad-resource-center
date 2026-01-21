'use client';

import { createAnnouncement } from '@/actions/announcement-actions'
import { SubmitButton } from '@/components/Form/Button'
import FormContainer from '@/components/Form/FormContainer'
import TextAreaInput from '@/components/Form/TextAreaInput'
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

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const CreateNewAnnouncement = ({ className }: { className?: string }) => {
    // action function
    const [state, formAction] = useActionState(createAnnouncement, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push('/admin/announcement');
        }
    }, [state.success, router]);

    // Form States for Preview
    const [contentHTML, setContentHTML] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('ประชาสัมพันธ์');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [status, setStatus] = useState<string>('draft');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        } else {
            console.log("No file selected, clearing preview");
            setPreviewImage(null);
        }
    };

    // Using a ref or simple handler to set status before submit might be needed if formAction doesn't capture button value easily in all browsers,
    // but typically we can use onClick to set a state that feeds into a hidden input.

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
                                            id: -1,
                                            title: title || "หัวข้อประกาศตัวอย่าง...",
                                            content: contentHTML || "<p>เนื้อหาตัวอย่าง...</p>",
                                            category: category,
                                            cover_image: previewImage || undefined,
                                            status: 'Draft',
                                            publish_date: new Date().toISOString(), // Use ISO string
                                            created_at: new Date().toISOString(),
                                            updated_at: new Date().toISOString(),
                                            created_by: 'Admin',
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
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <TextInput
                                    name='name'
                                    type='text'
                                    label='หัวข้อ'
                                    placeholder='กรอกชื่อหัวข้อ'
                                    required={true}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <SelectInput
                                    label='หมวดหมู่'
                                    name="category"
                                    defaultValue="ประชาสัมพันธ์"
                                    options={ANNOUNCEMENT_CATEGORIES}
                                    onValueChange={setCategory}
                                />
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='mb-1'>ข้อความ</Label>
                                <div className="min-h-[300px]">
                                    <Editor onChangeHtml={setContentHTML} />
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
                            text="ประกาศ"
                            className='font-bold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90'
                            onClick={() => setStatus('published')}
                        />
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default CreateNewAnnouncement