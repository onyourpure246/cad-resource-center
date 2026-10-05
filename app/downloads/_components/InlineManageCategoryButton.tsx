'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createCategory } from '@/actions/file-actions';
import { toast } from 'sonner';
import { Card, CardHeader } from '@/components/ui/card';

export default function InlineManageCategoryButton({ defaultGroup = 'เอกสารต่างๆ' }: { defaultGroup?: string }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) return;
        setIsSubmitting(true);
        try {
            await createCategory(name, defaultGroup);
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("เพิ่มหมวดหมู่ไม่สำเร็จ");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card 
                onClick={() => setOpen(true)}
                className="border-2 border-dashed border-slate-300 shadow-none hover:shadow-sm transition-all duration-300 hover:border-primary/40 bg-transparent hover:bg-primary/5 cursor-pointer flex items-center justify-center h-full group min-h-[82px] w-full"
            >
                <div className='p-3 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300'>
                    <Plus size={24} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>สร้างหมวดหมู่ใหม่ใน &quot;{defaultGroup}&quot;</DialogTitle>
                        <DialogDescription>
                            ตั้งชื่อหมวดหมู่ใหม่ที่ต้องการให้แสดงในหน้าดาวน์โหลด
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">ชื่อหมวดหมู่</label>
                            <Input 
                                placeholder="เช่น คู่มือการใช้งาน, ประกาศ, เอกสารแบบฟอร์ม" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            ยกเลิก
                        </Button>
                        <Button onClick={handleCreate} disabled={!name.trim() || isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            บันทึก
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
