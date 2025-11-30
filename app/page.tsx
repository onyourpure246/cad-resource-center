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
const HomePage = () => {
  return (
    <>
      <section className="relative w-full h-[300px] md:h-[300px] overflow-hidden">
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
          <div className="max-w-2xl text-white space-y-5">
            <Badge variant="outline" className="text-white border-white/50 bg-white/10">
              กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Resource Center
            </h1>
            <p className="text-sm md:text-base">
              ศูนย์รวมข้อมูล เอกสาร และเครื่องมือสำหรับกลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์
            </p>
            <Button size="lg" className="mt-4 cursor-pointer">
              ติดต่อเรา
            </Button>
          </div>
        </div>
      </section>
      {/* Announcement Section */}
      <AnnounceSection />
    </>
  );
};

export default HomePage;
