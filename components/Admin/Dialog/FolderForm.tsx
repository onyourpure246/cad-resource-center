'use client';

import { createFolder, updateFolder } from '@/actions/actions';
import FormContainer from '@/components/Form/FormContainer';
import TextInput from '@/components/Form/TextInput';
import TextAreaInput from '@/components/Form/TextAreaInput';
import { SubmitButton } from '@/components/Form/Button';
import DialogFooter from './DialogFooter';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { FolderFormProps } from '@/types/documents';
import { State } from '@/types/common';
import React, { useEffect, useActionState } from 'react';

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const COLOR_PRESETS = [
    '#FFC107', '#F44336', '#FF9800', '#4CAF50', '#009688', '#2196F3', '#9C27B0', '#E91E63',
    '#9E9E9E', '#FFCDD2', '#FFCC80', '#C8E6C9', '#B2DFDB', '#90CAF9', '#E1BEE7', '#F8BBD0'
];

const FolderForm = ({ folder, parentId, onSuccess }: FolderFormProps) => {
    // Determine mode based on presence of folder prop
    const isEditMode = !!folder;
    const [selectedColor, setSelectedColor] = React.useState(folder?.mui_colour || COLOR_PRESETS[0]);

    // Choose appropriate action
    const action = isEditMode ? updateFolder : createFolder;

    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <FormContainer action={formAction} state={state}>
            {/* Hidden Fields */}
            {isEditMode ? (
                <input type="hidden" name="id" value={folder!.id} />
            ) : null}

            {/* Parent ID is needed for Create, and optional for Update (but usually preserved or handled by server if omitted/same) */}
            {/* Based on original EditFolderForm, it was sending parent. createFolder sends it too. */}
            <input type="hidden" name="parent" value={parentId ?? ''} />
            <input type="hidden" name="mui_colour" value={selectedColor} />

            <div className='p-2 flex-1'>
                <div className='grid md:grid-cols-1 gap-4 mt-1'>
                    <TextInput
                        name='name'
                        type='text'
                        label='ชื่อโฟลเดอร์'
                        placeholder={isEditMode ? '' : 'กรอกชื่อโฟลเดอร์ใหม่'}
                        defaultValue={isEditMode ? folder?.name ?? '' : ''}
                        required={true}
                        errorMessage={state.errors?.name?.[0]}
                    />

                    {isEditMode ? (
                        <TextAreaInput
                            name='description'
                            label='คำอธิบายโฟลเดอร์'
                            placeholder='กรอกคำอธิบายโฟลเดอร์'
                            defaultValue={folder?.description ?? ''}
                        />
                    ) : (
                        <TextInput
                            name='abbr'
                            type='text'
                            label='ชื่อย่อ (ภาษาอังกฤษเท่านั้น)'
                            placeholder='เช่น manual, scripts'
                            required={true}
                            errorMessage={state.errors?.abbr?.[0]}
                        />
                    )}

                    <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                            สีโฟลเดอร์
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                            {COLOR_PRESETS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-6 h-6 rounded-full cursor-pointer transition-all ${selectedColor === color
                                        ? 'ring-2 ring-offset-2 ring-blue-500 scale-100'
                                        : 'hover:scale-100'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button size="default" variant="outline" className='cursor-pointer'>ยกเลิก</Button>
                    </DialogClose>
                    <SubmitButton
                        text={isEditMode ? 'บันทึก' : 'สร้างโฟลเดอร์ใหม่'}
                        className='cursor-pointer'
                    />
                </DialogFooter>
            </div>
        </FormContainer>
    );
};

export default FolderForm;
