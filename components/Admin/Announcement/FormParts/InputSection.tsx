import React from 'react';
import { Label } from '@/components/ui/label';
import TextInput from '@/components/Form/TextInput';
import SelectInput from '@/components/Form/SelectInput';
import ImageUpload from '@/components/Form/ImageUpload';
import { Switch } from '@/components/ui/switch';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/constants';
import { InputSectionProps } from '@/types/announcement';

export const InputSection = ({
    isCreateMode,
    isReadOnly,
    currentStatus,
    isPublished,
    isArchived,
    announcement,
    title,
    setTitle,
    category,
    setCategory,
    isUrgent,
    setIsUrgent,
    handleImageChange
}: InputSectionProps) => {
    return (
        <div>
            <div className='mb-4 flex flex-col gap-1'>
                <Label className='text-2xl'>
                    {isCreateMode ? 'สร้างประกาศใหม่' : 'แก้ไขประกาศ'}
                </Label>
                {isReadOnly && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm mt-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        สถานะ <strong>{currentStatus === 'Published' ? 'กำลังเผยแพร่' : 'จัดเก็บถาวร'}</strong> (ไม่สามารถแก้ไขได้) <br />
                        {isPublished && "กรุณากดปุ่ม 'ยกเลิกการเผยแพร่' หากต้องการแก้ไขข้อมูล"}
                        {isArchived && "กรุณากดปุ่ม 'คืนค่าเป็นฉบับร่าง' หากต้องการนำกลับมาใช้"}
                    </div>
                )}
            </div>

            <div className='mb-0 flex flex-col gap-1'>
                <div className={isReadOnly ? "opacity-50 pointer-events-none" : ""}>
                    <ImageUpload
                        name='cover_image'
                        label='รูปภาพหน้าปก'
                        defaultValue={announcement?.cover_image ? (
                            announcement.cover_image.startsWith('http') || announcement.cover_image.startsWith('blob:')
                                ? announcement.cover_image
                                : `/api/images/${announcement.cover_image}`
                        ) : null}
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className='mb-4 flex flex-col gap-1'>
                <TextInput
                    name='name'
                    type='text'
                    label='หัวข้อ'
                    placeholder='กรอกชื่อหัวข้อ'
                    defaultValue={title}
                    required={true}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isReadOnly}
                />
            </div>

            <div className='mb-4 flex flex-col gap-1'>
                <div className={`p-4 border rounded-lg flex flex-row items-center justify-between ${isReadOnly ? "opacity-50 pointer-events-none bg-muted/50" : "bg-card"}`}>
                    <div className="space-y-0.5">
                        <Label className="text-base text-destructive font-bold flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                            </span>
                            ประกาศด่วน (Urgent)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            เปิดใช้งานเพื่อแสดงป้าย &quot;ด่วน&quot; กระพริบเตะตาบนการ์ดประกาศ
                        </p>
                    </div>
                    <Switch
                        checked={isUrgent}
                        onCheckedChange={setIsUrgent}
                        disabled={isReadOnly}
                        className="data-[state=checked]:bg-destructive"
                    />
                    <input type="hidden" name="is_urgent" value={isUrgent ? 1 : 0} />
                </div>
            </div>

            <div className='mb-4 flex flex-col gap-1'>
                <div className={isReadOnly ? "opacity-50 pointer-events-none" : ""}>
                    <SelectInput
                        label='หมวดหมู่'
                        name="category"
                        defaultValue={category}
                        options={ANNOUNCEMENT_CATEGORIES}
                        onValueChange={setCategory}
                    />
                </div>
            </div>
        </div>
    );
};
