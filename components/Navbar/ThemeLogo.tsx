"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import LogoBlack from '@/assets/img/logo-black.png'

const ThemeLogo = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Render a placeholder or the default logo to avoid layout shift/hydration mismatch
        // Defaulting to LogoBlack as it was the original default
        return <Image src={LogoBlack} alt="logo" className='w-[236px]' priority />
    }

    return (
        <div className="relative w-[236px] h-auto">
            <Image
                src={LogoBlack}
                alt="logo"
                className={`w-full h-auto transition-all duration-300 ${resolvedTheme === 'light' ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]' : ''}`}
                priority
            />
        </div>
    )
}

export default ThemeLogo
