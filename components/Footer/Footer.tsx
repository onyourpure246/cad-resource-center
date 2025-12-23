
"use client";
import React from 'react';
import Image from 'next/image';
import { footerData } from '@/data/footerData';
import ThemeLogo from '@/components/Navbar/ThemeLogo';
import { StaticImageData } from 'next/image';

import { FooterItem } from '@/types/footer';

const Footer = () => {
    return (
        <footer className="bg-accent border-t border-sidebar-border text-sidebar-foreground pt-4 pb-2">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-4">
                    {/* Column 1: Logo & Branding */}
                    <div className="flex flex-col space-y-2">
                        <div className="w-[150px]">
                            <ThemeLogo />
                        </div>
                        <p className="text-muted-foreground text-sm">
                            กลุ่มพัฒนาระบบตรวจสอบบัญชีคอมพิวเตอร์ <br />
                            ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร <br />
                            กรมตรวจบัญชีสหกรณ์
                        </p>
                    </div>

                    {/* Dynamic Columns */}
                    {footerData.columns.map((col, index) => (
                        <div key={index} className={`flex flex-col space-y-2 ${(index === 0 || index === 1) ? 'lg:pl-8' : ''}`}>
                            <h3 className="text-base font-bold">{col.title}</h3>
                            <div className="space-y-1 text-muted-foreground">
                                {col.content.map((item, i) => {
                                    const footerItem = item as FooterItem;
                                    if (footerItem.type === 'text') {
                                        return <p key={i} className="text-sm">{footerItem.value}</p>;
                                    }
                                    if (footerItem.type === 'image') {
                                        return (
                                            <div key={i} className="mt-1">
                                                <Image
                                                    src={footerItem.src!}
                                                    alt={footerItem.alt || "Image"}
                                                    width={footerItem.width || 100}
                                                    height={footerItem.height || 100}
                                                    className="bg-white p-1 border rounded-lg w-24 h-24"
                                                />
                                            </div>
                                        )
                                    }
                                    if (footerItem.type === 'list') {
                                        return (
                                            <ul key={i} className="space-y-0.5">
                                                {footerItem.items?.map((li: string, liIndex: number) => (
                                                    <li key={liIndex} className="text-sm border-l-2 border-primary/50 pl-2">
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </footer>
    );
};

export default Footer;
