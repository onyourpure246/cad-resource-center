'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import DropDownMenu from './DropDownMenu'
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'

const NavAuth = () => {
  const { data: session, status } = useSession()
  const isSignedIn = !!session?.user
  const user = session?.user

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    toast.success('ออกจากระบบสำเร็จ')
  }

  if (status === 'loading') {
    return (
      <Button variant="ghost" size="icon" disabled className='rounded-full cursor-pointer border-1 hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground dark:border-border'>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  return (
    <DropDownMenu
      trigger={
        <Button variant="ghost" size="icon" className='rounded-full cursor-pointer border-1 hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground dark:border-border'>
          {user?.image ? (
            <img src={user.image} alt={user.name || "User"} className="h-5 w-5 rounded-full" />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      }
    >
      <DropdownMenuLabel>
        {isSignedIn ? `สวัสดี, ${user?.name || 'ผู้ใช้'}` : 'บัญชีผู้ใช้'}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      {/* Admin Menu Items */}
      {isSignedIn && user?.role === 'admin' && (
        <>
          <DropdownMenuLabel className='text-xs text-muted-foreground'>สำหรับผู้ดูแลระบบ</DropdownMenuLabel>
          <DropdownMenuItem><Link href="/admin/documents" className='w-full'>จัดการรายการดาวน์โหลด</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/admin/usermanagement" className='w-full'>จัดการข้อมูลผู้ใช้งาน</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/admin/dashboard" className='w-full'>ข้อมูลการใช้งานระบบ</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/admin/announcement" className='w-full'>จัดการข้อมูลประชาสัมพันธ์</Link></DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}

      {!isSignedIn ? (
        <DropdownMenuItem asChild>
          <Link href="/login" className='w-full cursor-pointer'>เข้าสู่ระบบ</Link>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer text-red-600 focus:text-red-600'>
          ออกจากระบบ
        </DropdownMenuItem>
      )}
    </DropDownMenu>
  )
}

export default NavAuth
