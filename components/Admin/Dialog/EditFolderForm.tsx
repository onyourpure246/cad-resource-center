'use client';

import { updateFolder } from '@/actions/actions';
import FormContainer from '@/components/Form/FormContainer';
import TextInput from '@/components/Form/TextInput';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import React, { useEffect, useActionState } from 'react';
import DialogFooter from '../Dialog/DialogFooter';
import { SubmitButton } from '@/components/Form/Button';
import { EditFolderFormProps } from '@/types/documents';
import { State } from '@/types/common';
import TextAreaInput from '@/components/Form/TextAreaInput';

const initialState: State = {
    success: false,
    message: '',
    errors: {
        name: [],
        abbr: [],
    }
};

const EditFolderForm = ({ folder, parentId, onSuccess }: EditFolderFormProps) => {
    const [state, formAction] = useActionState(updateFolder, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <FormContainer action={formAction} state={state}>
            <input type="hidden" name="id" value={folder.id} />
            <input type="hidden" name="parent" value={parentId ?? ''} />
            <div className='p-2 flex-1'>
                <div className='grid md:grid-cols-1 gap-4 mt-1'>
                    <TextInput
                        name='name'
                        type='text'
                        label='ชื่อโฟลเดอร์'
                        defaultValue={folder.name ?? ''}
                        required={true}
                        errorMessage={state.errors?.name?.[0]}
                    />

                    <TextAreaInput
                        name='description'
                        label='คำอธิบายโฟลเดอร์'
                        placeholder='กรอกคำอธิบายโฟลเดอร์'
                        defaultValue={folder.description ?? ''}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline" className='cursor-pointer'>ยกเลิก</Button></DialogClose>
                    <SubmitButton text='บันทึก' className='cursor-pointer' />
                </DialogFooter>
            </div>
        </FormContainer>
    );
}

export default EditFolderForm;