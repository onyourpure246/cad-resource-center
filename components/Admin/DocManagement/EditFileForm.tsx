import React, { useEffect, useActionState } from 'react';
import { updateFile } from '@/actions/file-actions';
import FormContainer from '@/components/Form/FormContainer';
import TextAreaInput from '@/components/Form/TextAreaInput';
import { SubmitButton } from '@/components/Form/Button';
import { Button } from '@/components/ui/button';
import { Item } from '@/types/models';
import { State } from '@/types/common';
import { DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import TextInput from '@/components/Form/TextInput';

import { EditFileFormProps } from '@/types/components';

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const EditFileForm = ({ file, onSuccess, onCancel }: EditFileFormProps) => {
    const [state, formAction] = useActionState(updateFile, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <div className="flex flex-col h-full">
            <DrawerHeader>
                <DrawerTitle>แก้ไขไฟล์</DrawerTitle>
                <DrawerDescription>
                    กรอกข้อมูลด้านล่างเพื่อแก้ไขรายละเอียดไฟล์
                </DrawerDescription>
            </DrawerHeader>
            <FormContainer action={formAction} state={state}>
                <div className="h-full flex flex-col">
                    <input type="hidden" name="id" value={file.id} />
                    {/* Pass parent ID to server action for context (to check duplicates in the same folder) */}
                    <input type="hidden" name="parent" value={file.parent || ''} />
                    {/* Preserve original name if nice name is used, or maybe backend handles it. But we must send what we edit. */}
                    {/* If we edit filename, we should likely send it as 'filename'. */}

                    <div className='p-4 flex-1'>
                        <div className='grid md:grid-cols-1 gap-4 mt-4'>
                            <TextInput
                                name='name'
                                type='text'
                                label='ชื่อที่แสดง'
                                placeholder='กรอกชื่อที่แสดง'
                                defaultValue={file.name || ''}
                                required={true}
                                errorMessage={state.errors?.name?.[0]}
                            />
                        </div>
                        <div className='grid md:grid-cols-1 gap-4 mt-4'>
                            <TextInput
                                name='filename'
                                type='text'
                                label='ชื่อไฟล์'
                                placeholder='กรอกชื่อไฟล์'
                                defaultValue={file.filename || file.name || ''}
                                required={true}
                                errorMessage={state.errors?.filename?.[0]}
                            />
                        </div>

                        <div className='grid md:grid-cols-1 gap-4 mt-4'>
                            <TextAreaInput
                                name='description'
                                label='มีอะไรใหม่'
                                placeholder='กรอกคำอธิบายรายการดาวน์โหลดหรือการการอัปเดต'
                                defaultValue={file.description || ''}
                            />
                        </div>
                    </div>

                    <DrawerFooter>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className='cursor-pointer'
                            >
                                ยกเลิก
                            </Button>
                            <SubmitButton
                                text='บันทึกการแก้ไข'
                                className='cursor-pointer font-bold'
                            />
                        </div>
                    </DrawerFooter>
                </div>
            </FormContainer>
        </div>
    );
};

export default EditFileForm;
