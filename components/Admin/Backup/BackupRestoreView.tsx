'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Download,
    Upload,
    Database,
    HardDrive,
    ShieldAlert,
    Loader2,
    Users,
    FileText,
    Folder,
    FileArchive
} from 'lucide-react';
import { toast } from 'sonner';
import { BackupStats } from '@/services/backup-service';
import { restoreBackupAction } from '@/actions/backup-actions';

interface BackupRestoreViewProps {
    initialStats: BackupStats | null;
}

export default function BackupRestoreView({ initialStats }: BackupRestoreViewProps) {
    const stats = initialStats;
    const [isExporting, setIsExporting] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Export Handler
    const handleExport = async () => {
        setIsExporting(true);
        const toastId = toast.loading('กำลังสร้างไฟล์สำรองข้อมูลระบบ (.ZIP)...');
        try {
            const res = await fetch('/casdu_cdm/api/backup/export', {
                method: 'GET',
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to export backup zip');
            }

            const contentDisposition = res.headers.get('Content-Disposition') || '';
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            const fileName = match ? match[1] : `backup_${new Date().toISOString().slice(0, 10)}.zip`;

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('ดาวน์โหลดไฟล์สำรองข้อมูลสำเร็จแล้ว', { id: toastId });
        } catch (error: unknown) {
            console.error('Export Error:', error);
            const errMsg = error instanceof Error ? error.message : 'ไม่สามารถดาวน์โหลดไฟล์ได้';
            toast.error('เกิดข้อผิดพลาดในการสร้างไฟล์สำรองข้อมูล', {
                id: toastId,
                description: errMsg
            });
        } finally {
            setIsExporting(false);
        }
    };

    // Handle File Drop / Select
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.name.endsWith('.zip')) {
                toast.error('ไฟล์ไม่ถูกต้อง', { description: 'รองรับเฉพาะไฟล์ .zip เท่านั้น' });
                return;
            }
            setSelectedFile(file);
        }
    };

    // Execute Restore after confirmation
    const handleExecuteRestore = async () => {
        if (!selectedFile) return;
        setIsConfirmOpen(false);
        setIsRestoring(true);
        const toastId = toast.loading('กำลังคืนค่าข้อมูลระบบจากไฟล์ ZIP... กรุณาอย่าปิดหน้านี้');

        try {
            const formData = new FormData();
            formData.append('backupFile', selectedFile);

            const res = await restoreBackupAction(formData);
            if (res.success) {
                toast.success('คืนค่าระบบสำเร็จแล้ว!', {
                    id: toastId,
                    description: 'ระบบกำลังรีโหลดเพื่ออัปเดตข้อมูลล่าสุด...'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                throw new Error(res.message);
            }
        } catch (error: unknown) {
            console.error('Restore Error:', error);
            const errMsg = error instanceof Error ? error.message : 'ไม่สามารถนำเข้าข้อมูลไฟล์ Zip ได้';
            toast.error('เกิดข้อผิดพลาดในการคืนค่าระบบ', {
                id: toastId,
                description: errMsg
            });
        } finally {
            setIsRestoring(false);
        }
    };

    return (
        <div className="space-y-6 font-kanit">
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-purple-500/20">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-purple-300 border-purple-400/40 bg-purple-500/10">
                            Super Admin Exclusive
                        </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        <Database className="w-7 h-7 text-purple-400" />
                        สำรองและคืนค่าข้อมูลระบบ (System Backup & Restore)
                    </h1>
                    <p className="text-sm text-purple-200/80">
                        รวมข้อมูลฐานข้อมูล MySQL (SQL Dump) และไฟล์เอกสารอัปโหลดทั้งหมดเป็นไฟล์ ZIP ก้อนเดียวเพื่อสำรองฉุกเฉิน
                    </p>
                </div>
            </div>

            {/* Quick System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-border/60 shadow-sm bg-card/60 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats?.userCount ?? '-'}</div>
                            <div className="text-xs text-muted-foreground">ผู้ใช้งานทั้งหมด</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm bg-card/60 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Folder className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats?.folderCount ?? '-'}</div>
                            <div className="text-xs text-muted-foreground">โฟลเดอร์ทั้งหมด</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm bg-card/60 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats?.fileCount ?? '-'}</div>
                            <div className="text-xs text-muted-foreground">ไฟล์เอกสารทั้งหมด</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm bg-card/60 backdrop-blur">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <HardDrive className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats ? `${stats.uploadsSizeMB} MB` : '-'}</div>
                            <div className="text-xs text-muted-foreground">ขนาดไฟล์อัปโหลด</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* EXPORT BACKUP CARD */}
                <Card className="border border-purple-500/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">ส่งออกข้อมูลสำรอง (Export System Backup)</CardTitle>
                                    <CardDescription>
                                        ดาวน์โหลดไฟล์ `.zip` รวม ฐานข้อมูล MySQL และไฟล์อัปโหลดทั้งหมด
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                การกดส่งออกจะทำการสร้างสแน็ปช็อตของตารางฐานข้อมูลและรวบรวมไฟล์ในคลังเอกสารเข้าด้วยกันอย่างปลอดภัย
                            </p>
                            <div className="bg-muted/40 p-4 rounded-xl space-y-2 border border-border/50 text-xs">
                                <div className="font-semibold text-foreground flex items-center gap-1.5">
                                    <FileArchive className="w-4 h-4 text-purple-500" />
                                    สิ่งที่จะถูกรวมอยู่ในไฟล์ .ZIP สำรองข้อมูล:
                                </div>
                                <ul className="list-disc list-inside space-y-1 pl-1">
                                    <li>ไฟล์ `database.sql` (โครงสร้างตารางและข้อมูลดิบทั้งหมด)</li>
                                    <li>โฟลเดอร์ `/uploads` (ไฟล์ PDF, DOCX, ZIP ฯลฯ ของจริง)</li>
                                </ul>
                            </div>
                        </CardContent>
                    </div>

                    <div className="p-6 pt-0">
                        <Button
                            onClick={handleExport}
                            disabled={isExporting || isRestoring}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all h-11 text-base font-medium"
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    กำลังสร้างไฟล์ Zip สำรองข้อมูล...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-5 w-5" />
                                    ดาวน์โหลดข้อมูลสำรอง (.ZIP)
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* RESTORE BACKUP CARD */}
                <Card className="border border-amber-500/20 shadow-md relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div>
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">นำเข้าและคืนค่าข้อมูลระบบ (Import & Restore)</CardTitle>
                                    <CardDescription>
                                        คืนสภาพฐานข้อมูลและไฟล์เอกสารจากไฟล์ `.zip` สำรองข้อมูล
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 flex items-start gap-3">
                                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">คำเตือนความปลอดภัย</h4>
                                    <p className="text-xs opacity-90 leading-relaxed">
                                        การนำเข้าไฟล์สำรองข้อมูลจะทำการ <strong>เขียนทับ (Overwrite)</strong> ฐานข้อมูลและไฟล์ในระบบปัจจุบัน ควรแน่ใจว่าไฟล์ที่นำเข้าถูกต้อง
                                    </p>
                                </div>
                            </div>

                            {/* File Dropzone */}
                            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors bg-muted/20">
                                <input
                                    type="file"
                                    accept=".zip"
                                    onChange={handleFileChange}
                                    id="backup-file-input"
                                    className="hidden"
                                    disabled={isRestoring || isExporting}
                                />
                                <label htmlFor="backup-file-input" className="cursor-pointer flex flex-col items-center space-y-2">
                                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <FileArchive className="w-6 h-6" />
                                    </div>
                                    <div className="font-medium text-foreground">
                                        {selectedFile ? selectedFile.name : 'คลิกเพื่อเลือกไฟล์สำรองข้อมูล (.ZIP)'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'รองรับเฉพาะไฟล์ .zip ที่ส่งออกจากระบบเท่านั้น'}
                                    </div>
                                </label>
                            </div>
                        </CardContent>
                    </div>

                    <div className="p-6 pt-0">
                        <Button
                            onClick={() => setIsConfirmOpen(true)}
                            disabled={!selectedFile || isRestoring || isExporting}
                            variant="destructive"
                            className="w-full h-11 text-base font-medium shadow-md"
                        >
                            {isRestoring ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    กำลังคืนค่าระบบจากไฟล์ Zip...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-5 w-5" />
                                    ยืนยันนำเข้าและคืนค่าระบบ
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

            </div>

            {/* Confirmation Alert Dialog */}
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                            <ShieldAlert className="w-5 h-5" />
                            ยืนยันการคืนค่าระบบจากไฟล์ ZIP?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2 pt-2">
                            <div>คุณกำลังจะทำการคืนค่าระบบด้วยไฟล์: <strong>{selectedFile?.name}</strong></div>
                            <div className="text-red-500 font-semibold text-xs">
                                ⚠️ การกระทำนี้จะทำการเขียนทับตารางในฐานข้อมูลและไฟล์เอกสารทั้งหมดในปัจจุบัน ข้อมูลที่ไม่ถูกสำรองไว้จะสูญหาย
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isRestoring}>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleExecuteRestore}
                            disabled={isRestoring}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isRestoring ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            ยืนยันเขียนทับและคืนค่า
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
