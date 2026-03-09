import React, { useEffect, useActionState, useState } from 'react';
import { updateFile, getCategories } from '@/actions/file-actions';
import FormContainer from '@/components/Form/FormContainer';
import TextAreaInput from '@/components/Form/TextAreaInput';
import { SubmitButton } from '@/components/Form/Button';
import { Button } from '@/components/ui/button';
import { Item, Category } from '@/types/models';
import { State } from '@/types/common';
import { DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import TextInput from '@/components/Form/TextInput';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ManageCategoryDialog } from './Dialogs/ManageCategoryDialog';

import { EditFileFormProps } from '@/types/components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from 'lucide-react';

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const EditFileForm = ({ file, onSuccess, onCancel }: EditFileFormProps) => {
    const [state, formAction] = useActionState(updateFile, initialState);
    const [isActive, setIsActive] = useState(file.isactive === 1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(file.category_id ? file.category_id.toString() : 'unassigned');
    const [isManageCategoryOpen, setIsManageCategoryOpen] = useState(false);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state, onSuccess]);

    const loadCategories = () => {
        getCategories().then((data) => {
            // Include active categories OR the currently selected one (in case it became inactive)
            setCategories(data.filter(c => c.isactive === 1 || c.id === file.category_id));
        }).catch(console.error);
    };

    useEffect(() => {
        loadCategories();
    }, [file.category_id]);

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
                    <input type="hidden" name="id" value={file.resourceId} />
                    {/* Pass parent ID to server action for context (to check duplicates in the same folder) */}
                    <input type="hidden" name="parent" value={file.parent || ''} />
                    {/* Preserve original name if nice name is used, or maybe backend handles it. But we must send what we edit. */}
                    {/* If we edit filename, we should likely send it as 'filename'. */}
                    <input type="hidden" name="isactive" value={isActive ? '1' : '2'} />

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

                        <div className='grid md:grid-cols-1 gap-4 mt-4'>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    หมวดหมู่เอกสาร {isActive && <span className="text-destructive">*</span>}
                                </label>
                                <div className="flex gap-2">
                                    <Select name="category_id" value={selectedCategory} onValueChange={setSelectedCategory} required={isActive}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="เลือกหมวดหมู่..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unassigned">-- ไม่ระบุ --</SelectItem>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button type="button" variant="outline" size="icon" title="จัดการหมวดหมู่" onClick={() => setIsManageCategoryOpen(true)}>
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </div>
                                {state.errors?.category_id && (
                                    <p className="text-sm font-medium text-destructive">
                                        {state.errors.category_id[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <ManageCategoryDialog
                            open={isManageCategoryOpen}
                            onOpenChange={setIsManageCategoryOpen}
                            onCategoryChanged={loadCategories}
                        />

                        <div className="flex items-center space-x-2 mt-6 px-1">
                            <Switch
                                id="isactive-mode"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                                className="data-[state=checked]:bg-green-600"
                            />
                            <Label htmlFor="isactive-mode" className="cursor-pointer font-medium">
                                {isActive ? 'สถานะ: เผยแพร่ (Active)' : 'สถานะ: ส่วนตัว (Private)'}
                            </Label>
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
