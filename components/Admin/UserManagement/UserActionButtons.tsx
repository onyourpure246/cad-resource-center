'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, FolderSync } from "lucide-react";

interface UserActionButtonsProps {
    onRefresh?: () => void;
}

const UserActionButtons = ({ onRefresh }: UserActionButtonsProps) => {
    return (
        <div className="flex gap-2">
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
