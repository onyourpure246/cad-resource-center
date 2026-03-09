'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Loader2, Edit2, Check, X } from 'lucide-react';
import { Category } from '@/types/models';
import { getCategories, createCategory, deleteCategory, updateCategory } from '@/actions/file-actions';

interface ManageCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCategoryChanged?: () => void;
}

export function ManageCategoryDialog({ open, onOpenChange, onCategoryChanged }: ManageCategoryDialogProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data.filter(c => c.isactive === 1));
        } catch (error) {
            console.error("Failed to load categories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            loadCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleCreate = async () => {
        if (!newCategoryName.trim()) return;
        setIsSubmitting(true);
        try {
            await createCategory(newCategoryName);
            setNewCategoryName('');
            await loadCategories();
            if (onCategoryChanged) onCategoryChanged();
        } catch (error) {
            console.error("Failed to create category", error);
            alert("เพิ่มหมวดหมู่ไม่สำเร็จ");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("ต้องการลบหมวดหมู่นี้ใช่หรือไม่?")) return;
        setIsSubmitting(true);
        try {
            await deleteCategory(id);
            await loadCategories();
            if (onCategoryChanged) onCategoryChanged();
        } catch (error) {
            console.error("Failed to delete category", error);
            alert("ลบหมวดหมู่ไม่สำเร็จ");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSave = async (id: number) => {
        if (!editingCategoryName.trim()) return;
        setIsSubmitting(true);
        try {
            await updateCategory(id, editingCategoryName);
            setEditingCategoryId(null);
            setEditingCategoryName('');
            await loadCategories();
            if (onCategoryChanged) onCategoryChanged();
        } catch (error) {
            console.error("Failed to update category", error);
            alert("ประเมินผลหมวดหมู่ไม่สำเร็จ");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>จัดการหมวดหมู่</DialogTitle>
                    <DialogDescription>
                        เพิ่มหรือลบหมวดหมู่สำหรับเอกสาร
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 my-4">
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="ชื่อหมวดหมู่ใหม่..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreate();
                        }}
                        disabled={isSubmitting}
                    />
                    <Button type="button" onClick={handleCreate} disabled={!newCategoryName.trim() || isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        <span className="ml-2">เพิ่ม</span>
                    </Button>
                </div>
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">หมวดหมู่ที่มีอยู่</h4>
                    {isLoading ? (
                        <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
                    ) : categories.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center p-4">ไม่พบข้อมูลหมวดหมู่</p>
                    ) : (
                        <ul className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                            {categories.map((cat) => (
                                <li key={cat.id} className="flex items-center justify-between p-2 border rounded-md">
                                    {editingCategoryId === cat.id ? (
                                        <div className="flex w-full items-center gap-2">
                                            <Input
                                                value={editingCategoryName}
                                                onChange={(e) => setEditingCategoryName(e.target.value)}
                                                className="h-8"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleEditSave(cat.id);
                                                    if (e.key === 'Escape') setEditingCategoryId(null);
                                                }}
                                                disabled={isSubmitting}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEditSave(cat.id)}
                                                disabled={isSubmitting || !editingCategoryName.trim()}
                                                className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 w-8"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setEditingCategoryId(null)}
                                                disabled={isSubmitting}
                                                className="text-muted-foreground hover:bg-muted h-8 w-8"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-sm">{cat.name}</span>
                                            <div className="flex items-center">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditingCategoryId(cat.id);
                                                        setEditingCategoryName(cat.name);
                                                    }}
                                                    disabled={isSubmitting}
                                                    className="text-muted-foreground hover:bg-muted h-8 w-8"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(cat.id)}
                                                    disabled={isSubmitting}
                                                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
