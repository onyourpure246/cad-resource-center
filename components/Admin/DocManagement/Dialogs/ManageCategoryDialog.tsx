'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { Category } from '@/types/models';
import { getCategories, createCategory, deleteCategory, updateCategory } from '@/actions/file-actions';
import { CategoryForm } from './CategoryForm';
import { CategoryListItem } from './CategoryListItem';

interface ManageCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCategoryChanged?: () => void;
}

export function ManageCategoryDialog({ open, onOpenChange, onCategoryChanged }: ManageCategoryDialogProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data.filter((c: any) => c.isactive === 1));
        } catch (error) {
            console.error("Failed to load categories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            loadCategories();
            setEditingCategoryId(null);
        }
    }, [open]);

    const handleCreate = async (name: string, group: string) => {
        setIsSubmitting(true);
        try {
            await createCategory(name, group);
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

    const handleEditSave = async (id: number, name: string, group: string) => {
        setIsSubmitting(true);
        try {
            await updateCategory(id, name, group);
            setEditingCategoryId(null);
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

                <CategoryForm
                    isSubmitting={isSubmitting}
                    onSubmit={handleCreate}
                />

                <div className="space-y-4">
                    <h4 className="text-sm font-medium">หมวดหมู่ที่มีอยู่</h4>
                    {isLoading ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : categories.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center p-4">ไม่พบข้อมูลหมวดหมู่</p>
                    ) : (
                        <ul className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                            {categories.map((cat) => (
                                <CategoryListItem
                                    key={cat.id}
                                    category={cat}
                                    isEditing={editingCategoryId === cat.id}
                                    isSubmitting={isSubmitting}
                                    onEditStart={(c) => setEditingCategoryId(c.id)}
                                    onEditCancel={() => setEditingCategoryId(null)}
                                    onEditSave={handleEditSave}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
