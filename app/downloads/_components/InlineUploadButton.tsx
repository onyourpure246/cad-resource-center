'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import UploadFileForm from '@/components/Admin/DocManagement/Dialogs/UploadFileForm';

export default function InlineUploadButton({ categoryId }: { categoryId?: number }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-xl font-medium">
                <Plus className="w-4 h-4" />
                อัปโหลดเอกสารที่นี่
            </Button>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="h-[90vh] sm:h-[85vh]">
                    <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
                        <UploadFileForm 
                            parentId={1} 
                            onSuccess={() => {
                                setOpen(false);
                                window.location.reload();
                            }} 
                            defaultCategory={categoryId ? categoryId.toString() : 'unassigned'}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}
