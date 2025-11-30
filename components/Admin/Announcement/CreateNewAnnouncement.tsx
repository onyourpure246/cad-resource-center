'use client'
import { createAnnouncement } from '@/actions/actions'
import { SubmitButton } from '@/components/Form/Button'
import DateAndTime from '@/components/Form/DateAndTime'
import FormContainer from '@/components/Form/FormContainer'
import TextAreaInput from '@/components/Form/TextAreaInput'
import TextInput from '@/components/Form/TextInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { State } from '@/types/common'
import React, { useActionState, useState } from 'react'
import { Label } from '@/components/ui/label';

const initialState: State = {
    success: false,
    message: '',
    errors: {}
};

const CreateNewAnnouncement = ({ className }: { className?: string }) => {
    // action function
    const [state, formAction] = useActionState(createAnnouncement, initialState);
    const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
    const [scheduleTime, setScheduleTime] = useState<string>("10:30:00");

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleTime(event.target.value);
    };


    return (
        <div className={`w-[1320px] mx-auto ${className}`}>
            <FormContainer action={formAction} state={state}>
                {/* <input type="hidden" name="parent" value={parentId ?? ''} /> */}
                <div className='mt-4'>
                    <div className='grid grid-cols-2 gap-12'>
                        {/* Column 1 */}
                        <div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='text-2xl'>รายละเอียดประกาศ</Label>
                            </div>

                            <div className='mb-4 flex flex-col gap-1'>
                                <TextInput
                                    name='name'
                                    type='text'
                                    label='หัวข้อ'
                                    placeholder='กรอกชื่อหัวข้อ'
                                    required={true}
                                // errorMessage={state.errors?.name?.[0]}
                                />
                            </div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <TextAreaInput
                                    name='messages'
                                    label='ข้อความ'
                                    placeholder=''
                                />
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <Label className='text-2xl'>ตั้งค่าการนำส่ง</Label>
                            </div>
                            <div className='mb-4 flex flex-col gap-1'>
                                <DateAndTime
                                    dateName="scheduleDate"
                                    timeName="scheduleTime"
                                    dateLabel="วันที่นำส่ง"
                                    timeLabel="เวลานำส่ง"
                                    dateValue={scheduleDate}
                                    timeValue={scheduleTime}
                                    onDateChange={setScheduleDate}
                                    onTimeChange={handleTimeChange}
                                />
                                <input type="hidden" name="scheduleDate" value={scheduleDate?.toISOString() ?? ""} />
                                <input type="hidden" name="scheduleTime" value={scheduleTime} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-8">
                        <Link href="/admin/announcement">
                            <Button variant="outline" type="button" className='cursor-pointer'>ยกเลิก</Button>
                        </Link>
                        <SubmitButton text="บันทึกฉบับร่าง" className='font-bold cursor-pointer' />
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default CreateNewAnnouncement