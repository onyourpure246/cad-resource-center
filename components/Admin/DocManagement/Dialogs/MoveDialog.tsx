'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Folder, Check } from "lucide-react";
import { MoveDialogProps } from '@/types/MoveDialog.types';
import { useMoveDialog } from '@/hooks/useMoveDialog';
import { FolderTree } from './FolderTree';

export const MoveDialog = ({ item, currentParentId, trigger, onMoveSuccess }: MoveDialogProps) => {
    const {
        open,
        setOpen,
        folders,
        selectedFolderId,
        setSelectedFolderId,
        isLoadingRoot,
        isMoving,
        handleToggle,
        handleMove
    } = useMoveDialog({ item, currentParentId, onMoveSuccess });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ย้ายไปที่...</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[400px]">
                    <div className="text-sm text-muted-foreground mb-4">
                        เลือกโฟลเดอร์ปลายทางสำหรับ &quot;{item.name}&quot;
                    </div>

                    <div className="flex-1 border rounded-md overflow-hidden bg-background/50">
                        {isLoadingRoot ? (
                            <div className="flex h-full items-center justify-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    <span className="text-xs">กำลังโหลด...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
                                <div className="space-y-0.5">
                                    <div
                                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${selectedFolderId === null
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'hover:bg-muted/60 text-foreground'
                                            }`}
                                        onClick={() => setSelectedFolderId(null)}
                                    >
                                        <div className="w-6 flex-shrink-0" /> {/* Spacer for chevron alignment */}
                                        <Folder className={`h-5 w-5 mr-3 ${selectedFolderId === null ? 'text-primary fill-primary/20' : 'text-muted-foreground'}`} />
                                        <span className="flex-1 text-sm">หน้าแรก (Root)</span>
                                        {selectedFolderId === null && <Check className="h-4 w-4 text-primary animate-in zoom-in spin-in-50 duration-300" />}
                                    </div>

                                    <div className="my-1 border-t border-border/50 mx-2" /> {/* Divider */}

                                    <FolderTree
                                        nodes={folders}
                                        selectedFolderId={selectedFolderId}
                                        itemId={item.resourceId}
                                        itemType={item.type}
                                        onToggle={handleToggle}
                                        onSelect={setSelectedFolderId}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)} disabled={isMoving}>ยกเลิก</Button>
                    <Button className="cursor-pointer" onClick={handleMove} disabled={isMoving || selectedFolderId === currentParentId}>
                        {isMoving ? 'กำลังย้าย...' : 'ย้าย'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
