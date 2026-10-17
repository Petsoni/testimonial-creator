"use client";

import React from 'react';
import {motion, MotionConfig} from 'motion/react';

/**
 * The app's fade-up entrance (lib/variants.ts) without the blur: opacity and translate only.
 * With reduced motion the translate is skipped and only the fade remains.
 */
function Reveal({children, className, delay = 0, inView = false, y = 12}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    /** Reveal when scrolled into view instead of on mount. */
    inView?: boolean;
    y?: number;
}) {
    const shown = {opacity: 1, y: 0, transition: {duration: 0.3, ease: [0.23, 1, 0.32, 1] as const, delay}};
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
