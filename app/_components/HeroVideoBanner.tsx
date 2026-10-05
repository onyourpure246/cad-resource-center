'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Landing from "@/assets/img/landing_page_banner.png";

export default function HeroVideoBanner() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
        <>
            {/* Base Fallback Background Image (Loaded with Priority for instant LCP) */}
            <Image
                src={Landing}
                alt="Landing Banner"
                fill
                priority
                className="object-cover brightness-75 z-0"
                sizes="100vw"
            />

            {/* Optimized Background Video Overlay (Fade-in when ready) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover brightness-75 z-0 transition-opacity duration-1000 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <source src="/casdu_cdm/assets/video/landing_page_anibanner.mp4" type="video/mp4" />
            </video>
        </>
    );
}
