'use client'
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { HeroBackground } from './HeroBackground'

const HeroSection = () => {
    return (
        <div className="relative py-12 md:py-14 overflow-hidden">
            <HeroBackground />
            <div className="container font-kanit mx-auto max-w-[1920px] px-4 text-center relative z-10">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-sm leading-relaxed">
                    ศูนย์รวมข้อมูลและเอกสาร
                </h1>
                <p className="text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    ค้นหาและดาวน์โหลดเอกสาร คู่มือ และข้อมูลสำคัญต่างๆ ของกรมตรวจบัญชีสหกรณ์
                </p>

                <div className="max-w-xl mx-auto relative">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                            <Search className="z-15 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="ค้นหาเอกสาร..."
                                className="w-full pl-12 pr-4 h-14 text-lg bg-background/80 backdrop-blur-sm shadow-sm border-muted-foreground/20 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
