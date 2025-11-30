'use client'
'use client'
import React from 'react'
import type { DownloadListProps } from '@/types/documents'
import { Button } from '../ui/button'
import { Download, FileText, Calendar, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const DownloadList = ({ items }: DownloadListProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-3 py-4">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        className="group hover:shadow-md transition-all duration-300 hover:border-primary/50 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                {/* Left Section: Identity */}
                                <div className="flex items-center gap-4 p-4 w-full md:w-[40%] border-b md:border-b-0 md:border-r border-border/40 bg-muted/5">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-border/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <FileText className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                            <span className="bg-background border px-1.5 py-0.5 rounded text-xs uppercase tracking-wider font-medium">
                                                ไฟล์
                                            </span>
                                            <span className="truncate">{item.filename}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Description & Action */}
                                <div className="flex items-center justify-between gap-4 p-4 w-full md:w-[60%]">
                                    <div className="flex-grow min-w-0 pr-4">
                                        <p className="text-base text-muted-foreground line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/80">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{item.updated_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <Button asChild size="default" className="rounded-full px-6 shadow-sm hover:shadow hover:bg-primary/90">

                                            <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4 mr-1" />
                                                ดาวน์โหลด
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
                    <div className="bg-muted rounded-full p-3 mb-3">
                        <FileText className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-base font-medium text-foreground">ไม่พบไฟล์</h3>
                </div>
            )}
        </div>
    )
}

export default DownloadList