"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem

      >
        {children}

        <Toaster toastOptions={{
          style: {
            fontFamily: 'var(--font-sarabun)',
          }
        }} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers