import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Category } from '@/types/models';

interface CategoryListItemProps {
    category: Category;
    isEditing: boolean;
    isSubmitting: boolean;
    onEditStart: (category: Category) => void;
    onEditCancel: () => void;
    onEditSave: (id: number, name: string, group: string) => void;
    onDelete: (id: number) => void;
}

export function CategoryListItem({
    category,
    isEditing,
    isSubmitting,
    onEditStart,
    onEditCancel,
    onEditSave,
    onDelete
}: CategoryListItemProps) {
    const [editingCategoryName, setEditingCategoryName] = useState(category.name);
    const [editingCategoryGroup, setEditingCategoryGroup] = useState((category as any).group_name || 'เอกสารต่างๆ');

    // Sync state when entering edit mode, just in case
    React.useEffect(() => {
        if (isEditing) {
            setEditingCategoryName(category.name);
            setEditingCategoryGroup((category as any).group_name || 'เอกสารต่างๆ');
        }
    }, [isEditing, category]);


    if (isEditing) {
        return (
            <li className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex w-full items-center gap-2">
                    <Input
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="h-8 flex-1"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onEditSave(category.id, editingCategoryName, editingCategoryGroup);
                            if (e.key === 'Escape') onEditCancel();
                        }}
                        disabled={isSubmitting}
                    />
                    <Select
                        value={editingCategoryGroup}
                        onValueChange={(val) => setEditingCategoryGroup(val)}
                        disabled={isSubmitting}
                    >
                        <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue placeholder="เลือกกลุ่ม..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="เอกสารต่างๆ">เอกสารต่างๆ</SelectItem>
                            <SelectItem value="ชุดคำสั่ง">ชุดคำสั่ง</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditSave(category.id, editingCategoryName, editingCategoryGroup)}
                        disabled={isSubmitting || !editingCategoryName.trim()}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 h-8 w-8"
                    >
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onEditCancel}
                        disabled={isSubmitting}
                        className="text-muted-foreground hover:bg-muted h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </li>
        );
    }

    return (
        <li className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{category.name}</span>
                        {(category as any).group_name && (
                            <span className="text-xs text-muted-foreground">{(category as any).group_name}</span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditStart(category)}
                            disabled={isSubmitting}
                            className="text-muted-foreground hover:bg-muted h-8 w-8"
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(category.id)}
                            disabled={isSubmitting}
                            className="text-destructive hover:bg-destructive/10 h-8 w-8"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    );
}
