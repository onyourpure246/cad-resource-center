import React from 'react'
import Link from 'next/link'
import ThemeLogo from './ThemeLogo'
import DropDownMenu from './DropDownMenu' // This will be our reusable component
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import NavAuth from './NavAuth'
import { ModeToggle } from './ModeToggle'

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
          <ul className='flex flex-col md:flex md:flex-row my-5'>
            <li className="my-2 md:mx-4"><Link href="https://cad.go.th/" className="transition-colors hover:text-primary">เว็บไซต์กรมตรวจบัญชีสหกรณ์</Link></li>
            <li className="my-2 md:mx-4"><Link href="/downloads" className="transition-colors hover:text-primar">ดาวน์โหลด</Link></li>
            <li className="my-2 md:mx-4">
              {/* Admin Actions */}
              <DropDownMenu
                trigger={
                  <span className='flex cursor-pointer transition-colors hover:text-primary'>สำหรับผู้ดูแลระบบ</span>
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