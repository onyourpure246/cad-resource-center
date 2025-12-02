"use client";

import { motion } from "framer-motion";

export const HeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-primary/5">
            <div className="absolute inset-0 bg-grid-black/[0.02] z-0" />

            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-accent/20 blur-[100px]"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[100px]"
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </div>
    );
};
