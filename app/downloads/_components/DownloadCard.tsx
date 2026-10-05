'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar, BookOpen, Link as LinkIcon, Check, Terminal } from 'lucide-react'
import MuiIconRenderer from '@/components/ui/MuiIconRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteItemById } from '@/actions/common-actions'
import { toast } from 'sonner'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import EditFileForm from '@/components/Admin/DocManagement/EditFileForm'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DownloadCardProps } from '@/types/components';
import { Item } from '@/types/models';
import SuperAdminOnly from '@/components/Auth/SuperAdminOnly';

const DownloadCard = ({ item, highlightQuery, isLatestInVersion, categoryGroupName, variant = 'hero', isSuperAdmin }: DownloadCardProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteItemById(item.id, 'file');
        setIsDeleting(false);
        if (result.success) {
            toast.success('ลบไฟล์เรียบร้อยแล้ว');
            window.location.reload();
        } else {
            toast.error(result.message || 'ลบไฟล์ไม่สำเร็จ');
        }
        setIsDeleteOpen(false);
    };

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.hash = `file-${item.id}`;
            navigator.clipboard.writeText(url.toString());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const isNew = React.useMemo(() => {
        // Safe date parser
        const getValidDate = (dateStr?: string | null) => {
            if (!dateStr) return null;
            const str = String(dateStr).trim();
            if (!str) return null;
            const formattedStr = str.includes(' ') && !str.includes('T') ? str.replace(' ', 'T') : str;
            const parsed = new Date(formattedStr);
            return isNaN(parsed.getTime()) ? null : parsed;
        };

        const createdDate = getValidDate(item.created_at) || getValidDate(item.updated_at);
        let isWithin7Days = false;

        if (createdDate) {
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - createdDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 7) {
                isWithin7Days = true;
            }
        }

        // หมวดหมู่ชุดคำสั่ง: ขึ้น NEW ถ้าอัปโหลดใน 7 วัน หรือเป็นเวอร์ชันล่าสุด
        if (categoryGroupName === 'ชุดคำสั่ง') {
            return isWithin7Days || !!isLatestInVersion;
        }

        // หมวดหมู่อื่นๆ: ใช้กฎ 7 วัน
        return isWithin7Days;
    }, [item.created_at, item.updated_at, isLatestInVersion, categoryGroupName]);

    const { link: relatedLink, textWithoutLink: cleanDescription } = React.useMemo(() => {
        if (!item.description) return { link: null, textWithoutLink: null };
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const match = item.description.match(urlRegex);
        const link = match ? match[0] : null;
        const textWithoutLink = item.description.replace(urlRegex, '').trim();
        return { link, textWithoutLink };
    }, [item.description]);

    const isManualCategory = item.category_name?.includes('คู่มือ') || categoryGroupName?.includes('คู่มือ');
    const relatedBtnText = isManualCategory ? 'ชุดคำสั่ง' : 'คู่มือ';
    const RelatedIcon = isManualCategory ? Terminal : BookOpen;

    const renderHighlightedText = (text: string | undefined | null, query?: string) => {
        if (!text) return null;
        if (!query) return text;

        const keywords = query
            .toLowerCase()
            .replace(/([a-z0-9]+)/ig, ' $1 ')
            .split(/\s+/)
            .filter(k => k.trim().length > 0);

        if (keywords.length === 0) return text;

        const escapedKeywords = keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');

        const parts = text.split(regex);

        return (
            <React.Fragment>
                {parts.map((part, i) => {
                    if (!part) return null;
                    const isMatch = keywords.some(kw => part.toLowerCase() === kw.toLowerCase());
                    return isMatch ? (
                        <mark key={i} className="bg-primary/20 text-primary font-medium rounded px-0.5">
                            {part}
                        </mark>
                    ) : part;
                })}
            </React.Fragment>
        );
    };

        const extension = item.filename.split('.').pop()?.toUpperCase() || 'FILE';
        const formattedDate = item.created_at?.split(' ')[0] || item.created_at;

        if (variant === 'compact') {
            return (
                <>
                <div id={`file-${item.id}`} className={`group flex items-center justify-between p-3 sm:p-4 bg-card border border-border/40 rounded-xl hover:border-primary/30 hover:bg-muted/20 target:bg-primary/5 target:ring-2 target:ring-primary/50 target:shadow-md transition-all duration-500 scroll-mt-24 ${item.isactive !== 1 ? 'opacity-75 bg-muted/30' : ''}`}>
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-10 h-10 shrink-0 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            {item.mui_icon ? (
                                <MuiIconRenderer iconName={item.mui_icon} iconColor={item.mui_colour} className="w-5 h-5" />
                            ) : (
                                <FileText className="w-5 h-5" />
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-medium text-[14px] text-foreground truncate group-hover:text-primary transition-colors" title={item.name || undefined}>
                                    {renderHighlightedText(item.name, highlightQuery)}
                                </h4>
                                {isNew && (
                                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 animate-pulse bg-red-500 hover:bg-red-600 shadow-sm shrink-0">
                                        NEW
                                    </Badge>
                                )}
                                {item.isactive !== 1 && isSuperAdmin && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-yellow-100 text-yellow-800 border-yellow-300 shrink-0">
                                        🔒 ร่าง
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-0.5">
                                <span className="font-medium text-primary/70">{extension}</span>
                                <span className="truncate max-w-[120px] sm:max-w-[200px]" title={item.filename}>{item.filename}</span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="w-3 h-3" />
                                    <span>{item.downloads || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                        <SuperAdminOnly>
                            <Button size="sm" variant="ghost" className="h-9 w-9 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors" onClick={() => setIsEditOpen(true)} title="แก้ไขไฟล์">
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors" onClick={() => setIsDeleteOpen(true)} title="ลบไฟล์">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </SuperAdminOnly>
                        <Button
                            onClick={handleCopyLink}
                            size="sm"
                            variant="ghost"
                            className="rounded-lg h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-colors shrink-0 text-muted-foreground"
                            title="คัดลอกลิงก์"
                        >
                            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                        </Button>
                        {relatedLink && (
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-lg h-9 px-2 sm:px-3 border-primary/20 hover:bg-primary/5 text-primary transition-colors"
                            >
                                <a href={relatedLink} target="_blank" rel="noopener noreferrer" title={`โหลด${relatedBtnText}`} className="flex items-center gap-2">
                                    <RelatedIcon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{relatedBtnText}</span>
                                </a>
                            </Button>
                        )}
                        <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="rounded-lg hover:bg-primary/10 hover:text-primary transition-colors h-9 px-2 sm:px-3"
                        >
                            <a href={`/casdu_cdm/api/proxy-download/${item.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">ดาวน์โหลด</span>
                            </a>
                        </Button>
                    </div>
                </div>
                {/* Admin Modals rendered here if compact */}
                {isSuperAdmin && (
                    <>
                        <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DrawerContent className="h-[90vh] sm:h-[85vh]">
                                <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
                                    <EditFileForm 
                                        file={{...item, resourceId: item.id, type: 'file', created: item.created_at || '', modified: item.updated_at || '', modifiedBy: ''} as unknown as Item}
                                        onSuccess={() => {
                                            setIsEditOpen(false);
                                            window.location.reload();
                                        }}
                                        onCancel={() => setIsEditOpen(false)}
                                    />
                                </div>
                            </DrawerContent>
                        </Drawer>

                        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>ยืนยันการลบไฟล์?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        คุณแน่ใจหรือไม่ที่จะลบไฟล์ &quot;{item.name}&quot;? การกระทำนี้ไม่สามารถย้อนกลับได้
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
                                    <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        {isDeleting ? 'กำลังลบ...' : 'ลบไฟล์'}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}
                </>
            );
        }

        // Default Hero Variant
        return (
            <>
            <Card
                id={`file-${item.id}`}
                className={`group border-2 border-primary/20 shadow-sm hover:shadow-md target:ring-4 target:ring-primary/50 target:shadow-xl transition-all duration-500 bg-card overflow-hidden flex flex-col sm:flex-row rounded-2xl relative scroll-mt-24 ${item.isactive !== 1 ? 'opacity-80 bg-muted/20 border-dashed' : ''}`}
            >
                {/* Highlight line on top or left */}
                <div className="absolute top-0 left-0 w-full h-1 sm:w-1 sm:h-full bg-primary" />
                
                <CardContent className="p-0 flex flex-col sm:flex-row w-full">
                    {/* Left/Top Content Area */}
                    <div className="p-6 flex-1 flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 shrink-0 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                {item.mui_icon ? (
                                    <MuiIconRenderer iconName={item.mui_icon} iconColor={item.mui_colour} className="w-7 h-7" />
                                ) : (
                                    <FileText className="w-7 h-7" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 
                                        className="font-bold text-lg sm:text-xl text-foreground line-clamp-2 break-words leading-snug group-hover:text-primary transition-colors" 
                                        title={item.name || undefined}
                                    >
                                        {renderHighlightedText(item.name, highlightQuery)}
                                    </h3>
                                </div>
                                {isNew && (
                                    <Badge variant="destructive" className="text-[10px] px-2 py-0 animate-pulse bg-red-500 hover:bg-red-600 shadow-sm mb-2">
                                        NEW
                                    </Badge>
                                )}
                                {item.isactive !== 1 && isSuperAdmin && (
                                    <Badge variant="outline" className="text-[10px] px-2 py-0 bg-yellow-100 text-yellow-800 border-yellow-300 mb-2 ml-2 shadow-sm">
                                        🔒 ฉบับร่าง (ยังไม่เผยแพร่)
                                    </Badge>
                                )}
                                {cleanDescription && (
                                    <p className="text-muted-foreground text-sm line-clamp-2 break-words leading-relaxed mt-1" title={cleanDescription}>
                                        {renderHighlightedText(cleanDescription, highlightQuery)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 border-t border-border/30">
                            {item.category_name && (
                                <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary bg-primary/5">
                                    {item.category_name}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">
                                {extension}
                            </Badge>
                            <span className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-[250px]" title={item.filename}>
                                {item.filename}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Admin Floating Actions */}
                    {isSuperAdmin && (
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-blue-700 shadow-sm" onClick={() => setIsEditOpen(true)} title="แก้ไขไฟล์">
                                <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 shadow-sm" onClick={() => setIsDeleteOpen(true)} title="ลบไฟล์">
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    )}

                    {/* Action Right/Bottom */}
                    <div className="p-6 bg-muted/10 border-t sm:border-t-0 sm:border-l border-border/40 flex flex-col items-center justify-center min-w-[200px]">
                        <div className="flex flex-col w-full gap-2">
                            <Button
                                asChild
                                size="lg"
                                className="w-full rounded-xl shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                            >
                                <a href={`/casdu_cdm/api/proxy-download/${item.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    <Download className="w-5 h-5" />
                                    <span>ดาวน์โหลดไฟล์</span>
                                </a>
                            </Button>
                            {relatedLink && (
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="w-full rounded-xl shadow-sm hover:shadow-md transition-all border-primary/20 hover:bg-primary/5 text-primary font-medium"
                                >
                                    <a href={relatedLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        <RelatedIcon className="w-5 h-5" />
                                        <span>โหลด{relatedBtnText}</span>
                                    </a>
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Download className="w-3.5 h-3.5" />
                                <span>ยอดดาวน์โหลด {item.downloads || 0} ครั้ง</span>
                            </div>
                            <Button
                                onClick={handleCopyLink}
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[10px] sm:text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                            >
                                {isCopied ? (
                                    <span className="flex items-center gap-1 text-green-500"><Check className="w-3 h-3" /> ก๊อปปี้แล้ว</span>
                                ) : (
                                    <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> แชร์ลิงก์</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isSuperAdmin && (
                <>
                    <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DrawerContent className="h-[90vh] sm:h-[85vh]">
                            <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
                                <EditFileForm 
                                    file={{...item, resourceId: item.id, type: 'file', created: item.created_at || '', modified: item.updated_at || '', modifiedBy: ''} as unknown as Item}
                                    onSuccess={() => {
                                        setIsEditOpen(false);
                                        window.location.reload();
                                    }}
                                    onCancel={() => setIsEditOpen(false)}
                                />
                            </div>
                        </DrawerContent>
                    </Drawer>

                    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>ยืนยันการลบไฟล์?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    คุณแน่ใจหรือไม่ที่จะลบไฟล์ &quot;{item.name}&quot;? การกระทำนี้ไม่สามารถย้อนกลับได้
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
                                <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    {isDeleting ? 'กำลังลบ...' : 'ลบไฟล์'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
            </>
        );
}

export default DownloadCard
