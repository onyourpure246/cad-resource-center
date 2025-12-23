'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, FolderSync, Trash2 } from "lucide-react";

import { UserActionButtonsProps } from '@/types/components';

const UserActionButtons = ({ onRefresh, selectedIds = [] }: UserActionButtonsProps) => {
    const handleDelete = () => {
        alert(`Simulating delete for ${selectedIds.length} users: ${selectedIds.join(', ')}`);
        // Here we would call bulkDeleteUsers(selectedIds)
    };

    if (selectedIds.length > 0) {
        return (
            <div className="flex gap-2 items-center">
                <Button size="default" variant="destructive" className="cursor-pointer" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> ลบ ({selectedIds.length})
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                    เลือกแล้ว {selectedIds.length} รายการ
                </span>
            </div>
        )
    }

    return (
        <div className="flex gap-2 items-center">
            <Button size="default" variant="outline" onClick={onRefresh} className="cursor-pointer">
                <FolderSync className="mr-2 h-4 w-4" /> รีเฟรช
            </Button>
            <Button size="default" className='cursor-pointer' onClick={() => { alert('Coming soon: Add User Dialog') }}>
                <UserPlus className="mr-2 h-4 w-4" /> เพิ่มผู้ใช้
            </Button>
        </div>
    );
};

export default UserActionButtons;
