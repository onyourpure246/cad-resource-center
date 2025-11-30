import React, { useActionState, useEffect } from 'react'
import FormContainer from '../../Form/FormContainer'
import { uploadFile } from '@/actions/actions'
import TextInput from '../../Form/TextInput'
import TextAreaInput from '../../Form/TextAreaInput'
import { SubmitButton } from '../../Form/Button'
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../../ui/drawer'
import { Button } from '../../ui/button'
import { CreateNewFormProps } from '@/types/documents';
import { State } from '@/types/common';

// default state
const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const CreateNewForm = ({ parentId, onSuccess }: CreateNewFormProps) => {
    const [state, formAction] = useActionState(uploadFile, initialState);
    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);
    return (
        <div className="flex flex-col h-full">
            <DrawerHeader>
                <DrawerTitle>อัปโหลดไฟล์ใหม่</DrawerTitle>
                <DrawerDescription>
                    กรอกข้อมูลด้านล่างเพื่ออัปโหลดไฟล์ใหม่
                </DrawerDescription>
            </DrawerHeader>
            <FormContainer action={formAction} state={state}>
                <input type="hidden" name="parent" value={parentId ?? ''} />
                <div className='p-4 flex-1'>
                    <div className='grid md:grid-cols-1 gap-4 mt-4'>
                        <TextInput
                            name='name'
                            type='text'
                            label='ชื่อรายการดาวน์โหลด'
                            placeholder='กรอกชื่อรายการดาวน์โหลด'
                            required={true}
                            errorMessage={state.errors?.name?.[0]}
                        />
                    </div>
                    <div className='grid md:grid-cols-1 gap-4 mt-4'>
                        <TextAreaInput
                            name='description'
                            label='มีอะไรใหม่'
                            placeholder='กรอกคำอธิบายรายการดาวน์โหลดหรือการการอัปเดต'
                        />
                    </div>
                    <div className='grid md:grid-cols-1 gap-4 mt-6'>
                        <TextInput
                            type='file'
                            label='อัปโหลดไฟล์ใหม่'
                            name='file'
                            placeholder='เลือกไฟล์ที่ต้องการอัปโหลด'
                            required={true}
                            errorMessage={state.errors?.file?.[0]}
                        />
                    </div>
                </div>
                <DrawerFooter>
                    <div className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline">ยกเลิก</Button>
                        </DrawerClose>
                        <SubmitButton
                            text="ยืนยันการอัปโหลด"
                            className='font-bold'
                        />
                    </div>
                </DrawerFooter>
            </FormContainer>
        </div>
    )
}

export default CreateNewForm