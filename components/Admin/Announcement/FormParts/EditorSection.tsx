import React from 'react';
import { Label } from '@/components/ui/label';
import { Editor } from '@/components/editor/editor';
import { EditorSectionProps } from '@/types/announcement';

export const EditorSection = ({ isReadOnly, contentHTML, setContentHTML }: EditorSectionProps) => {
    return (
        <div className='mt-8 flex flex-col gap-1 w-full max-w-5xl mx-auto'>
            <Label className='mb-1 text-lg font-semibold'>รายละเอียดเนื้อหาข่าว</Label>
            <div className={`min-h-[400px] w-full ${isReadOnly ? "opacity-50 pointer-events-none grayscale" : ""}`}>
                <Editor onChangeHtml={setContentHTML} initialHtml={contentHTML} />
            </div>
            <input type="hidden" name="messages" value={contentHTML} />
        </div>
    );
};
