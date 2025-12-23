'use client'
import React from 'react'
import type { DownloadListProps } from '@/types/components'
import { FileText } from 'lucide-react'
import DownloadCard from './DownloadCard'

const DownloadList = ({ items }: DownloadListProps) => {
    return (
        <div className="w-full space-y-4">
            {items.map((item) => (
                <DownloadCard key={item.id} item={item} />
            ))}

            {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-muted">
                    <div className="bg-muted rounded-full p-4 mb-4">
                        <FileText className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-1">ไม่พบเอกสาร</h3>
                    <p className="text-muted-foreground">ยังไม่มีเอกสารในหมวดหมู่นี้</p>
                </div>
            )}
        </div>
    )
}

export default DownloadList