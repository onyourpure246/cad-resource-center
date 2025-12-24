'use client'
import React, { useState } from 'react'
import { useMotionValue, useSpring, LazyMotion, domAnimation } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { HeroBackground } from './HeroBackground'
import TagCloud from './TagCloud'
import { POPULAR_TAGS } from '@/data/searchTags'
import { useRouter } from 'next/navigation'

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
            router.push(`/downloads/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="relative py-12 md:py-14 overflow-hidden" onMouseMove={handleMouseMove}>
                <HeroBackground mouseX={springX} mouseY={springY} />
                <div className="container font-kanit mx-auto max-w-[1920px] px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 dark:from-teal-300 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent drop-shadow-lg leading-relaxed dark:drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] animate-text-shimmer">
                        ศูนย์รวมข้อมูลและเอกสาร
                    </h1>
                    <p className="text-lg md:text-lg text-foreground/80 font-medium max-w-2xl mx-auto mb-6 drop-shadow-md dark:text-muted-foreground dark:drop-shadow-none">
                        ค้นหาและดาวน์โหลดเอกสาร คู่มือ และข้อมูลสำคัญต่างๆ ของกรมตรวจบัญชีสหกรณ์
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <form onSubmit={handleSearch} className="relative group/search z-50 max-w-2xl mx-auto">
                            {/* Organic Aurora Glow (Apple Intelligence Vibe) - Theme Colors */}
                            <div className="absolute -inset-[3px] rounded-full bg-transparent overflow-hidden blur-md opacity-60 transition duration-500 group-hover/search:opacity-100 group-hover/search:blur-lg">
                                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-teal-400 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
                                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[200%] bg-emerald-500 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                                <div className="absolute -bottom-32 left-[20%] w-[80%] h-[200%] bg-lime-400 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                            </div>

                            {/* Glass Container */}
                            <div className="relative bg-white/10 dark:bg-transparent backdrop-blur-3xl rounded-full border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 group-hover/search:bg-white/15 dark:group-hover/search:bg-white/5">
                                {/* Subtle inner reflection - Hidden in dark mode to avoid background artifacts */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20 dark:opacity-0 pointer-events-none"></div>

                                <div className="flex items-center px-6 py-4 relative z-10">
                                    <Search className="w-6 h-6 text-muted-foreground mr-2" />
                                    <Input
                                        type="text"
                                        placeholder="ค้นหาเอกสาร..."
                                        className="flex-1 h-full py-1 text-xl font-medium bg-transparent dark:bg-transparent border-none shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70 text-foreground selection:bg-primary/20 leading-normal"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <TagCloud tags={POPULAR_TAGS} />
                </div>
            </div>
        </LazyMotion>
    )
}

export default HeroSection
