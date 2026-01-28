'use client';

import { createAnnouncement, updateAnnouncement } from '@/actions/announcement-actions'
import { SubmitButton } from '@/components/Form/Button'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Form/TextInput'
import { ConfirmationDialog } from '@/components/Common/ConfirmationDialog';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Editor } from '@/components/Editor/editor';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation'
import React, { useActionState, useState, useEffect } from 'react'
import AnnouncementCard from '@/components/HomePage/AnnouncementCard'
import { ANNOUNCEMENT_CATEGORIES } from '@/utils/constants';
import SelectInput from '@/components/Form/SelectInput';
import ImageUpload from '@/components/Form/ImageUpload';
import { Announcement } from '@/types/announcement';
import { State } from '@/types/common';

// Extend the common State type locally to include targetStatus for redirection logic
interface ExtendedState extends State {
    targetStatus?: string;
    timestamp?: number;
}

const initialState: ExtendedState = {
    success: false,
    message: '',
    errors: {},
    targetStatus: undefined,
    timestamp: undefined
};

interface AnnouncementFormProps {
    announcement?: Announcement; // Optional: If present, it's Edit Mode. If missing, it's Create Mode.
    className?: string;
}

const AnnouncementForm = ({ announcement, className }: AnnouncementFormProps) => {
    // Mode Detection
    const isEditMode = !!announcement;
    const isCreateMode = !isEditMode;

    // Use prop directly for current status logic to prevent stale state issues
    // For create mode, default to 'Draft'
    const currentStatus = announcement?.status || 'Draft';

    // Strict Workflow Logic
    const isPublished = currentStatus === 'Published';
    const isArchived = currentStatus === 'Archived';

    // Read-only mode: Active when Published or Archived (only applies to Edit mode usually)
    const isReadOnly = isEditMode && (isPublished || isArchived);

    // Bind the ID to the update action but wrap it to match useActionState signature
    const handleAction = async (prevState: ExtendedState, formData: FormData): Promise<ExtendedState> => {
        const targetStatus = formData.get('status') as string;
        let result;

        if (isEditMode && announcement) {
            // Update Existing
            result = await updateAnnouncement(Number(announcement.id), formData);
        } else {
            // Create New
            result = await createAnnouncement(prevState, formData);
        }

        return {
            ...result,
            targetStatus,
            timestamp: Date.now() // Ensure state is always unique to trigger effects
        };
    };

    // action function
    const [state, formAction] = useActionState(handleAction, initialState);
    const router = useRouter();

    // Track the status *before* the update to correctly identify transitions (e.g. Published -> Draft)
    const lastStatusRef = React.useRef(currentStatus);

    // Refs for hidden submit buttons
    const archiveBtnRef = React.useRef<HTMLButtonElement>(null);
    const publishBtnRef = React.useRef<HTMLButtonElement>(null);
    const unpublishBtnRef = React.useRef<HTMLButtonElement>(null);
    const restoreBtnRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (state.success) {
            // If Create Mode -> Always redirect to list
            if (isCreateMode) {
                router.push('/admin/announcement');
                return;
            }

            // Edit Mode Logic
            // Conditional Redirection Logic:
            // If we are Unpublishing (Published -> Draft) or Restoring (Archived -> Draft), STAY on the page to allow editing.
            // If we are Publishing (Draft -> Published) or Archiving (Draft -> Archived), Redirect to list.
            // If we are Saving Draft (Draft -> Draft), Redirect to list (Standard "Save" behavior).

            const targetStatus = state.targetStatus;
            const previousStatus = lastStatusRef.current;

            const isStatus = (s: string | undefined, check: string) => s?.toLowerCase() === check.toLowerCase();

            // If the INTENDED status is 'Draft', we check if we should stay.
            if (isStatus(targetStatus, 'Draft')) {
                // If it was ALREADY Draft (Save button), we might want to go back?
                // The user request specifically mentioned "Unpublish -> Edit immediately".
                // So if it WAS Published or Archived, we stay.
                if (isStatus(previousStatus, 'Published') || isStatus(previousStatus, 'Archived')) {
                    // Update the ref to the new status so subsequent saves behave correctly (redirect)
                    lastStatusRef.current = 'Draft';
                    // We might need to reload or just let React state update via new props if using Server Components correctly,
                    // but since this is Client Comp, we might see old props until revalidation.
                    // For now, staying on page is enough.
                    return;
                }
            }

            router.push('/admin/announcement');
        }
    }, [state.success, state.targetStatus, state.timestamp, currentStatus, router, isCreateMode]);

    // Form States for Preview - Initialize with announcement data or defaults
    const [contentHTML, setContentHTML] = useState<string>(announcement?.content || '');
    const [title, setTitle] = useState<string>(announcement?.title || '');
    const [category, setCategory] = useState<string>(announcement?.category || 'ประชาสัมพันธ์');
    const [previewImage, setPreviewImage] = useState<string | null>(announcement?.cover_image || null);

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
                {/* Remove hidden status input to allow buttons to control status via name/value */}
                <div className='mt-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        {/* Column 1 - Preview */}
                        <div>
                            <div className='mb-0 flex flex-col gap-1'>
                                <Label className='text-2xl'>ตัวอย่างการแสดงผล (Preview)</Label>
                                <p className="text-muted-foreground text-sm mb-4">
                                    นี่คือรูปแบบที่ผู้ใช้งานทั่วไปจะเห็นบนหน้าเว็บไซต์
                                </p>
                            </div>

                            <div className="border rounded-xl p-6 bg-muted/30 flex justify-center items-center min-h-[400px]">
                                <div className="w-full max-w-[350px] relative pointer-events-none sm:pointer-events-auto">
                                    <AnnouncementCard
                                        announcement={{
                                            id: announcement?.id || -1,
                                            title: title || "หัวข้อประกาศตัวอย่าง...",
                                            content: contentHTML || "<p>เนื้อหาตัวอย่าง...</p>",
                                            category: category,
                                            cover_image: previewImage || undefined,
                                            status: currentStatus,
                                            publish_date: announcement?.publish_date || new Date().toISOString(),
                                            created_at: announcement?.created_at || new Date().toISOString(),
                                            updated_at: new Date().toISOString(),
                                            created_by: announcement?.created_by || 'Admin',
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
                                <Label className='text-2xl'>
                                    {isCreateMode ? 'สร้างประกาศใหม่' : 'แก้ไขประกาศ'}
                                </Label>
                                {isReadOnly && (
                                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm mt-2 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                        สถานะ <strong>{currentStatus === 'Published' ? 'กำลังเผยแพร่' : 'จัดเก็บถาวร'}</strong> (ไม่สามารถแก้ไขได้) <br />
                                        {isPublished && "กรุณากดปุ่ม 'ยกเลิกการเผยแพร่' หากต้องการแก้ไขข้อมูล"}
                                        {isArchived && "กรุณากดปุ่ม 'คืนค่าเป็นฉบับร่าง' หากต้องการนำกลับมาใช้"}
                                    </div>
                                )}
                            </div>

                            <div className='mb-0 flex flex-col gap-1'>
                                <div className={isReadOnly ? "opacity-50 pointer-events-none" : ""}>
                                    <ImageUpload
                                        name='cover_image'
                                        label='รูปภาพหน้าปก'
                                        defaultValue={announcement?.cover_image ? (
                                            announcement.cover_image.startsWith('http') || announcement.cover_image.startsWith('blob:')
                                                ? announcement.cover_image
                                                : `/api/images/${announcement.cover_image}`
                                        ) : null}
                                        onChange={handleImageChange}
                                    />
                                </div>
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
                                    disabled={isReadOnly}
                                />
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <div className={isReadOnly ? "opacity-50 pointer-events-none" : ""}>
                                    <SelectInput
                                        label='หมวดหมู่'
                                        name="category"
                                        defaultValue={category}
                                        options={ANNOUNCEMENT_CATEGORIES}
                                        onValueChange={setCategory}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex flex-col gap-1 w-full max-w-5xl mx-auto'>
                        <Label className='mb-1 text-lg font-semibold'>รายละเอียดเนื้อหาข่าว</Label>
                        <div className={`min-h-[400px] w-full ${isReadOnly ? "opacity-50 pointer-events-none grayscale" : ""}`}>
                            <Editor onChangeHtml={setContentHTML} initialHtml={contentHTML} />
                        </div>
                        <input type="hidden" name="messages" value={contentHTML} />
                    </div>

                    {/* Hidden Submit Buttons to be triggered by Dialogs */}
                    <div className="hidden">
                        <button type="submit" ref={archiveBtnRef} name="status" value="Archived" className="hidden" />
                        <button type="submit" ref={publishBtnRef} name="status" value="Published" className="hidden" />
                        <button type="submit" ref={unpublishBtnRef} name="status" value="Draft" className="hidden" />
                        <button type="submit" ref={restoreBtnRef} name="status" value="Draft" className="hidden" />
                    </div>

                    <div className="flex justify-end gap-2 mt-4 mb-4">
                        <Link href="/admin/announcement">
                            <Button variant="outline" type="button" className='cursor-pointer'>
                                {isReadOnly ? 'ย้อนกลับ' : 'ยกเลิก'}
                            </Button>
                        </Link>

                        {/* WORKFLOW ACTIONS */}

                        {/* 1. CREATE MODE & DRAFT EDIT MODE */}
                        {/* Show standard Save/Publish buttons if:
                            - It's Create Mode
                            - OR It's Edit Mode AND Not ReadOnly (meaning Draft)
                        */}
                        {(!isEditMode || (isEditMode && !isReadOnly)) && (
                            <>
                                {/* Archive Button - Only in Edit Mode usually, or generic? Create -> Archive directly? Let's allow it in Edit mainly. */}
                                {isEditMode && (
                                    <ConfirmationDialog
                                        trigger={
                                            <Button
                                                variant="outline"
                                                type="button"
                                                className='cursor-pointer border-orange-200 text-orange-700 hover:bg-orange-50 capitalize'
                                            >
                                                จัดเก็บถาวร (Archive)
                                            </Button>
                                        }
                                        title="ยืนยันการจัดเก็บ"
                                        description="คุณต้องการจัดเก็บประกาศนี้ใช่หรือไม่? ประกาศจะถูกซ่อนจากหน้าเว็บ"
                                        confirmLabel="จัดเก็บ"
                                        onConfirm={() => archiveBtnRef.current?.click()}
                                    />
                                )}

                                <SubmitButton
                                    text="บันทึกฉบับร่าง"
                                    variant="secondary"
                                    className='font-bold cursor-pointer'
                                    name="status"
                                    value="Draft"
                                />

                                <ConfirmationDialog
                                    trigger={
                                        <Button
                                            className='font-bold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 capitalize'
                                            type="button"
                                        >
                                            เผยแพร่ (Publish)
                                        </Button>
                                    }
                                    title="ยืนยันการเผยแพร่"
                                    description="คุณต้องการเผยแพร่ประกาศนี้ขึ้นสู่หน้าเว็บไซต์ใช่หรือไม่?"
                                    confirmLabel="เผยแพร่"
                                    onConfirm={() => publishBtnRef.current?.click()}
                                />
                            </>
                        )}

                        {/* 2. PUBLISHED STATE ACTIONS (Edit Mode Only) */}
                        {isPublished && (
                            <ConfirmationDialog
                                trigger={
                                    <Button
                                        variant="destructive"
                                        className='font-bold cursor-pointer capitalize'
                                        type="button"
                                    >
                                        ยกเลิกการเผยแพร่ (Unpublish)
                                    </Button>
                                }
                                title="ยืนยันการยกเลิกเผยแพร่"
                                description="คุณต้องการยกเลิกการเผยแพร่ประกาศนี้ใช่หรือไม่? ประกาศจะถูกเปลี่ยนสถานะเป็น 'ร่าง'"
                                confirmLabel="ยืนยัน"
                                variant="destructive"
                                onConfirm={() => unpublishBtnRef.current?.click()}
                            />
                        )}

                        {/* 3. ARCHIVED STATE ACTIONS (Edit Mode Only) */}
                        {isArchived && (
                            <ConfirmationDialog
                                trigger={
                                    <Button
                                        variant="secondary"
                                        className='font-bold cursor-pointer capitalize'
                                        type="button"
                                    >
                                        คืนค่าเป็นฉบับร่าง (Restore to Draft)
                                    </Button>
                                }
                                title="ยืนยันการคืนค่า"
                                description="คุณต้องการคืนค่าประกาศนี้สู่สถานะ 'ร่าง' ใช่หรือไม่?"
                                confirmLabel="ยืนยัน"
                                onConfirm={() => restoreBtnRef.current?.click()}
                            />
                        )}
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default AnnouncementForm
