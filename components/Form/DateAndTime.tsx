"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateAndTimeProps } from "@/types/common"

const DateAndTime = ({
    dateName = "date",
    timeName = "time",
    dateLabel = "Date",
    timeLabel = "Time",
    dateValue,
    timeValue,
    onDateChange,
    onTimeChange,
}: DateAndTimeProps) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="flex gap-4">
            {/* --- ส่วนของ Date --- */}
            <div className="mb-2 flex flex-col gap-1"> {/* เพิ่ม flex flex-col gap-1 ให้เหมือน TextInput */}
                <Label htmlFor={dateName} className="mb-1"> {/* คง mb-1 ไว้ */}
                    {dateLabel}
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id={dateName}
                            className="w-62 justify-between font-normal"
                        >
                            {dateValue ? dateValue.toLocaleDateString() : "เลือกวันที่"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dateValue}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                onDateChange(date)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
                <input type="hidden" name={dateName} value={dateValue?.toISOString() ?? ''} />
            </div>

            {/* --- ส่วนของ Time --- */}
            <div className="mb-2 flex flex-col gap-1"> {/* แก้จาก gap-3 เป็น gap-1 และเพิ่ม mb-2 */}
                <Label htmlFor={timeName} className="px-1 mb-1"> {/* เพิ่ม mb-1 เข้าไป */}
                    {timeLabel}
                </Label>
                <Input
                    type="time"
                    id={timeName}
                    name={timeName}
                    step="1"
                    value={timeValue}
                    onChange={onTimeChange}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}

export default DateAndTime