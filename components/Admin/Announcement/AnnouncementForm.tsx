'use client';

import { createAnnouncement, updateAnnouncement } from '@/actions/announcement-actions'
import FormContainer from '@/components/Form/FormContainer'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState, useEffect } from 'react'
import { AnnouncementFormProps, AnnouncementFormState, AnnouncementStatus } from '@/types/announcement';
import { toast } from 'sonner';

// Sub-components
import { PreviewSection } from './FormParts/PreviewSection';
import { InputSection } from './FormParts/InputSection';
import { EditorSection } from './FormParts/EditorSection';
import { FormActions } from './FormParts/FormActions';

const initialState: AnnouncementFormState = {
    success: false,
    message: '',
    errors: {},
    targetStatus: undefined,
    timestamp: undefined
};

const AnnouncementForm = ({ announcement, className }: AnnouncementFormProps) => {

    const isEditMode = !!announcement;
    const isCreateMode = !isEditMode;
    const currentStatus: AnnouncementStatus = announcement?.status || 'Draft';

    const isPublished = currentStatus === 'Published';
    const isArchived = currentStatus === 'Archived';
    const isReadOnly = isEditMode && (isPublished || isArchived);

    const handleAction = async (prevState: AnnouncementFormState, formData: FormData): Promise<AnnouncementFormState> => {
        const targetStatus = formData.get('status') as string;
        let result;

        if (isEditMode && announcement) {
            result = await updateAnnouncement(Number(announcement.id), formData);
        } else {
            result = await createAnnouncement(prevState, formData);
        }

        return {
            ...result,
            targetStatus,
            timestamp: Date.now()
        };
    };

    const [state, formAction] = useActionState(handleAction, initialState);
    const router = useRouter();
    const lastStatusRef = React.useRef(currentStatus);

    // Refs for hidden submit buttons
    const archiveBtnRef = React.useRef<HTMLButtonElement>(null);
    const publishBtnRef = React.useRef<HTMLButtonElement>(null);
    const unpublishBtnRef = React.useRef<HTMLButtonElement>(null);
    const restoreBtnRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (state.success) {
            if (isCreateMode) {
                router.push('/admin/announcement');
                return;
            }

            const targetStatus = state.targetStatus;
            const previousStatus = lastStatusRef.current;
            const isStatus = (s: string | undefined, check: string) => s?.toLowerCase() === check.toLowerCase();

            if (isStatus(targetStatus, 'Draft')) {
                // If moving from Published/Archived back to Draft (Recall/Unpublish via form logic if any)
                if (isStatus(previousStatus, 'Published') || isStatus(previousStatus, 'Archived')) {
                    lastStatusRef.current = 'Draft';
                    return;
                }
            }

            router.push('/admin/announcement');
        }
    }, [state.success, state.targetStatus, state.timestamp, currentStatus, router, isCreateMode]);

    const [contentHTML, setContentHTML] = useState<string>(announcement?.content || '');
    const [title, setTitle] = useState<string>(announcement?.title || '');
    const [category, setCategory] = useState<string>(announcement?.category || 'ประชาสัมพันธ์');
    const [previewImage, setPreviewImage] = useState<string | null>(announcement?.cover_image || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        } else {
            setPreviewImage(null);
        }
    };

    const shouldRemoveImage = !previewImage && !!announcement?.cover_image;

    return (
        <div className={`w-full max-w-[1320px] mx-auto ${className}`}>
            <FormContainer action={formAction} state={state}>
                <div className='mt-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        {/* LEFT COLUMN: PREVIEW */}
                        <PreviewSection
                            announcement={announcement}
                            title={title}
                            contentHTML={contentHTML}
                            category={category}
                            previewImage={previewImage}
                            currentStatus={currentStatus}
                        />

                        {/* RIGHT COLUMN: INPUTS */}
                        <InputSection
                            isCreateMode={isCreateMode}
                            isReadOnly={isReadOnly}
                            currentStatus={currentStatus}
                            isPublished={isPublished}
                            isArchived={isArchived}
                            announcement={announcement}
                            title={title}
                            setTitle={setTitle}
                            category={category}
                            setCategory={setCategory}
                            handleImageChange={handleImageChange}
                        />
                    </div>

                    {/* BOTTOM: EDITOR */}
                    <EditorSection
                        isReadOnly={isReadOnly}
                        contentHTML={contentHTML}
                        setContentHTML={setContentHTML}
                    />

                    {/* HIDDEN BUTTONS FOR ACTIONS */}
                    <div className="hidden">
                        <input type="hidden" name="remove_cover_image" value={shouldRemoveImage ? "true" : "false"} />
                        <button type="submit" ref={archiveBtnRef} name="status" value="Archived" className="hidden" />
                        <button type="submit" ref={publishBtnRef} name="status" value="Published" className="hidden" />
                        <button type="submit" ref={unpublishBtnRef} name="status" value="Draft" className="hidden" />
                        <button type="submit" ref={restoreBtnRef} name="status" value="Draft" className="hidden" />
                    </div>

                    {/* ACTION BUTTONS */}
                    <FormActions
                        isReadOnly={isReadOnly}
                        isEditMode={isEditMode}
                        isPublished={isPublished}
                        isArchived={isArchived}
                        onArchive={() => archiveBtnRef.current?.click()}
                        onPublish={() => publishBtnRef.current?.click()}
                        onUnpublish={() => unpublishBtnRef.current?.click()}
                        onRestore={() => restoreBtnRef.current?.click()}
                    />
                </div>
            </FormContainer>
        </div>
    )
}

export default AnnouncementForm;
