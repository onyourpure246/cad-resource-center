'use client';

import React, { useState, useRef, ChangeEvent, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, X, Trash2, Crop as CropIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/image-utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface ImageUploadProps {
    name: string;
    label?: string;
    defaultValue?: string | null;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    aspectRatio?: number; // Prop for crop aspect ratio
}

const ImageUpload = ({
    name,
    label,
    defaultValue,
    onChange,
    className,
    required = false,
    aspectRatio = 16 / 9 // Default optimized for general covers
}: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCropping, setIsCropping] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
            setIsCropping(true); // Open cropper immediately


        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        } else {
            // Handle cancel/clear
        }

    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const saveCrop = async () => {
        if (originalImage && croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(
                    originalImage,
                    croppedAreaPixels
                );

                if (croppedImage) {
                    setPreview(croppedImage);
                    setIsCropping(false);

                    // Convert blob URL to File object

                    // For now, let's try to fetch the blob and create a file
                    const response = await fetch(croppedImage);
                    const blob = await response.blob();
                    const file = new File([blob], "cropped_image.jpg", { type: "image/jpeg" });

                    if (inputRef.current) {
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        inputRef.current.files = dataTransfer.files;

                        if (onChange) {
                            onChange({ target: inputRef.current } as unknown as ChangeEvent<HTMLInputElement>);
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    const cancelCrop = () => {
        setIsCropping(false);
        setOriginalImage(null);
        if (inputRef.current) inputRef.current.value = ''; // Reset input
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPreview(null);
        setOriginalImage(null);
        if (inputRef.current) {
            inputRef.current.value = '';
            // Trigger change event
            if (onChange) {
                // Simulate empty event
                onChange({ target: inputRef.current } as unknown as ChangeEvent<HTMLInputElement>);
            }
        }
    };

    return (
        <div className={cn("w-full mb-4", className)}>
            {label && <Label className="block mb-2 text-foreground font-medium">{label} {required && <span className="text-destructive">*</span>}</Label>}

            <div
                className={cn(
                    "relative group cursor-pointer flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed transition-all duration-300 bg-muted/30 overflow-hidden",
                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                    preview ? "border-solid border-border p-0" : ""
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
                onClick={() => !preview && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {preview ? (
                    <div className="relative w-full h-full">
                        {/* Preview Image - Centered and Contained to prevent layout shift */}
                        <div className="flex items-center justify-center w-full h-full bg-muted/20">
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-full w-auto max-w-full object-contain shadow-sm"
                            />
                        </div>

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 text-white">
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        inputRef.current?.click();
                                    }}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    เปลี่ยนรูป
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleRemove}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    ลบ
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
                        <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                            <ImageIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="font-semibold text-sm">คลิกเพื่อเลือกไฟล์</p>
                            <p className="text-xs text-muted-foreground">หรือลากมาวาง (JPG, PNG)</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Cropper Modal */}
            <Dialog open={isCropping} onOpenChange={(open) => !open && cancelCrop()}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>ปรับแต่งรูปภาพ</DialogTitle>
                        <DialogDescription>
                            จัดวางตำแหน่งและขนาดของรูปภาพตามต้องการ
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden mt-2">
                        {originalImage && (
                            <Cropper
                                image={originalImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        )}
                    </div>

                    <div className="py-4 flex items-center gap-4">
                        <Label className="min-w-[3rem]">Zoom</Label>
                        <Slider
                            defaultValue={[1]}
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value: number[]) => setZoom(value[0])}
                            className="w-full"
                        />
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={cancelCrop}>ยกเลิก</Button>
                        <Button onClick={saveCrop}>ยืนยัน</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImageUpload;
