'use client';

import React, { useRef, useState, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderUp, Loader2, File as FileIcon, Folder, AlertCircle, CheckCircle } from "lucide-react";
import { importFolderTree } from '@/actions/import-folder-actions';
import { toast } from 'sonner';

interface ImportFolderDialogProps {
    parentId: number | null;
    onSuccess: () => void;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface TreeNode {
    name: string;
    path: string;
    type: 'file' | 'folder';
    children?: TreeNode[];
    file?: File;
}

export const ImportFolderDialog = ({ parentId, onSuccess, trigger, open: constrainedOpen, onOpenChange: setConstrainedOpen }: ImportFolderDialogProps) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const open = constrainedOpen !== undefined ? constrainedOpen : internalOpen;
    const setOpen = setConstrainedOpen || setInternalOpen;
    const [isPending, startTransition] = useTransition();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [treePreview, setTreePreview] = useState<TreeNode[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importStats, setImportStats] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setSelectedFiles(files);
            setTreePreview(buildTreePreview(files));
            setImportStats(null); // Reset stats on new selection
        }
    };

    // Helper to build a simple tree structure for preview
    const buildTreePreview = (files: File[]): TreeNode[] => {
        const root: TreeNode[] = [];

        files.forEach(file => {
            // webkitRelativePath is like "Folder/Sub/File.txt"
            const pathParts = file.webkitRelativePath.split('/');
            let currentLevel = root;

            pathParts.forEach((part, index) => {
                const isFile = index === pathParts.length - 1;
                const existingNode = currentLevel.find(node => node.name === part);

                if (existingNode) {
                    if (!isFile && existingNode.children) {
                        currentLevel = existingNode.children;
                    }
                } else {
                    const newNode: TreeNode = {
                        name: part,
                        path: pathParts.slice(0, index + 1).join('/'),
                        type: isFile ? 'file' : 'folder',
                        children: isFile ? undefined : [],
                        file: isFile ? file : undefined
                    };
                    currentLevel.push(newNode);
                    if (!isFile && newNode.children) {
                        currentLevel = newNode.children;
                    }
                }
            });
        });

        return root;
    };

    const handleImport = async () => {
        if (selectedFiles.length === 0) return;

        startTransition(async () => {
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
                formData.append('paths', file.webkitRelativePath);
            });

            const result = await importFolderTree(formData, parentId);

            if (result.success) {
                toast.success(result.message);
                setImportStats(result.stats);
                onSuccess();
                // Optionally close automatically or let user see stats
                // setOpen(false); 
            } else {
                toast.error(result.message);
            }
        });
    };

    const reset = () => {
        setSelectedFiles([]);
        setTreePreview([]);
        setImportStats(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const openChanged = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Only reset if completely closing, maybe? 
            // Or keep for next time? Better reset.
            setTimeout(reset, 300);
        }
    };

    // Recursive Tree Renderer
    const renderTree = (nodes: TreeNode[], depth = 0) => {
        return nodes.map((node) => (
            <div key={node.path} style={{ paddingLeft: `${depth * 16}px` }} className="text-sm py-1">
                <div className="flex items-center gap-2">
                    {node.type === 'folder' ? (
                        <Folder className="h-4 w-4 text-blue-500" />
                    ) : (
                        <FileIcon className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="truncate max-w-[300px]">{node.name}</span>
                </div>
                {node.children && renderTree(node.children, depth + 1)}
            </div>
        ));
    };

    return (
        <Dialog open={open} onOpenChange={openChanged}>
            {trigger ? (
                <div onClick={() => setOpen(true)}>{trigger}</div>
            ) : (
                <Button onClick={() => setOpen(true)} variant="outline">
                    <FolderUp className="mr-2 h-4 w-4" /> Import Folder
                </Button>
            )}

            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>อัปโหลดโฟลเดอร์</DialogTitle>
                    <DialogDescription>
                        เลือกโฟลเดอร์จากเครื่องของคุณ ไฟล์ทั้งหมดจะถูกนำเข้าเป็น <b>แบบร่าง</b> (ยังไม่เผยแพร่)
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden py-4">
                    {!importStats ? (
                        <>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-muted/20 hover:bg-muted/40 transition-colors">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    // @ts-ignore - directory attributes are non-standard but supported
                                    webkitdirectory=""
                                    directory=""
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <FolderUp className="h-10 w-10 text-muted-foreground mb-4" />
                                <div className="text-center space-y-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        เลือกโฟลเดอร์
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        รองรับโฟลเดอร์ซ้อนกัน
                                    </p>
                                </div>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="mt-4">
                                    <div className="px-1 py-2 text-sm font-medium flex justify-between items-center">
                                        <span>ตัวอย่าง: {selectedFiles.length} ไฟล์</span>
                                        <Button variant="ghost" size="sm" onClick={reset} className="h-auto py-1 text-xs px-2">ล้างค่า</Button>
                                    </div>
                                    <div className="h-[200px] p-4 overflow-y-auto border rounded-md">
                                        {renderTree(treePreview)}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary bg-primary/10 p-4 rounded-lg border border-primary/20">
                                <CheckCircle className="h-6 w-6" />
                                <div>
                                    <h4 className="font-semibold">นำเข้าเสร็จสมบูรณ์</h4>
                                    <p className="text-sm opacity-90">
                                        นำเข้าสำเร็จ {importStats.successFiles} อัปโหลด {importStats.totalFiles} ไฟล์
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/40 rounded border border-border text-center">
                                    <div className="text-2xl font-bold text-primary">{importStats.foldersCreated}</div>
                                    <div className="text-xs text-muted-foreground font-medium">โฟลเดอร์ที่สร้าง</div>
                                </div>
                                <div className="p-3 bg-muted/40 rounded border border-border text-center">
                                    <div className="text-2xl font-bold text-primary">{importStats.successFiles}</div>
                                    <div className="text-xs text-muted-foreground font-medium">ไฟล์ที่อัปโหลด</div>
                                </div>
                            </div>

                            {importStats.errors.length > 0 && (
                                <div className="border rounded-md border-destructive/20">
                                    <div className="bg-destructive/10 px-4 py-2 text-sm font-medium border-b border-destructive/20 text-destructive flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4" />
                                        ข้อผิดพลาด ({importStats.errors.length})
                                    </div>
                                    <div className="h-[100px] p-4 bg-destructive/5 overflow-y-auto">
                                        <ul className="space-y-1 text-xs text-destructive">
                                            {importStats.errors.map((err: string, i: number) => (
                                                <li key={i}>• {err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {!importStats ? (
                        <>
                            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                                ยกเลิก
                            </Button>
                            <Button onClick={handleImport} disabled={selectedFiles.length === 0 || isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        กำลังนำเข้า...
                                    </>
                                ) : (
                                    'เริ่มนำเข้า'
                                )}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setOpen(false)}>ปิด</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
