'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import ThemeLogo from './ThemeLogo';
import { usePathname } from 'next/navigation';
import NavAuth from './NavAuth';
import { ModeToggle } from './ModeToggle';

const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto px-6 py-6">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <div className="flex items-center gap-2">
                            <ThemeLogo />
                        </div>
                    </SheetHeader>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col space-y-3 font-kanit">
                            <h3 className="text-sm font-medium text-muted-foreground">เมนูหลัก</h3>
                            <Link
                                href="https://cad.go.th"
                                className="text-foreground hover:text-primary transition-colors text-base font-medium py-2 border-b border-border/50"
                                target='_blank'
                            >
                                กรมตรวจบัญชีสหกรณ์
                            </Link>
                            <Link
                                href="https://store-auditdocs.cad.go.th/CADWP"
                                className="text-foreground hover:text-primary transition-colors text-base font-medium py-2 border-b border-border/50"
                                target='_blank'
                            >
                                ระบบจัดการกระดาษทำการ
                            </Link>
                            <Link
                                href="/downloads"
                                onClick={() => setOpen(false)}
                                className={`text-foreground hover:text-primary transition-colors text-base font-medium py-2 border-b border-border/50 ${pathname.startsWith('/downloads') ? 'text-primary' : ''}`}
                            >
                                ดาวน์โหลด
                            </Link>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">การตั้งค่า & บัญชี</h3>
                            <div className="flex items-center justify-between">
                                <span>โหมดแสดงผล</span>
                                <ModeToggle />
                            </div>
                            <div className="pt-2">
                                <NavAuth />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;
