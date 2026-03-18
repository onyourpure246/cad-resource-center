'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User } from '@/types/user';
import { toast } from "sonner"

interface EditUserDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    // We pass the update action as a prop or import it directly? 
    // Importing directly is fine since it's a client component using server action.
}

import { updateUser } from '@/actions/user-actions';

export const EditUserDialog = ({ user, open, onOpenChange, onSuccess }: EditUserDialogProps) => {
    // const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<string>(user?.role || 'user');
    const [status, setStatus] = useState<string>(user?.status || 'active');

    // Sync state when user changes
    React.useEffect(() => {
        if (user) {
            setRole(user.role);
            setStatus(user.status);
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const res = await updateUser(user.id, { role: role as any, status: status as any });
            if (res.success) {
                toast.success("อัปเดตผู้ใช้สำเร็จ", {
                    description: `เปลี่ยนสถานะเป็น ${status} และสิทธิ์เป็น ${role}`,
                });
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error("เกิดข้อผิดพลาด", {
                    description: res.message || "ไม่สามารถอัปเดตผู้ใช้ได้",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาด", {
                description: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>แก้ไขผู้ใช้งาน</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            ชื่อ
                        </Label>
                        <div className="col-span-3 text-sm font-medium">
                            {user?.firstname} {user?.lastname}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            สิทธิ์ (Role)
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="เลือกสิทธิ์" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User (ผู้ใช้ทั่วไป)</SelectItem>
                                <SelectItem value="editor">Editor (ผู้แก้ไข)</SelectItem>
                                <SelectItem value="admin">Admin (ผู้ดูแลระบบ)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            สถานะ
                        </Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="เลือกสถานะ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active (ใช้งานปกติ)</SelectItem>
                                <SelectItem value="inactive">Inactive (ปิดใช้งาน)</SelectItem>
                                <SelectItem value="suspended">Suspended (ระงับชั่วคราว)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>ยกเลิก</Button>
                    <Button type="submit" onClick={handleSave} disabled={isLoading}>บันทึก</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
