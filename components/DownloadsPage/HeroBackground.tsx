"use client";

import { m, MotionValue, useTransform } from "framer-motion";

interface HeroBackgroundProps {
    mouseX?: MotionValue<number>;
    mouseY?: MotionValue<number>;
}

export const HeroBackground = ({ mouseX, mouseY }: HeroBackgroundProps) => {
    // Transform mouse coordinates to center the 300px blob
    // This uses CSS transforms (translate) instead of layout properties (top/left)
    // preventing Cumulative Layout Shift (CLS) issues.
    const x = useTransform(mouseX || new MotionValue(0), (val) => val - 150);
    const y = useTransform(mouseY || new MotionValue(0), (val) => val - 150);

    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
            <div className="absolute inset-0 bg-grid-black/[0.02] z-0" />

            {/* 1. Deep Emerald Base - The Foundation */}
            <m.div
                className="absolute top-[5%] left-[5%] w-[90%] h-[90%] rounded-full bg-emerald-500/40 dark:bg-emerald-600/30 blur-[120px] mix-blend-multiply dark:mix-blend-screen will-change-transform transform-gpu"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 2. Luminous Teal Beam - The Energy */}
            <m.div
                className="absolute top-[10%] right-[10%] w-[80%] h-[80%] rounded-full bg-teal-400/40 dark:bg-teal-500/30 blur-[130px] mix-blend-color-dodge dark:mix-blend-plus-lighter will-change-transform transform-gpu"
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 100, -50, 0],
                    scale: [0.9, 1.1, 0.95, 0.9],
                    opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 3. Bright Cyan Highlight - The Spark */}
            <m.div
                className="absolute bottom-[0%] left-[20%] w-[70%] h-[70%] rounded-full bg-cyan-300/40 dark:bg-cyan-400/30 blur-[110px] mix-blend-plus-lighter will-change-transform transform-gpu"
                animate={{
                    x: [0, 80, -80, 0],
                    y: [0, -80, 50, 0],
                    scale: [1, 1.2, 0.9, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />




            {/* Interactive Mouse Follower Blob - AI "Spark" style */}
            {mouseX && mouseY && (
                <m.div
                    className="absolute w-[300px] h-[300px] blur-[90px] rounded-full pointer-events-none mix-blend-plus-lighter opacity-80 will-change-transform transform-gpu"
                    style={{
                        x,
                        y,
                        left: 0,
                        top: 0
                    }}
                    animate={{
                        backgroundColor: [
                            "rgba(45, 212, 191, 0.4)", // teal-400
                            "rgba(34, 211, 238, 0.4)", // cyan-400
                            "rgba(255, 255, 255, 0.3)", // white
                            "rgba(52, 211, 153, 0.4)", // emerald-400
                            "rgba(45, 212, 191, 0.4)", // teal-400
                        ],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            )}


        </div>
    );
};
