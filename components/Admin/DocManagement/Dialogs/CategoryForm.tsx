import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';

interface CategoryFormProps {
    isSubmitting: boolean;
    onSubmit: (name: string, group: string) => void;
}

export function CategoryForm({ isSubmitting, onSubmit }: CategoryFormProps) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryGroup, setNewCategoryGroup] = useState('เอกสารต่างๆ');

    const handleSubmit = () => {
        if (!newCategoryName.trim()) return;
        onSubmit(newCategoryName, newCategoryGroup);
        setNewCategoryName('');
        setNewCategoryGroup('เอกสารต่างๆ');
    };

    return (
        <div className="flex flex-col space-y-2 my-4">
            <div className="flex items-center space-x-2">
                <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="ชื่อหมวดหมู่ใหม่..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="flex-1"
                />
                <Select
                    value={newCategoryGroup}
                    onValueChange={(val) => setNewCategoryGroup(val)}
                    disabled={isSubmitting}
                >
                    <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="เลือกกลุ่ม..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="เอกสารต่างๆ">เอกสารต่างๆ</SelectItem>
                        <SelectItem value="ชุดคำสั่ง">ชุดคำสั่ง</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="button" onClick={handleSubmit} disabled={!newCategoryName.trim() || isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    <span className="ml-2">เพิ่ม</span>
                </Button>
            </div>
        </div>
    );
}
