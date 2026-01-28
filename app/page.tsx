import React from "react";
import Image from "next/image";
import Landing from "@/assets/img/landing_page_banner.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnnounceSection from "@/components/HomePage/AnnounceSection";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="pb-16">
      <section className="relative w-full h-[210px] md:h-[210px] overflow-hidden">
        {/* Background Video */}
        {/* Base Background Image (Always visible as fallback) */}
        <Image
          src={Landing}
          alt="Landing Banner"
          fill
          priority
          className="object-cover brightness-75 z-0"
          sizes="100vw"
        />

        {/* Video Overlay (Visible when video loads) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="" // Not needed as we have the Image component behind it
          className="absolute inset-0 w-full h-full object-cover brightness-75 z-0 mix-blend-overlay opacity-0" // Hide by default, show via CSS or JS if needed. But for simple layer stack:
        // Actually, standard stack: Image bottom, Video top. If video has source, it covers image.
        // Let's just stack them. Video will be transparent if no source.
        >
          {/* Enable these to show video. The video will cover the image. */}
          {/* <source src="/assets/video/banner.webm" type="video/webm" /> */}
          {/* <source src="/assets/video/banner.mp4" type="video/mp4" /> */}
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 h-full px-6 lg:px-20 flex items-center justify-between">
          {/* Left Content */}
          <div className="max-w-2xl text-white space-y-2">
            <Badge variant="outline" className="text-white border-white/50 bg-white/10">
              กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์
            </Badge>
            <h1 className="text-4xl md:text-4xl font-bold leading-tight">
              ศูนย์บริการข้อมูลและทรัพยากร
            </h1>
            <p className="text-sm md:text-sm">
              รวมเอกสาร และเครื่องมือสำหรับตรวจสอบบัญชี
            </p>
            <div className="flex gap-4 ml-10">
              <Link href="/downloads"><Button variant="default" size="default" className="mt-4 cursor-pointer">
                ดาวน์โหลด
              </Button>
              </Link>
              <Button size="lg" variant="link" className="mt-4 cursor-pointer text-white">
                ติดต่อเรา
              </Button>
            </div>
          </div>
        </div>
      </section>
      <AnnounceSection />
    </div>
  );
};

export default HomePage;
