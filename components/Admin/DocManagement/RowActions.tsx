'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Download, Pencil, FolderOutput, Trash } from "lucide-react";
import { RowActionsProps } from '@/types/components';

// Dynamically import dialogs to reduce initial bundle size
const DeleteConfirmationDialog = dynamic(() =>
    import('@/components/Admin/Dialog/DeleteConfirmationDialog').then(mod => mod.DeleteConfirmationDialog)
);
const EditFolderDialog = dynamic(() =>
    import('@/components/Admin/Dialog/EditFolderDialog').then(mod => mod.EditFolderDialog)
);
const EditFileDrawer = dynamic(() =>
    import('@/components/Admin/DocManagement/EditFileDrawer').then(mod => mod.EditFileDrawer)
);
const MoveDialog = dynamic(() =>
    import('@/components/Admin/Dialog/MoveDialog').then(mod => mod.MoveDialog)
);

export const RowActions = ({ item, parentId, onRefresh }: RowActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-muted">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {item.type === 'file' && (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        {/* Download is a simple link triggers or native behavior usually, but here just a visual item if logic is handled elsewhere. 
                             Wait, the original code didn't have logic for Download item click? 
                             Ah, checking original code: it was `<DropdownMenuItem ...>...ดาวน์โหลด</DropdownMenuItem>`
                             It doesn't seem to have a click handler other than default? 
                             Actually, let's keep it as is. Users might add href later or it's just visual.
                             Wait, looking at original code: `{item.type === 'file' && <DropdownMenuItem className="cursor-pointer"><Download className="mr-1 h-2 w-2" />ดาวน์โหลด</DropdownMenuItem>}`
                             It purely does nothing? Or maybe wrapped individually?
                             I'll reproduce it exactly.
                         */}
                        <a href={item.downloadUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                            <Download className="mr-1 h-2 w-2" />ดาวน์โหลด
                        </a>
                    </DropdownMenuItem>
                )}

                {item.type === 'file' && (
                    <EditFileDrawer
                        file={item}
                        onSuccess={onRefresh}
                        trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                                <Pencil className="mr-1 h-2 w-2" />แก้ไข
                            </DropdownMenuItem>
                        }
                    />
                )}

                {item.type === 'folder' && (
                    <EditFolderDialog
                        folder={item}
                        parentId={parentId}
                        onSuccess={onRefresh}
                        trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                                <Pencil className="mr-1 h-2 w-2" />แก้ไข
                            </DropdownMenuItem>
                        }
                    />
                )}

                <MoveDialog
                    item={item}
                    currentParentId={parentId}
                    onMoveSuccess={onRefresh}
                    trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                            <FolderOutput className="mr-1 h-2 w-2" />ย้าย
                        </DropdownMenuItem>
                    }
                />

                <DeleteConfirmationDialog
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    onSuccess={onRefresh}
                    trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-destructive focus:text-destructive">
                            <Trash className="mr-1 h-2 w-2" />ลบ
                        </DropdownMenuItem>
                    }
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
