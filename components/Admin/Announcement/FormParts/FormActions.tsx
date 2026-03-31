import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/Form/Button';
import { ConfirmationDialog } from '@/components/Common/ConfirmationDialog';
import { FormActionsProps } from '@/types/announcement';

export const FormActions = ({
    isReadOnly,
    isEditMode,
    isPublished,
    isArchived,
    onArchive,
    onPublish,
    onUnpublish,
    onRestore
}: FormActionsProps) => {
    return (
        <div className="flex justify-end gap-2 mt-4 mb-4">
            <Link href="/admin/announcement">
                <Button variant="outline" type="button" className='cursor-pointer'>
                    {isReadOnly ? 'ย้อนกลับ' : 'ยกเลิก'}
                </Button>
            </Link>

            {(!isEditMode || (isEditMode && !isReadOnly)) && (
                <>
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
                            onConfirm={onArchive}
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
                        onConfirm={onPublish}
                    />
                </>
            )}

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
                    onConfirm={onUnpublish}
                />
            )}

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
                    onConfirm={onRestore}
                />
            )}
        </div>
    );
};
