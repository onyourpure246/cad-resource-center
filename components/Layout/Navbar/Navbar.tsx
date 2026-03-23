'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeLogo from './ThemeLogo'
import NavAuth from './NavAuth'
import { Button } from '@/components/ui/button'

import MobileNav from './MobileNav'

const Navbar = () => {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/auth/callback') return null

  return (
    <nav className='sticky top-0 z-50 bg-primary dark:bg-sidebar text-primary-foreground dark:text-foreground shadow-md transition-colors duration-300'>
      {/* Logo */}
      <div className='container mx-auto px-4 md:max-w-[1360px] relative min-h-[50px] py-1 flex justify-between items-center'>

        {/* Logo Section */}
        <div className='flex gap-12 items-center'>
          <Link href="/">
            <ThemeLogo />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden lg:flex flex-row gap-12 items-center font-kanit'>
          <ul className='flex flex-row my-2 items-center'>
            <li className="mx-2">
              <Button variant="ghost" asChild className="font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary">
                <Link href="https://cad.go.th" target='_blank'>กรมตรวจบัญชีสหกรณ์</Link>
              </Button>
            </li>
            <li className="mx-2">
              <Button variant="ghost" asChild className="font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary">
                <Link href="https://store-auditdocs.cad.go.th/CADWP" target='_blank'>ระบบจัดการกระดาษทำการ</Link>
              </Button>
            </li>
            <li className="mx-2">
              <Button variant="ghost" asChild className={`font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary ${pathname.startsWith('/downloads') ? 'text-primary-foreground dark:text-primary after:scale-x-100' : ''}`}>
                <Link href="/downloads">ดาวน์โหลด</Link>
              </Button>
            </li>
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className='hidden lg:block'>
          <ul className='flex flex-row gap-5 items-center'>
            <li className="mx-4 cursor-pointer">
              <NavAuth />
            </li>
          </ul>
        </div>

        {/* Mobile Menu Trigger */}
        <MobileNav />

      </div>
    </nav>
  )
}

export default Navbar