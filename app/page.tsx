import React from "react";
import Image from "next/image";
import Landing from "@/assets/img/landing-banner.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnnounceSection from "@/components/HomePage/AnnounceSection";
import Link from "next/link";
const HomePage = () => {
  return (
    <>
      <section className="relative w-full h-[210px] md:h-[210px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={Landing}
          alt="Landing Banner"
          fill
          className="object-cover brightness-75"
          priority
        />

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
              Resource Center
            </h1>
            <p className="text-sm md:text-sm">
              ศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์
            </p>
            <div className="flex gap-4 ml-10">
              <Link href="/downloads"><Button size="lg" className="mt-4 cursor-pointer">
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
      {/* Announcement Section */}
      <AnnounceSection />
    </>
  );
};

export default HomePage;
