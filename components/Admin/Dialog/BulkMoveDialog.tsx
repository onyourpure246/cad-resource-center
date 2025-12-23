'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Folder, Check } from "lucide-react";
import { FolderTree } from './FolderTree';
import { toast } from 'sonner';
import { bulkMoveItems, BulkItem } from '@/actions/bulk-actions';
import { adminGetRootFolder, adminGetFolderById } from '@/actions/folder-actions';
import { FolderNode } from '@/types/MoveDialog.types';

import { BulkMoveDialogProps } from '@/types/components';

export const BulkMoveDialog = ({ items, currentParentId, trigger, onSuccess }: BulkMoveDialogProps) => {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState<FolderNode[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(currentParentId);
    const [isLoadingRoot, setIsLoadingRoot] = useState(false);
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        if (open) {
            fetchRootFolders();
            setSelectedFolderId(currentParentId);
        }
    }, [open, currentParentId]);

    const fetchRootFolders = async () => {
        setIsLoadingRoot(true);
        try {
            const data = await adminGetRootFolder();
            // Map to FolderNode (adding missing props with defaults)
            const rootFolders: FolderNode[] = data.folders.map(f => ({
                ...f,
                children: [],
                isOpen: false,
                hasLoaded: false,
                isLoading: false
            }));
            setFolders(rootFolders);
        } catch (error) {
            console.error("Failed to fetch folders", error);
            toast.error("ไม่สามารถโหลดข้อมูลโฟลเดอร์ได้");
        } finally {
            setIsLoadingRoot(false);
        }
    };

    const updateNodeInTree = (nodes: FolderNode[], id: number, updates: Partial<FolderNode>): FolderNode[] => {
        return nodes.map(node => {
            if (node.id === id) {
                return { ...node, ...updates };
            }
            if (node.children) {
                return { ...node, children: updateNodeInTree(node.children, id, updates) };
            }
            return node;
        });
    };

    const findNode = (nodes: FolderNode[], id: number): FolderNode | undefined => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return undefined;
    };

    const handleToggle = async (folderId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        const node = findNode(folders, folderId);
        if (!node) return;

        if (node.isOpen) {
            setFolders(prev => updateNodeInTree(prev, folderId, { isOpen: false }));
        } else {
            if (node.hasLoaded) {
                setFolders(prev => updateNodeInTree(prev, folderId, { isOpen: true }));
            } else {
                setFolders(prev => updateNodeInTree(prev, folderId, { isOpen: true, isLoading: true }));
                await fetchChildren(folderId);
            }
        }
    };

    const fetchChildren = async (folderId: number) => {
        try {
            const data = await adminGetFolderById(folderId);
            const children: FolderNode[] = data.folders.map(f => ({
                ...f,
                children: [],
                isOpen: false,
                hasLoaded: false,
                isLoading: false
            }));

            setFolders(prev => updateNodeInTree(prev, folderId, {
                isOpen: true,
                isLoading: false,
                hasLoaded: true,
                children: children
            }));
        } catch (error) {
            console.error("Failed to fetch subfolders", error);
            toast.error("ไม่สามารถโหลดโฟลเดอร์ย่อยได้");
            setFolders(prev => updateNodeInTree(prev, folderId, { isLoading: false }));
        }
    };

    const handleMove = async () => {
        if (selectedFolderId === currentParentId) {
            setOpen(false);
            return;
        }

        setIsMoving(true);
        try {
            const result = await bulkMoveItems(items, selectedFolderId);
            if (result.success) {
                toast.success(result.message);
                onSuccess();
                setOpen(false);
            } else {
                toast.error(result.message);
                if (result.successCount > 0) {
                    onSuccess();
                    setOpen(false);
                }
            }
        } catch (error) {
            console.error("Move error", error);
            toast.error("เกิดข้อผิดพลาดในการย้าย");
        } finally {
            setIsMoving(false);
        }
    };

    // Helper to adapt handleToggle signature for FolderTree
    const onToggleWrapper = (folder: any, e: React.MouseEvent) => {
        handleToggle(folder.id, e);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ย้าย {items.length} รายการไปที่...</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[400px] overflow-y-auto">
                    {isLoadingRoot ? (
                        <div className="text-center text-sm text-muted-foreground">กำลังโหลด...</div>
                    ) : (
                        <div className="space-y-1">
                            <div
                                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-accent ${selectedFolderId === null ? 'bg-accent' : ''}`}
                                onClick={() => setSelectedFolderId(null)}
                            >
                                <div className="w-5 mr-1" />
                                <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="flex-1 text-sm">หน้าแรก (Root)</span>
                                {selectedFolderId === null && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <FolderTree
                                nodes={folders}
                                selectedFolderId={selectedFolderId}
                                itemId={-1} // Valid itemId required by FolderTree to disable self-selection, passing -1 as safely different from any real ID
                                onToggle={onToggleWrapper}
                                onSelect={setSelectedFolderId}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isMoving}>ยกเลิก</Button>
                    <Button onClick={handleMove} disabled={isMoving || selectedFolderId === currentParentId}>
                        {isMoving ? 'กำลังย้าย...' : 'ย้าย'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
