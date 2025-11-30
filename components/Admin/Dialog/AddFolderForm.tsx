import { createFolder } from '@/actions/actions'
import FormContainer from '@/components/Form/FormContainer'
import TextInput from '@/components/Form/TextInput'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog';
import React, { useEffect, useActionState } from 'react';
import DialogFooter from './DialogFooter';
import { SubmitButton } from '@/components/Form/Button';
import { AddFolderFormProps } from '@/types/documents';
import TextAreaInput from '@/components/Form/TextAreaInput';

const initialState = { success: false, message: '' } as const;

const AddFolderForm = ({ parentId, onSuccess }: AddFolderFormProps) => {
    const [state, formAction] = useActionState(createFolder, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <FormContainer action={formAction} state={state}>
            {parentId && <input type="hidden" name="parent" value={parentId} />}
            <div className='p-2 flex-1'>
                <div className='grid md:grid-cols-1 gap-4 mt-1'>
                    <TextInput
                        name='name'
                        type='text'
                        label='ชื่อโฟลเดอร์'
                        placeholder='กรอกชื่อโฟลเดอร์ใหม่'
                        required={true}
                        errorMessage={state.errors?.name?.[0]}
                    />

                    <TextAreaInput
                        name='description'
                        label='คำอธิบายโฟลเดอร์'
                        placeholder='กรอกคำอธิบายโฟลเดอร์'
                        errorMessage={state.errors?.name?.[0]}
                    />

                    <TextInput
                        name='abbr'
                        type='text'
                        label='ชื่อย่อ (ภาษาอังกฤษเท่านั้น)'
                        placeholder='เช่น manual, scripts'
                        required={true}
                        errorMessage={state.errors?.abbr?.[0]}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className='cursor-pointer'>ยกเลิก</Button>
                    </DialogClose>
                    <SubmitButton text='สร้างโฟลเดอร์ใหม่' className='cursor-pointer' />
                </DialogFooter>
            </div>
        </FormContainer>
    )
}

export default AddFolderForm;