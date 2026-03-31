"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { SessionWatcher } from '@/components/Auth/SessionWatcher'


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionWatcher />
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