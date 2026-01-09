'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, XCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface AuthCallbackCardProps {
    status: string
    isError: boolean
    isSuccess?: boolean
    onBack?: () => void
}

export default function AuthCallbackCard({ status, isError, isSuccess, onBack }: AuthCallbackCardProps) {
    const router = useRouter()

    const handleBack = () => {
        if (onBack) {
            onBack()
        } else {
            router.push('/')
        }
    }

    return (
        <motion.div
            layout
            className="flex flex-col gap-6 rounded-xl border bg-card text-card-foreground shadow-lg py-6 max-w-md w-full overflow-hidden relative"
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
        >
            {isError ? (
                <>
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <CardTitle className="text-xl">
                            การยืนยันตัวตนล้มเหลว
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            {status}
                            <span className="text-xs text-muted-foreground/80 mt-1 block">
                                หากคุณเป็นเจ้าหน้าที่ กรุณาติดต่อผู้ดูแลระบบ
                            </span>
                        </p>
                        <Button
                            onClick={handleBack}
                            className="w-full"
                        >
                            กลับสู่หน้าหลัก
                        </Button>
                    </CardContent>
                </>
            ) : isSuccess ? (
                <>
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                            >
                                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </motion.div>
                        </div>
                        <CardTitle className="text-xl">
                            {status}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">กำลังนำท่านเข้าสู่ระบบ...</p>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                            {status}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">กรุณารอสักครู่...</p>
                    </CardContent>
                </>
            )}
        </motion.div>
    )
}
