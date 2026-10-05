'use client'
import React, { useState } from 'react'
import { useMotionValue, useSpring, LazyMotion, domAnimation } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { HeroBackground } from './HeroBackground'
import TagCloud from './TagCloud'
import { useRouter } from 'next/navigation'
import { trackSearch } from '@/actions/search-actions'

const HeroSection = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    // Mouse tracking for hero section only
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Add spring for smoothness
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Track search term (fire and forget)
            trackSearch(query.trim());
            router.push(`/downloads/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            {/* Gemini-style Aurora Background with smooth fade at the bottom */}
            <div
                className="relative py-6 md:py-10 overflow-hidden"
                onMouseMove={handleMouseMove}
                style={{
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
            >
                <HeroBackground mouseX={springX} mouseY={springY} />
                <div className="container font-kanit mx-auto max-w-[1920px] px-4 text-center relative z-10">
                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 drop-shadow-sm">
                        ค้นหาเอกสารคู่มือ หรือชุดคำสั่ง งานตรวจสอบบัญชี
                    </h1>

                    <div className="max-w-xl mx-auto relative mb-4">
                        <form onSubmit={handleSearch} className="relative z-50">
                            {/* Solid Search Container */}
                            <div className="relative bg-card rounded-full border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
                                <div className="flex items-center px-4 py-2 relative z-10">
                                    <Search className="w-5 h-5 text-muted-foreground mr-3" />
                                    <Input
                                        type="text"
                                        placeholder="พิมพ์คำค้นหา..."
                                        className="flex-1 h-10 py-1 text-base bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70 text-foreground selection:bg-primary/20 leading-normal"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium transition-colors ml-2"
                                    >
                                        ค้นหา
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <TagCloud />
                </div>
            </div>
        </LazyMotion>
    )
}

export default HeroSection
