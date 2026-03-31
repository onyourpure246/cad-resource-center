'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { Menu, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import ThemeLogo from './ThemeLogo';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import { sidebarItems } from '@/lib/constants';

const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
        setOpen(false);
    };

    return (
        <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className=" gap-1 w-[300px] sm:w-[350px] overflow-y-auto p-0">
                    <SheetHeader className="bg-primary dark:bg-sidebar text-primary-foreground dark:text-foreground px-6 py-2">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <div className="flex items-center gap-2">
                            <ThemeLogo />
                        </div>
                    </SheetHeader>

                    <div className="flex flex-col gap-6 px-4 py-2">
                        {session?.user?.role === 'admin' && (
                            <div className="flex flex-col space-y-3 font-kanit">
                                <h3 className="text-sm font-medium text-muted-foreground">ผู้ดูแลระบบ</h3>
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center gap-2 text-base font-medium py-2 border-b border-border/50 transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

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
                                <span className="text-base font-medium">โหมดแสดงผล</span>
                                <ModeToggle />
                            </div>

                            <div className="pt-2 border-t border-border/50">
                                {session?.user ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2 w-full text-base font-medium py-2 text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        ออกจากระบบ
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2 w-full text-base font-medium py-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        เข้าสู่ระบบ
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;
