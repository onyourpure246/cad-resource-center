import React from 'react'
import Link from 'next/link'
import ThemeLogo from './ThemeLogo'
import NavAuth from './NavAuth'
import { ModeToggle } from './ModeToggle'
import { Button } from '@/components/ui/button'

const Navbar = async () => {


  return (
    <nav className='bg-primary dark:bg-sidebar text-primary-foreground dark:text-foreground shadow-md transition-colors duration-300'>
      {/* Logo */}
      <div className='container mx-auto max-w-[1360px] relative h-auto px-2 py-1 flex flex-col md:flex-row md:justify-between md:items-center md:h-[80px]'>
        <div className='flex gap-12 items-center'>
          <Link href="/">
            <ThemeLogo />
          </Link>

        </div>

        <div className='flex flex-row gap-12 items-center font-kanit'>
          {/* Menu Items */}
          <ul className='flex flex-col gap-4 md:flex md:flex-row my-5 items-center'>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary">
                <Link href="https://cad.go.th">กรมตรวจบัญชีสหกรณ์</Link>
              </Button>
            </li>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary">
                <Link href="https://store-auditdocs.cad.go.th/CADWP">ระบบจัดการกระดาษทำการ</Link>
              </Button>
            </li>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="font-bold text-base transition-colors duration-300 hover:bg-transparent text-primary-foreground/75 hover:text-primary-foreground dark:text-foreground/70 dark:hover:bg-transparent dark:hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary-foreground dark:after:bg-primary">
                <Link href="/downloads">ดาวน์โหลด</Link>
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <ul className='flex flex-row gap-5 items-center'>
            <li className="my-2 md:mx-4 ">
              <ModeToggle />
            </li>
            <li className="my-2 md:mx-4 cursor-pointer">
              <NavAuth />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar