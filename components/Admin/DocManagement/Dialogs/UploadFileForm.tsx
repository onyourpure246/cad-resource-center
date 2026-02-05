'use client';
import React, { useRef, useState } from 'react'
import FormContainer from '@/components/Form/FormContainer'
import { uploadFile } from '@/actions/file-actions'
import TextInput from '@/components/Form/TextInput'
import TextAreaInput from '@/components/Form/TextAreaInput'
import { SubmitButton } from '@/components/Form/Button'
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { CreateNewFormProps } from '@/types/components';
import { State } from '@/types/common';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { CloudUpload, File as FileIcon, X } from 'lucide-react';

// default state
const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const UploadFileForm = ({ parentId, onSuccess }: CreateNewFormProps) => {
    const { state, formAction } = useFormSubmission(uploadFile, initialState, onSuccess);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);

            // Sync with hidden input
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

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
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                อัปโหลดไฟล์ใหม่ <span className="text-destructive">*</span>
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                            />

                            {!selectedFile ? (
                                <div
                                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${isDragging
                                        ? 'border-primary bg-primary/10'
                                        : 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <CloudUpload className="h-10 w-10 text-primary mb-4 opacity-80" />
                                    <div className="text-center space-y-1">
                                        <p className="text-sm font-medium text-foreground">
                                            คลิกเพื่อเลือกไฟล์
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            หรือลากไฟล์มาวางที่นี่
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card shadow-sm">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <FileIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-foreground pr-2">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="p-1 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {state.errors?.file && (
                                <p className="text-sm font-medium text-destructive">
                                    {state.errors.file[0]}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <div className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline" className='cursor-pointer'>ยกเลิก</Button>
                        </DrawerClose>
                        <SubmitButton
                            text="ยืนยันการอัปโหลด"
                            className='cursor-pointer font-bold'
                        />
                    </div>
                </DrawerFooter>
            </FormContainer>
        </div>
    )
}

export default UploadFileForm
