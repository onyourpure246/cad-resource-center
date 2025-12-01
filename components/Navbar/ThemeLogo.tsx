"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import LogoBlack from '@/assets/img/logo-black.png'
import LogoWhite from '@/assets/img/logo-white.png'

const ThemeLogo = () => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Render a placeholder or the default logo to avoid layout shift/hydration mismatch
        // Defaulting to LogoBlack as it was the original default
        return <Image src={LogoBlack} alt="logo" className='w-[246px]' priority />
    }

    // In light mode, the white parts of LogoBlack blend in.
    // We can try using LogoWhite with inversion, or just LogoBlack with a drop shadow.
    // Let's try to be smart:
    // If resolvedTheme is 'dark', use LogoBlack (as user said it works).
    // If resolvedTheme is 'light', we need a fix.

    // Strategy A: Use LogoBlack for Dark, and a modified version for Light.
    // Since we don't have a perfect "LogoForLightMode" asset yet (LogoWhite might be just white text),
    // let's try to use LogoBlack with a drop shadow filter for Light mode to make white parts pop.
    // OR, if LogoWhite is actually the inverted version, we could use that.

    // Given the file sizes (Black: 22KB, White: 2KB), LogoWhite is likely just a simple white icon/text, 
    // while LogoBlack is the full logo.

    // Let's try adding a drop shadow to LogoBlack in light mode first, as it's the safest bet without seeing the images.
    // Actually, the user said "logo of ours has a part that is white".
    // If I add a drop shadow, the white part will have a shadow and become visible against white background.

    return (
        <div className="relative w-[246px] h-auto">
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
