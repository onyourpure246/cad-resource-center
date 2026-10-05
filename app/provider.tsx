"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import { SessionWatcher } from '@/components/Auth/SessionWatcher'


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider basePath="/casdu_cdm/api/auth">
      <SessionWatcher />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
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