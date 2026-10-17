"use client";

import React from 'react';
import {motion, MotionConfig} from 'motion/react';
import {duration, ease} from "@/lib/motion";

/**
 * The app's fade-up entrance (lib/motion.ts), triggered on mount or when scrolled into view.
 * With reduced motion the translate is skipped and only the fade remains.
 */
function Reveal({children, className, delay = 0, inView = false, y = 8}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    /** Reveal when scrolled into view instead of on mount. */
    inView?: boolean;
    y?: number;
}) {
    const shown = {opacity: 1, y: 0, transition: {duration: duration.slow, ease: ease.out, delay}};
    const trigger = inView
        ? {whileInView: shown, viewport: {once: true, margin: "0px 0px -8% 0px"}}
        : {animate: shown};

    return (
        <MotionConfig reducedMotion="user">
            <motion.div className={className} initial={{opacity: 0, y}} {...trigger}>
                {children}
            </motion.div>
        </MotionConfig>
    );
}

export default Reveal;
