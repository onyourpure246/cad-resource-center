'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import AuthCallbackCard from '@/components/Auth/AuthCallbackCard'

function CallbackContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const [status, setStatus] = useState('กำลังยืนยันตัวตนกับระบบ...')
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (!code) {
            setStatus('ไม่พบรหัสยืนยัน (Auth Code)')
            setIsError(true)
            return
        }

        const login = async () => {
            try {
                const result = await signIn('credentials', {
                    code,
                    redirect: false,
                })

                if (result?.error) {
                    setStatus('คุณไม่มีสิทธิ์เข้าใช้งานระบบ หรือข้อมูลไม่ถูกต้อง')
                    setIsError(true)
                } else {
                    setStatus('ยืนยันตัวตนสำเร็จ กำลังเข้าสู่ระบบ...')
                    setIsSuccess(true)

                    // Delay for 2 seconds to let user see the success message
                    setTimeout(() => {
                        router.push('/admin/documents')
                        router.refresh()
                    }, 2000)
                }
            } catch (error) {
                console.error(error);
                setStatus('เกิดข้อผิดพลาดในระบบ')
                setIsError(true)
            }
        }

        login()
    }, [code, router])

    return (
        <div className="flex min-h-screen items-start justify-center bg-background p-4 pt-32">
            <AuthCallbackCard
                status={status}
                isError={isError}
                isSuccess={isSuccess}
            />
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
