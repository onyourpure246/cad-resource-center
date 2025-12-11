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
import AddIcon from '@mui/icons-material/Add';

import { auth, currentUser } from '@clerk/nextjs/server'

const Navbar = async () => {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <nav className='bg-sidebar'>
      {/* Logo */}
      <div className='container mx-auto max-w-[1360px] relative h-auto px-2 py-1 flex flex-col md:flex-row md:justify-between md:items-center md:h-[80px]'>
        <div className='flex gap-12 items-center'>
          <Link href="/">
            <ThemeLogo />
          </Link>

        </div>

        <div className='flex flex-row gap-12 items-center font-kanit'>
          {/* Menu Items */}
          <ul className='flex flex-col md:flex md:flex-row my-5 items-center'>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                <Link href="https://store-auditdocs.cad.go.th/CADWP">ระบบจัดการกระดาษทำการ</Link>
              </Button>
            </li>
            <li className="my-2 md:mx-2">
              <Button variant="ghost" asChild className="text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                <Link href="/downloads">ดาวน์โหลด</Link>
              </Button>
            </li>
            {isAdmin && (
              <li className="my-2 md:mx-2">
                {/* Admin Actions */}
                <DropDownMenu
                  trigger={
                    <Button variant="ghost" className="cursor-pointer text-base font-normal hover:bg-transparent hover:text-primary dark:hover:bg-transparent dark:hover:text-white">
                      สำหรับผู้ดูแลระบบ
                    </Button>
                  }
                >
                  <DropdownMenuLabel className='font-kanit'>สำหรับผู้ดูแลระบบ</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href="/admin/documents" className='font-kanit'>จัดการรายการดาวน์โหลด</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/admin/usermanagement" className='font-kanit'>จัดการข้อมูลผู้ใช้งาน</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/admin/dashboard" className='font-kanit'>ข้อมูลการใช้งานระบบ</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link href="/admin/announcement" className='font-kanit'>จัดการข้อมูลประชาสัมพันธ์</Link></DropdownMenuItem>
                </DropDownMenu>
              </li>
            )}
          </ul>
        </div>

        <div>
          <ul className='flex flex-row gap-5 items-center'>
            <li className="my-2 md:mx-4 ">
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