'use client'
import React from 'react'
import Link from 'next/link'
import { useUser, useClerk, SignInButton } from '@clerk/nextjs'
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
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut(() => {
      toast.success('ออกจากระบบสำเร็จ')
      window.location.href = '/'
    })
  }

  return (
    <DropDownMenu
      trigger={
        <Button variant="ghost" size="icon" className='rounded-full cursor-pointer border-1 hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground dark:border-border'>
          <User className="h-5 w-5" />
        </Button>
      }
    >
      <DropdownMenuLabel>
        {isSignedIn ? `สวัสดี, ${user.firstName || 'ผู้ใช้'}` : 'บัญชีผู้ใช้'}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      {/* Admin Menu Items */}
      {user?.publicMetadata?.role === 'admin' && (
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
          <SignInButton mode="modal">
            <div className='w-full cursor-pointer'>เข้าสู่ระบบ</div>
          </SignInButton>
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
