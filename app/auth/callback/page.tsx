'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function CallbackContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const [status, setStatus] = useState('กำลังยืนยันตัวตนกับระบบ...')

    useEffect(() => {
        if (!code) {
            setStatus('ไม่พบรหัสยืนยัน (Auth Code)')
            return
        }

        const login = async () => {
            try {
                const result = await signIn('credentials', {
                    code,
                    redirect: false,
                })

                if (result?.error) {
                    setStatus('การยืนยันตัวตนล้มเหลว กรุณาลองใหม่อีกครั้ง')
                } else {
                    setStatus('ยืนยันตัวตนสำเร็จ กำลังเข้าสู่ระบบ...')
                    router.push('/admin/documents')
                    router.refresh()
                }
            } catch (error) {
                console.error(error);
                setStatus('เกิดข้อผิดพลาดในระบบ')
            }
        }

        login()
    }, [code, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center p-8 bg-card rounded-lg shadow-lg border border-border">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                    {status}
                </h2>
                <p className="text-sm text-muted-foreground">กรุณารอสักครู่...</p>
            </div>
        </div>
    )
}

export default function CallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    )
}
