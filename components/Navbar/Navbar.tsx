import React from 'react'
import Link from 'next/link'
import ThemeLogo from './ThemeLogo'
import DropDownMenu from './DropDownMenu'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import NavAuth from './NavAuth'
import { ModeToggle } from './ModeToggle'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <nav>
      {/* Logo */}
      <div className='container mx-auto max-w-[1440px] relative h-auto px-2 py-1 flex flex-col md:flex-row md:justify-between md:items-center md:h-[80px]'>
        <div className='flex gap-12 items-center'>
          <Link href="/">
            <ThemeLogo />
          </Link>

        </div>

        <div className='flex flex-row gap-12 items-center '>
          {/* Menu Items */}
          <ul className='flex flex-col md:flex md:flex-row my-5 items-center'>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                <Link href="https://cad.go.th/">เว็บไซต์กรมตรวจบัญชีสหกรณ์</Link>
              </Button>
            </li>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                <Link href="/downloads">ดาวน์โหลด</Link>
              </Button>
            </li>
            <li className="my-2 md:mx-2">
              {/* Admin Actions */}
              <DropDownMenu
                trigger={
                  <Button variant="ghost" className="cursor-pointer text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                    สำหรับผู้ดูแลระบบ
                  </Button>
                }
              >
                <DropdownMenuLabel>สำหรับผู้ดูแลระบบ</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/admin/documents">จัดการรายการดาวน์โหลด</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/admin/usermanagement">จัดการข้อมูลผู้ใช้งาน</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/admin/dashboard">ข้อมูลการใช้งานระบบ</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/admin/announcement">จัดการข้อมูลประชาสัมพันธ์</Link></DropdownMenuItem>
              </DropDownMenu>
            </li>
          </ul>
        </div>

        <div>
          <ul className='flex flex-row gap-5 items-center'>
            <li className="my-2 md:mx-4">
              <ModeToggle />
            </li>
            <li className="my-2 md:mx-4">
              <NavAuth />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar