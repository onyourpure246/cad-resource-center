'use client';
import React, { useRef, useState, useEffect } from 'react'
import { getCategories } from '@/actions/file-actions'
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { CreateNewFormProps } from '@/types/components';
import { CloudUpload, File as FileIcon, X, Settings } from 'lucide-react';
import { Category } from '@/types/models';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ManageCategoryDialog } from './ManageCategoryDialog';
import { toast } from 'sonner';

const UploadFileForm = ({ parentId, onSuccess }: CreateNewFormProps) => {
    // We removed useFormSubmission since we need XHR to track upload progress
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('unassigned');
    const [isManageCategoryOpen, setIsManageCategoryOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Progress Tracking States
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formError, setFormError] = useState<string | null>(null);

    const loadCategories = () => {
        getCategories().then((data) => {
            setCategories(data.filter(c => c.isactive === 1));
        }).catch(console.error);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setSelectedFile(file);

            // Sync with hidden input
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);

        if (!selectedFile) {
            setFormError('กรุณาเลือกไฟล์');
            return;
        }
        if (isPublished && selectedCategory === 'unassigned') {
            setFormError('กรุณาระบุหมวดหมู่สำหรับการเผยแพร่');
            return;
        }

        const formData = new FormData(e.currentTarget);
        const fileNameLower = selectedFile.name.toLowerCase();
        
        if (fileNameLower.endsWith('.pdf')) {
            formData.append('mui_icon', 'PictureAsPdf');
            formData.append('mui_colour', '#E73E29');
        } else if (fileNameLower.endsWith('.zip') || fileNameLower.endsWith('.rar') || fileNameLower.endsWith('.7z')) {
            formData.append('mui_icon', 'FolderZip');
            formData.append('mui_colour', '#FFCE3C');
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/casdu_cdm/api/file/upload', true);

        setIsUploading(true);
        setUploadProgress(0);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            setIsUploading(false);
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        toast.success(response.message || 'อัปโหลดไฟล์สำเร็จ');
                        onSuccess();
                    } else {
                        setFormError(response.message || 'อัปโหลดล้มเหลว');
                        toast.error(response.message || 'อัปโหลดล้มเหลว');
                    }
                } catch {
                    setFormError('เกิดข้อผิดพลาดในการอ่านข้อมูลจากเซิร์ฟเวอร์');
                }
            } else {
                setFormError('อัปโหลดไม่สำเร็จ หรือ Server มีปัญหา');
                toast.error('อัปโหลดไม่สำเร็จ');
            }
        };

        xhr.onerror = () => {
            setIsUploading(false);
            setFormError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
            toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        };

        xhr.send(formData);
    };

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (uploadProgress / 100) * circumference;

    return (
        <div className="flex flex-col h-full relative">
            <DrawerHeader>
                <DrawerTitle>อัปโหลดไฟล์ใหม่</DrawerTitle>
                <DrawerDescription>
                    กรอกข้อมูลด้านล่างเพื่ออัปโหลดไฟล์ใหม่
                </DrawerDescription>
            </DrawerHeader>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 pb-4 overflow-hidden">
                <input type="hidden" name="parent" value={parentId ?? ''} />
                <div className='p-4 flex-1 overflow-y-auto relative'>
                    
                    {/* Error Alert */}
                    {formError && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 border border-destructive/20 font-medium">
                            {formError}
                        </div>
                    )}
                    
                    <div className='grid md:grid-cols-1 gap-4 mt-4'>
                        <div className="space-y-2">
                             <Label htmlFor="name">ชื่อรายการดาวน์โหลด <span className="text-destructive">*</span></Label>
                             <input type="text" id="name" name="name" required placeholder="กรอกชื่อรายการดาวน์โหลด" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                    </div>
                    
                    <div className='grid md:grid-cols-1 gap-4 mt-4'>
                        <div className="space-y-2">
                             <Label htmlFor="description">มีอะไรใหม่</Label>
                             <textarea id="description" name="description" placeholder="กรอกคำอธิบายรายการดาวน์โหลดหรือการการอัปเดต" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>
                        </div>
                    </div>

                    <div className='grid md:grid-cols-1 gap-4 mt-4'>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                หมวดหมู่เอกสาร {isPublished && <span className="text-destructive">*</span>}
                            </label>
                            <div className="flex gap-2">
                                <Select name="category_id" value={selectedCategory} onValueChange={setSelectedCategory} required={isPublished}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="เลือกหมวดหมู่..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unassigned">-- ไม่ระบุ --</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="button" variant="outline" size="icon" title="จัดการหมวดหมู่" onClick={() => setIsManageCategoryOpen(true)}>
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <ManageCategoryDialog
                        open={isManageCategoryOpen}
                        onOpenChange={setIsManageCategoryOpen}
                        onCategoryChanged={loadCategories}
                    />

                    <div className='grid md:grid-cols-1 gap-4 mt-6'>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                อัปโหลดไฟล์ใหม่ <span className="text-destructive">*</span>
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                            />

                            {!selectedFile ? (
                                <div
                                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${isDragging
                                        ? 'border-primary bg-primary/10'
                                        : 'border-primary/20 bg-primary/5 hover:bg-primary/10'
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <CloudUpload className="h-10 w-10 text-primary mb-4 opacity-80" />
                                    <div className="text-center space-y-1">
                                        <p className="text-sm font-medium text-foreground">
                                            คลิกเพื่อเลือกไฟล์
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            หรือลากไฟล์มาวางที่นี่
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card shadow-sm">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <FileIcon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-foreground pr-2">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="p-1 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                                        disabled={isUploading}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <input type="hidden" name="isactive" value={isPublished ? "1" : "2"} />
                            <Switch
                                id="publish-mode"
                                checked={isPublished}
                                onCheckedChange={setIsPublished}
                                disabled={isUploading}
                            />
                            <Label htmlFor="publish-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                เผยแพร่ทันที {isPublished ? '(สาธารณะ)' : '(ฉบับร่าง)'}
                            </Label>
                        </div>
                    </div>
                    
                    {/* Upload Overlay */}
                    {isUploading && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                            <div className="relative flex items-center justify-center">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-muted/30"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        className="text-primary transition-all duration-300 ease-out"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-primary">{uploadProgress}%</span>
                                </div>
                            </div>
                            <p className="mt-4 font-medium text-foreground">กำลังอัปโหลดไฟล์...</p>
                            <p className="text-sm text-muted-foreground px-8 text-center mt-2">กรุณารอสักครู่ ห้ามปิดหน้าต่างนี้จนกว่าการอัปโหลดจะเสร็จสิ้น</p>
                        </div>
                    )}
                </div>
                <DrawerFooter>
                    <div className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline" className='cursor-pointer' disabled={isUploading}>ยกเลิก</Button>
                        </DrawerClose>
                        <Button type="submit" disabled={isUploading} className="cursor-pointer font-bold capitalize">
                            {isUploading ? 'กำลังอัปโหลด...' : 'ยืนยันการอัปโหลด'}
                        </Button>
                    </div>
                </DrawerFooter>
            </form>
        </div>
    )
}

export default UploadFileForm
