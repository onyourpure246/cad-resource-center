import React from "react";
import HeroVideoBanner from "./_components/HeroVideoBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomePreviewCombinedSection from "./_components/HomePreviewCombinedSection";

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <div className="pb-16">
      <section className="relative w-full h-[190px] md:h-[190px] overflow-hidden">
        {/* Background Video & Fallback Image */}
        <HeroVideoBanner />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 h-full px-6 lg:px-20 flex items-center justify-between">
          {/* Left Content */}
          <div className="max-w-2xl text-white space-y-1">
            <Badge variant="outline" className="text-white border-white/50 bg-white/10">
              กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์
            </Badge>
            <h1 className="text-2xl md:text-2xl font-bold leading-tight">
              ศูนย์บริการข้อมูลและทรัพยากร
            </h1>
            <p className="text-sm md:text-sm">
              รวมเอกสาร และเครื่องมือสำหรับตรวจสอบบัญชีคอมพิวเตอร์
            </p>
            <div className="flex gap-4 ml-10">
              <Link href="/downloads"><Button variant="default" size="default" className="mt-1 cursor-pointer">
                ดาวน์โหลด
              </Button>
              </Link>
              <Button asChild size="lg" variant="link" className="mt-1 cursor-pointer text-white">
                <Link href="https://lin.ee/OxR745f" target="_blank">ติดต่อเรา</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Combined Home Section (50% ข่าวประกาศ / 50% ชุดคำสั่งอัปเดตล่าสุด 3 หมวด) */}
      <HomePreviewCombinedSection />
    </div>
  );
};


export default HomePage;
