'use client'
import React from 'react'
import { DownloadItem } from '@/types/documents'
import { Button } from '../ui/button'
import { Download, FileText, Calendar, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DownloadCardProps {
    item: DownloadItem;
}

const DownloadCard = ({ item }: DownloadCardProps) => {
    return (
        <Card
            className="group border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-card overflow-hidden"
        >
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* Icon Section */}
                    <div className="flex items-center justify-center p-6 bg-primary/5 md:w-24 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col justify-center min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {item.name}
                            </h3>
                            <Badge variant="secondary" className="shrink-0 text-xs font-normal bg-muted text-muted-foreground">
                                {item.filename.split('.').pop()?.toUpperCase() || 'FILE'}
                            </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {item.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{item.updated_at}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>อัปเดตล่าสุด</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center justify-center p-4 md:p-6 bg-muted/30 md:bg-transparent md:border-l border-border/50">
                        <Button
                            asChild
                            className="w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90"
                        >
                            <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                <span>ดาวน์โหลด</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DownloadCard
