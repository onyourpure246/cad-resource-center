'use client';

import { createAnnouncement, updateAnnouncement } from '@/actions/announcement-actions'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState, useEffect, useRef, useMemo } from 'react'
import { AnnouncementFormProps, AnnouncementFormState, AnnouncementStatus } from '@/types/announcement';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Image as ImageIcon, Type, Minus, Settings, Save, Send, AlertCircle, Calendar, ArrowUp, ArrowDown, Trash2, Layout, Columns, LayoutGrid, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

// Import Quill styles
import 'react-quill-new/dist/quill.bubble.css';

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

const initialState: AnnouncementFormState = {
    success: false,
    message: '',
    errors: {},
    targetStatus: undefined,
    timestamp: undefined
};

interface BlockSection {
    id: string;
    type: 'text' | 'image' | 'divider' | 'layout-1' | 'layout-2' | 'layout-3';
    data: {
        html?: string;
        url?: string;
        caption?: string;
        col1?: { url?: string; html?: string };
        col2?: { url?: string; html?: string };
        col3?: { url?: string; html?: string };
    };
    background: 'default' | 'muted' | 'primary';
}

export default function AnnouncementForm({ announcement, className }: AnnouncementFormProps) {
    const isEditMode = !!announcement;
    const isCreateMode = !isEditMode;
    const currentStatus: AnnouncementStatus = announcement?.status || 'Draft';
    const router = useRouter();

    // Deserialize database HTML into structural sections
    const initialSections = useMemo(() => {
        const html = announcement?.content || '';
        if (!html) {
            return [{
                id: 'sec-initial',
                type: 'text' as const,
                data: { html: '' },
                background: 'default' as const
            }];
        }

        if (html.includes('class="announcement-section')) {
            if (typeof window !== 'undefined') {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const sectionElements = doc.querySelectorAll('section.announcement-section');
                    if (sectionElements.length > 0) {
                        const parsed: BlockSection[] = [];
                        sectionElements.forEach((el, index) => {
                            let type: BlockSection['type'] = 'text';
                            let data: BlockSection['data'] = {};
                            let background: BlockSection['background'] = 'default';

                            if (el.classList.contains('bg-muted/50')) background = 'muted';
                            if (el.classList.contains('bg-primary/10')) background = 'primary';

                            const isDivider = el.querySelector('hr');
                            const isGrid = el.querySelector('.grid');
                            const isImageOnly = el.querySelector('.image-only-block');

                            if (isDivider) {
                                type = 'divider';
                            } else if (isGrid) {
                                const cols = el.querySelectorAll('.grid > div');
                                if (cols.length === 2) {
                                    const isLayout1 = cols[0].querySelector('img') && !cols[0].querySelector('.col-text');
                                    if (isLayout1) {
                                        type = 'layout-1';
                                        data = {
                                            col1: {
                                                url: cols[0].querySelector('img')?.getAttribute('src') || undefined,
                                                html: cols[1].querySelector('.col-text')?.innerHTML || undefined
                                            }
                                        };
                                    } else {
                                        type = 'layout-2';
                                        data = {
                                            col1: {
                                                url: cols[0].querySelector('img')?.getAttribute('src') || undefined,
                                                html: cols[0].querySelector('.col-text')?.innerHTML || undefined
                                            },
                                            col2: {
                                                url: cols[1].querySelector('img')?.getAttribute('src') || undefined,
                                                html: cols[1].querySelector('.col-text')?.innerHTML || undefined
                                            }
                                        };
                                    }
                                } else if (cols.length === 3) {
                                    type = 'layout-3';
                                    data = {
                                        col1: {
                                            url: cols[0].querySelector('img')?.getAttribute('src') || undefined,
                                            html: cols[0].querySelector('.col-text')?.innerHTML || undefined
                                        },
                                        col2: {
                                            url: cols[1].querySelector('img')?.getAttribute('src') || undefined,
                                            html: cols[1].querySelector('.col-text')?.innerHTML || undefined
                                        },
                                        col3: {
                                            url: cols[2].querySelector('img')?.getAttribute('src') || undefined,
                                            html: cols[2].querySelector('.col-text')?.innerHTML || undefined
                                        }
                                    };
                                }
                            } else if (isImageOnly) {
                                type = 'image';
                                data = {
                                    url: el.querySelector('img')?.getAttribute('src') || undefined,
                                    caption: el.querySelector('.image-caption')?.textContent || undefined
                                };
                            } else {
                                type = 'text';
                                data = {
                                    html: el.querySelector('.text-block-content')?.innerHTML || el.innerHTML
                                };
                            }

                            parsed.push({
                                id: `sec-${index}-${Math.random().toString(36).substr(2, 9)}`,
                                type,
                                data,
                                background
                            });
                        });
                        return parsed;
                    }
                } catch (e) {
                    console.error("Failed to parse existing HTML, falling back to full text block", e);
                }
            }
        }

        return [{
            id: 'sec-initial',
            type: 'text' as const,
            data: { html },
            background: 'default' as const
        }];
    }, [announcement]);

    const [sections, setSections] = useState<BlockSection[]>(initialSections);

    // Cover photo adjustments
    const [coverHeight, setCoverHeight] = useState<number>(240);
    const [coverPosition, setCoverPosition] = useState<number>(50); // percentage (0 to 100)

    // Parse cover adjustments from existing content HTML on mount
    useEffect(() => {
        const html = announcement?.content || '';
        if (html.includes('id="announcement-cover-settings"')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const settingsEl = doc.querySelector('#announcement-cover-settings');
                if (settingsEl) {
                    const h = settingsEl.getAttribute('data-height');
                    const p = settingsEl.getAttribute('data-position');
                    if (h) setCoverHeight(Number(h));
                    if (p) setCoverPosition(Number(p));
                }
            } catch (e) {
                console.error("Failed to parse cover settings", e);
            }
        }
    }, [announcement]);

    // Serialize current block state back to standard database HTML
    const serializedHTML = useMemo(() => {
        const sectionsHTML = sections.map(sec => {
            let bgClass = '';
            if (sec.background === 'muted') bgClass = 'bg-muted/50 p-6 rounded-lg';
            if (sec.background === 'primary') bgClass = 'bg-primary/10 p-6 rounded-lg';

            let innerHTML = '';
            switch (sec.type) {
                case 'text':
                    innerHTML = `<div class="text-block-content">${sec.data.html || ''}</div>`;
                    break;
                case 'image':
                    innerHTML = `
                        <div class="flex flex-col items-center my-4 image-only-block">
                            ${sec.data.url ? `<img src="${sec.data.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm" alt="Image" />` : ''}
                            ${sec.data.caption ? `<p class="text-sm text-muted-foreground mt-2 image-caption">${sec.data.caption}</p>` : ''}
                        </div>
                    `;
                    break;
                case 'divider':
                    innerHTML = `<hr class="my-6 border-t border-border" />`;
                    break;
                case 'layout-1':
                    innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-6">
                            <div class="flex justify-center">
                                ${sec.data.col1?.url ? `<img src="${sec.data.col1.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm" alt="Layout Image" />` : ''}
                            </div>
                            <div class="col-text">
                                ${sec.data.col1?.html || ''}
                            </div>
                        </div>
                    `;
                    break;
                case 'layout-2':
                    innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <div class="flex flex-col items-center">
                                ${sec.data.col1?.url ? `<img src="${sec.data.col1.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-3" alt="Image 1" />` : ''}
                                <div class="w-full col-text">${sec.data.col1?.html || ''}</div>
                            </div>
                            <div class="flex flex-col items-center">
                                ${sec.data.col2?.url ? `<img src="${sec.data.col2.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-3" alt="Image 2" />` : ''}
                                <div class="w-full col-text">${sec.data.col2?.html || ''}</div>
                            </div>
                        </div>
                    `;
                    break;
                case 'layout-3':
                    innerHTML = `
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                            <div class="flex flex-col items-center">
                                ${sec.data.col1?.url ? `<img src="${sec.data.col1.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-2" alt="Image 1" />` : ''}
                                <div class="w-full col-text text-sm">${sec.data.col1?.html || ''}</div>
                            </div>
                            <div class="flex flex-col items-center">
                                ${sec.data.col2?.url ? `<img src="${sec.data.col2.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-2" alt="Image 2" />` : ''}
                                <div class="w-full col-text text-sm">${sec.data.col2?.html || ''}</div>
                            </div>
                            <div class="flex flex-col items-center">
                                ${sec.data.col3?.url ? `<img src="${sec.data.col3.url}" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-2" alt="Image 3" />` : ''}
                                <div class="w-full col-text text-sm">${sec.data.col3?.html || ''}</div>
                            </div>
                        </div>
                    `;
                    break;
            }

            return `<section class="announcement-section ${bgClass} my-4">${innerHTML}</section>`;
        }).join('\n');

        // Append cover image settings div
        const settingsDiv = `<div id="announcement-cover-settings" data-height="${coverHeight}" data-position="${coverPosition}" style="display:none;"></div>`;
        return sectionsHTML + '\n' + settingsDiv;
    }, [sections, coverHeight, coverPosition]);

    const handleAction = async (prevState: AnnouncementFormState, formData: FormData): Promise<AnnouncementFormState> => {
        setIsSubmitting(true);
        const targetStatus = formData.get('status') as string;
        let result;

        // Populate messages with serialized blocks HTML
        formData.set('messages', serializedHTML);

        if (isEditMode && announcement) {
            result = await updateAnnouncement(Number(announcement.id), formData);
        } else {
            result = await createAnnouncement(prevState, formData);
        }

        return { ...result, targetStatus, timestamp: Date.now() };
    };

    const [state, formAction] = useActionState(handleAction, initialState);

    useEffect(() => {
        if (state.success) {
            router.push('/admin/announcement');
        }
    }, [state.success, router]);

    // Metadata States
    const [title, setTitle] = useState<string>(announcement?.title || '');
    const [category, setCategory] = useState<string>(announcement?.category || 'ประชาสัมพันธ์');
    const [isUrgent, setIsUrgent] = useState<boolean>(Boolean(announcement?.is_urgent === 1 || announcement?.is_urgent === true));
    const [previewImage, setPreviewImage] = useState<string | null>(announcement?.cover_image ? `/casdu_cdm/api/images/${announcement.cover_image}` : null);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    // Navigation confirmation states
    const [isConfirmExitOpen, setIsConfirmExitOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Initial Cover Height & Position parsing for dirty comparison
    const initialCoverHeight = useMemo(() => {
        const html = announcement?.content || '';
        if (html.includes('id="announcement-cover-settings"')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const settingsEl = doc.querySelector('#announcement-cover-settings');
                if (settingsEl) {
                    const h = settingsEl.getAttribute('data-height');
                    if (h) return Number(h);
                }
            } catch (e) {}
        }
        return 240;
    }, [announcement]);

    const initialCoverPosition = useMemo(() => {
        const html = announcement?.content || '';
        if (html.includes('id="announcement-cover-settings"')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const settingsEl = doc.querySelector('#announcement-cover-settings');
                if (settingsEl) {
                    const p = settingsEl.getAttribute('data-position');
                    if (p) return Number(p);
                }
            } catch (e) {}
        }
        return 50;
    }, [announcement]);

    // Form dirtiness calculation
    const isDirty = useMemo(() => {
        const titleChanged = title !== (announcement?.title || '');
        const categoryChanged = category !== (announcement?.category || 'ประชาสัมพันธ์');
        const urgentChanged = isUrgent !== Boolean(announcement?.is_urgent === 1 || announcement?.is_urgent === true);
        
        const initialCover = announcement?.cover_image ? `/casdu_cdm/api/images/${announcement.cover_image}` : null;
        const coverChanged = previewImage !== initialCover;

        const heightChanged = coverHeight !== initialCoverHeight;
        const positionChanged = coverPosition !== initialCoverPosition;

        const sectionsChanged = JSON.stringify(sections) !== JSON.stringify(initialSections);

        return titleChanged || categoryChanged || urgentChanged || coverChanged || heightChanged || positionChanged || sectionsChanged;
    }, [title, category, isUrgent, previewImage, coverHeight, coverPosition, sections, initialSections, initialCoverHeight, initialCoverPosition, announcement]);

    // Intercept window unload/refresh when form is dirty
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty && !isSubmitting) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty, isSubmitting]);

    // Intercept browser back/forward buttons when form is dirty
    useEffect(() => {
        if (!isDirty || isSubmitting) return;

        // Push an extra history entry to act as a lock
        window.history.pushState(null, '', window.location.href);

        const handlePopState = (e: PopStateEvent) => {
            setIsConfirmExitOpen(true);
            window.history.pushState(null, '', window.location.href);
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isDirty, isSubmitting]);

    const handleDiscardAndExit = () => {
        setIsSubmitting(true);
        setIsConfirmExitOpen(false);
        router.push('/admin/announcement');
    };

    const handleSaveAsDraftAndExit = () => {
        setIsSubmitting(true);
        setIsConfirmExitOpen(false);
        draftBtnRef.current?.click();
    };

    const coverInputRef = useRef<HTMLInputElement>(null);
    const draftBtnRef = useRef<HTMLButtonElement>(null);
    const publishBtnRef = useRef<HTMLButtonElement>(null);

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // --- Block Manipulation ---
    const addSection = (type: BlockSection['type']) => {
        let defaultData: BlockSection['data'] = {};
        if (type === 'text') defaultData = { html: '' };
        if (type === 'image') defaultData = { url: '', caption: '' };
        if (type === 'layout-1') defaultData = { col1: { url: '', html: '' } };
        if (type === 'layout-2') defaultData = { col1: { url: '', html: '' }, col2: { url: '', html: '' } };
        if (type === 'layout-3') defaultData = { col1: { url: '', html: '' }, col2: { url: '', html: '' }, col3: { url: '', html: '' } };

        const newSec: BlockSection = {
            id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            data: defaultData,
            background: 'default'
        };
        setSections(prev => [...prev, newSec]);
    };

    const deleteSection = (id: string) => {
        setSections(prev => prev.filter(s => s.id !== id));
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const nextIndex = direction === 'up' ? index - 1 : index + 1;
        if (nextIndex < 0 || nextIndex >= sections.length) return;

        setSections(prev => {
            const updated = [...prev];
            const temp = updated[index];
            updated[index] = updated[nextIndex];
            updated[nextIndex] = temp;
            return updated;
        });
    };

    const toggleSectionBg = (id: string) => {
        setSections(prev => prev.map(s => {
            if (s.id !== id) return s;
            const bgs: BlockSection['background'][] = ['default', 'muted', 'primary'];
            const currentIdx = bgs.indexOf(s.background);
            const nextBg = bgs[(currentIdx + 1) % bgs.length];
            return { ...s, background: nextBg };
        }));
    };

    const updateBlockData = (id: string, updateFn: (data: BlockSection['data']) => BlockSection['data']) => {
        setSections(prev => prev.map(s => {
            if (s.id !== id) return s;
            return { ...s, data: updateFn(s.data) };
        }));
    };

    // Client-side image upload handler
    const uploadImageFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/casdu_cdm/api/upload', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || 'Failed to upload image');
        }
        const data = await response.json();
        let url = data.url;
        if (url && !url.startsWith('/casdu_cdm')) {
            url = `/casdu_cdm${url}`;
        }
        return url;
    };

    const handleImageSelect = (id: string, colKey?: 'col1' | 'col2' | 'col3') => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
                const uploadedUrl = await uploadImageFile(file);
                updateBlockData(id, (prev) => {
                    if (colKey) {
                        return {
                            ...prev,
                            [colKey]: {
                                ...prev[colKey],
                                url: uploadedUrl
                            }
                        };
                    }
                    return { ...prev, url: uploadedUrl };
                });
            } catch (e) {
                const errMsg = e instanceof Error ? e.message : String(e);
                alert(errMsg || "อัปโหลดภาพล้มเหลว");
            }
        };
    };

    // Dynamic Quill bubble module definition
    const inlineModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ]
    };

    return (
        <form action={formAction} className="w-full min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-900/30">
            {/* Hidden submit inputs */}
            <button type="submit" ref={draftBtnRef} name="status" value="Draft" className="hidden" />
            <button type="submit" ref={publishBtnRef} name="status" value="Published" className="hidden" />

            {/* STICKY TOP BAR */}
            <div className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border py-3 px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            if (isDirty) {
                                setIsConfirmExitOpen(true);
                            } else {
                                router.push('/admin/announcement');
                            }
                        }}
                        className="rounded-lg gap-1.5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">กลับไปยังรายการ</span>
                    </Button>
                    <div className="h-4 w-px bg-border hidden sm:block" />
                    <h1 className="text-md font-bold text-foreground">
                        {isCreateMode ? 'สร้างประกาศใหม่' : 'แก้ไขประกาศ'}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => draftBtnRef.current?.click()}
                        className="flex items-center gap-1.5 h-9 rounded-lg px-4"
                    >
                        <Save className="w-4 h-4 text-muted-foreground" />
                        <span>บันทึกฉบับร่าง</span>
                    </Button>

                    <Button
                        type="button"
                        onClick={() => publishBtnRef.current?.click()}
                        className="flex items-center gap-1.5 h-9 rounded-lg px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                        <Send className="w-4 h-4" />
                        <span>{isCreateMode ? 'สร้างและเผยแพร่' : 'บันทึกเผยแพร่'}</span>
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSettingsOpen(true)}
                        className="rounded-lg h-9 w-9 border"
                        title="ตั้งค่าประกาศ"
                    >
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {state.message && (
                <div className="max-w-[1200px] w-full mx-auto px-4 mt-4">
                    <div className={`p-4 rounded-xl text-sm border flex items-center gap-2 ${state.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-800/30 dark:text-emerald-400'
                        : 'bg-destructive/5 border-destructive/10 text-destructive'
                        }`}>
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{state.message}</span>
                    </div>
                </div>
            )}

            {/* CANVAS AREA (Center) */}
            <div className="flex-grow w-full max-w-[1200px] mx-auto flex flex-col items-center pb-32 pt-6 px-4">

                {/* The Canvas paper wrapper */}
                <div className="w-full bg-background border border-border shadow-sm rounded-2xl min-h-[800px] flex flex-col">

                    {/* Banner cover */}
                    <div
                        className="w-full bg-muted/20 relative group flex items-center justify-center border-b border-border/50 rounded-t-2xl overflow-hidden transition-all duration-200"
                        style={{ height: previewImage ? `${coverHeight}px` : '240px' }}
                    >
                        {previewImage ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={previewImage}
                                    alt="Cover"
                                    className="w-full h-full object-cover select-none pointer-events-none"
                                    style={{ objectPosition: `center ${coverPosition}%` }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                                    <Button type="button" variant="secondary" onClick={() => coverInputRef.current?.click()}>เปลี่ยนปก</Button>
                                    <Button type="button" variant="destructive" onClick={() => setPreviewImage(null)}>ลบปก</Button>
                                </div>

                                {/* Floating Banner Adjuster Overlay */}
                                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md border border-border p-3.5 rounded-2xl shadow-lg z-20 flex flex-col gap-2.5 min-w-[220px] opacity-90 hover:opacity-100 transition-all select-none">
                                    <div className="text-[11px] font-bold text-foreground flex items-center gap-1">
                                        <span>⚙️ ตั้งค่าสัดส่วนรูปภาพปก</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase">
                                            <span>ความสูง</span>
                                            <span className="font-mono">{coverHeight}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="160"
                                            max="450"
                                            value={coverHeight}
                                            onChange={(e) => setCoverHeight(Number(e.target.value))}
                                            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase">
                                            <span>เลื่อนภาพ ขึ้น-ลง</span>
                                            <span className="font-mono">{coverPosition}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={coverPosition}
                                            onChange={(e) => setCoverPosition(Number(e.target.value))}
                                            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Button type="button" variant="ghost" onClick={() => coverInputRef.current?.click()} className="text-muted-foreground hover:bg-muted/30">
                                <ImageIcon className="w-5 h-5 mr-2" />
                                เพิ่มรูปภาพหน้าปก (Cover Banner)
                            </Button>
                        )}
                        <input type="file" ref={coverInputRef} name="cover_image" className="hidden" accept="image/*" onChange={handleCoverChange} />
                        <input type="hidden" name="remove_cover_image" value={!previewImage && !!announcement?.cover_image ? "true" : "false"} />
                    </div>

                    {/* Banner Title */}
                    <div className="px-12 pt-10 pb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="พิมพ์หัวเรื่องที่นี่..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full text-4xl font-extrabold border-none outline-none focus:ring-0 bg-transparent placeholder:text-muted-foreground/30 text-foreground"
                        />
                        {state.errors?.name && <p className="text-red-500 text-sm mt-2">{state.errors.name}</p>}
                    </div>

                    {/* Page Content Rows (The Sections) */}
                    <div className="flex-grow px-12 pb-20 space-y-4">
                        {sections.map((sec, index) => (
                            <div
                                key={sec.id}
                                className={`relative group border border-dashed border-transparent hover:border-border/80 rounded-lg transition-all before:absolute before:-left-14 before:w-14 before:inset-y-0 before:content-[""] before:pointer-events-auto ${sec.background === 'muted' ? 'bg-muted/40 p-4' :
                                    sec.background === 'primary' ? 'bg-primary/5 p-4' : ''
                                    }`}
                            >
                                {/* Section Controller (Float on left of row on hover) */}
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex-col gap-1 hidden group-hover:flex bg-background border border-border rounded-md shadow-sm p-1 z-10">
                                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'up')} disabled={index === 0}>
                                        <ArrowUp className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1}>
                                        <ArrowDown className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 hover:bg-amber-100 hover:text-amber-800" onClick={() => toggleSectionBg(sec.id)} title="เปลี่ยนสีพื้นหลังบล็อก">
                                        <div className="w-3.5 h-3.5 rounded-full border border-black/20 bg-gradient-to-r from-red-200 to-blue-200" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => deleteSection(sec.id)} title="ลบบล็อก">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>

                                {/* BLOCK RENDERERS */}
                                {sec.type === 'text' && (
                                    <div className="min-h-[40px] py-1">
                                        <ReactQuill
                                            forwardedRef={null}
                                            theme="bubble"
                                            value={sec.data.html || ''}
                                            onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, html }))}
                                            modules={inlineModules}
                                            placeholder="พิมพ์ข้อความตรงนี้..."
                                            className="text-base leading-relaxed inline-quill-editor"
                                        />
                                    </div>
                                )}

                                {sec.type === 'divider' && (
                                    <div className="py-4">
                                        <hr className="border-t border-border" />
                                    </div>
                                )}

                                {sec.type === 'image' && (
                                    <div className="flex flex-col items-center py-2 space-y-2">
                                        {sec.data.url ? (
                                            <div className="relative max-w-md w-full rounded-lg overflow-hidden group/img">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={sec.data.url} alt="Uploaded block" className="w-full h-auto object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                    <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id)}>เปลี่ยนภาพ</Button>
                                                    <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, url: '' }))}>ลบภาพ</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div onClick={() => handleImageSelect(sec.id)} className="w-full max-w-md h-40 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10 transition-colors">
                                                <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                                                <span className="text-sm font-medium text-muted-foreground">คลิกเพื่ออัปโหลดรูปภาพ</span>
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            placeholder="เพิ่มคำอธิบายใต้รูปภาพ (Caption)..."
                                            value={sec.data.caption || ''}
                                            onChange={(e) => updateBlockData(sec.id, p => ({ ...p, caption: e.target.value }))}
                                            className="text-center text-sm border-none bg-transparent focus:ring-0 outline-none text-muted-foreground w-full max-w-sm"
                                        />
                                    </div>
                                )}

                                {sec.type === 'layout-1' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-2">
                                        <div className="flex justify-center">
                                            {sec.data.col1?.url ? (
                                                <div className="relative w-full rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col1.url} alt="Col 1" className="w-full h-auto object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col1')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col1')} className="w-full h-48 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                                                    <span className="text-xs text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-h-[100px]">
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col1?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, html } }))}
                                                modules={inlineModules}
                                                placeholder="พิมพ์คำอธิบายประกอบรูปภาพ..."
                                                className="text-sm inline-quill-editor"
                                            />
                                        </div>
                                    </div>
                                )}

                                {sec.type === 'layout-2' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                                        {/* Col 1 */}
                                        <div className="space-y-3">
                                            {sec.data.col1?.url ? (
                                                <div className="relative w-full h-40 rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col1.url} alt="Col 1" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col1')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col1')} className="w-full h-40 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                                                    <span className="text-xs text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col1?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, html } }))}
                                                modules={inlineModules}
                                                placeholder="พิมพ์ข้อความหัวข้อที่ 1..."
                                                className="text-sm inline-quill-editor"
                                            />
                                        </div>
                                        {/* Col 2 */}
                                        <div className="space-y-3">
                                            {sec.data.col2?.url ? (
                                                <div className="relative w-full h-40 rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col2.url} alt="Col 2" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col2')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col2: { ...p.col2, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col2')} className="w-full h-40 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground mb-2" />
                                                    <span className="text-xs text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col2?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col2: { ...p.col2, html } }))}
                                                modules={inlineModules}
                                                placeholder="พิมพ์ข้อความหัวข้อที่ 2..."
                                                className="text-sm inline-quill-editor"
                                            />
                                        </div>
                                    </div>
                                )}

                                {sec.type === 'layout-3' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                                        {/* Col 1 */}
                                        <div className="space-y-3">
                                            {sec.data.col1?.url ? (
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col1.url} alt="Col 1" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col1')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col1')} className="w-full h-32 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-5 h-5 text-muted-foreground mb-1" />
                                                    <span className="text-[10px] text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col1?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col1: { ...p.col1, html } }))}
                                                modules={inlineModules}
                                                placeholder="ข้อความย่อยที่ 1..."
                                                className="text-xs inline-quill-editor"
                                            />
                                        </div>
                                        {/* Col 2 */}
                                        <div className="space-y-3">
                                            {sec.data.col2?.url ? (
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col2.url} alt="Col 2" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col2')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col2: { ...p.col2, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col2')} className="w-full h-32 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-5 h-5 text-muted-foreground mb-1" />
                                                    <span className="text-[10px] text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col2?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col2: { ...p.col2, html } }))}
                                                modules={inlineModules}
                                                placeholder="ข้อความย่อยที่ 2..."
                                                className="text-xs inline-quill-editor"
                                            />
                                        </div>
                                        {/* Col 3 */}
                                        <div className="space-y-3">
                                            {sec.data.col3?.url ? (
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden group/img">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={sec.data.col3.url} alt="Col 3" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                                        <Button type="button" variant="secondary" size="sm" onClick={() => handleImageSelect(sec.id, 'col3')}>เปลี่ยนภาพ</Button>
                                                        <Button type="button" variant="destructive" size="sm" onClick={() => updateBlockData(sec.id, p => ({ ...p, col3: { ...p.col3, url: '' } }))}>ลบ</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleImageSelect(sec.id, 'col3')} className="w-full h-32 border border-dashed border-border hover:border-primary/50 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted/10">
                                                    <ImageIcon className="w-5 h-5 text-muted-foreground mb-1" />
                                                    <span className="text-[10px] text-muted-foreground">คลิกเพื่อใส่รูป</span>
                                                </div>
                                            )}
                                            <ReactQuill
                                                forwardedRef={null}
                                                theme="bubble"
                                                value={sec.data.col3?.html || ''}
                                                onChange={(html: string) => updateBlockData(sec.id, p => ({ ...p, col3: { ...p.col3, html } }))}
                                                modules={inlineModules}
                                                placeholder="ข้อความย่อยที่ 3..."
                                                className="text-xs inline-quill-editor"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SETTINGS DIALOG */}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">ตั้งค่าประกาศ</DialogTitle>
                        <DialogDescription>จัดการหมวดหมู่และความเร่งด่วนของประกาศข่าวสารนี้</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">หมวดหมู่ประกาศ</Label>
                            <Select name="category" value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder="เลือกหมวดหมู่" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ประชาสัมพันธ์">ประชาสัมพันธ์</SelectItem>
                                    <SelectItem value="กิจกรรม">กิจกรรม</SelectItem>
                                    <SelectItem value="แจ้งเตือนระบบ">แจ้งเตือนระบบ</SelectItem>
                                    <SelectItem value="ระเบียบ/คำสั่ง">ระเบียบ/คำสั่ง</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-border">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-semibold">ประกาศด่วน</Label>
                                    <p className="text-xs text-muted-foreground">ไฮไลต์สีแดงและแสดงบนสุดของการค้นหา</p>
                                </div>
                                <Switch
                                    checked={isUrgent}
                                    onCheckedChange={setIsUrgent}
                                />
                                <input type="hidden" name="is_urgent" value={isUrgent ? 'on' : 'off'} />
                            </div>
                        </div>

                        {isEditMode && announcement?.publish_date && (
                            <div className="space-y-2 pt-4 border-t border-border">
                                <Label className="text-sm font-semibold">วันที่เผยแพร่</Label>
                                <p className="text-sm px-3 py-2 bg-muted rounded-md text-muted-foreground">
                                    {format(new Date(announcement.publish_date), 'dd MMMM yyyy HH:mm', { locale: th })}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" onClick={() => setIsSettingsOpen(false)} className="rounded-xl px-6">ตกลง</Button>
                    </div>
                </DialogContent>
            </Dialog>
            {/* EXIT CONFIRMATION DIALOG */}
            <Dialog open={isConfirmExitOpen} onOpenChange={setIsConfirmExitOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl p-6">
                    <DialogHeader className="space-y-3">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            ⚠️ ละทิ้งการเปลี่ยนแปลง?
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                            คุณมีข้อมูลการเปลี่ยนแปลงในประกาศนี้ที่ยังไม่ได้บันทึก ต้องการดำเนินการอย่างไรต่อไป?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 flex flex-col gap-2.5">
                        <Button 
                            type="button" 
                            onClick={handleSaveAsDraftAndExit} 
                            className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        >
                            บันทึกเป็นแบบร่างและออกจากหน้านี้
                        </Button>
                        <Button 
                            type="button" 
                            variant="destructive"
                            onClick={handleDiscardAndExit}
                            className="w-full rounded-xl font-semibold"
                        >
                            ละทิ้งการเปลี่ยนแปลงและออกทันที
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setIsConfirmExitOpen(false)}
                            className="w-full rounded-xl border border-border/80 hover:bg-muted font-semibold"
                        >
                            ยกเลิก (อยู่หน้านี้ต่อ)
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            {/* FLOATING BOTTOM DOCK */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md border border-border shadow-2xl px-6 py-2.5 rounded-full z-50 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="text-xs font-semibold text-muted-foreground border-r pr-4 uppercase tracking-wider hidden sm:block">แทรกบล็อก</div>

                {/* Layout Blocks */}
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('layout-1')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="ภาพเดี่ยว + คำบรรยาย"
                    >
                        <Layout className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="text-xs font-medium hidden md:inline">ภาพ + ข้อความ</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('layout-2')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="2 คอลัมน์คู่"
                    >
                        <Columns className="w-4 h-4 mr-1 text-orange-500" />
                        <span className="text-xs font-medium hidden md:inline">2 คอลัมน์</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('layout-3')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="3 คอลัมน์"
                    >
                        <LayoutGrid className="w-4 h-4 mr-1 text-emerald-500" />
                        <span className="text-xs font-medium hidden md:inline">3 คอลัมน์</span>
                    </Button>
                </div>

                <div className="h-4 w-px bg-border" />

                {/* Basic Elements */}
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('text')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="กล่องข้อความ"
                    >
                        <Type className="w-4 h-4 mr-1 text-purple-500" />
                        <span className="text-xs font-medium hidden md:inline">ข้อความ</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('image')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="รูปภาพเดี่ยว"
                    >
                        <ImageIcon className="w-4 h-4 mr-1 text-pink-500" />
                        <span className="text-xs font-medium hidden md:inline">รูปภาพ</span>
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addSection('divider')}
                        className="h-8 px-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        title="เส้นคั่น"
                    >
                        <Minus className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="text-xs font-medium hidden md:inline">เส้นคั่น</span>
                    </Button>
                </div>
            </div>
        </form>
    )
}
