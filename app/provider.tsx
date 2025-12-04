"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
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

    </>
  )
}

export default Providers