import React, {useLayoutEffect, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig} from "motion/react";
import TestimonialCard from "@/app/builder/components/TestimonialCard";
import {TestimonialContentContext, useTestimonialContent} from "@/context/TestimonialContentContext";
import {backdropGradient} from "@/lib/backdrops";
import {duration, ease} from "@/lib/motion";
import {ARTBOARD_SIZE} from "@/lib/screenshot-service";
import {cn} from "@/lib/utils";

// Start over tosses the old card off the board while a fresh one settles in underneath.
const deal = {
    initial: {opacity: 0, y: 12, scale: 0.97},
    animate: {opacity: 1, y: 0, scale: 1, transition: {duration: duration.slow, ease: ease.out, delay: 0.1}},
    discard: {
        opacity: 0, x: -160, y: 48, rotate: -10, scale: 0.94, zIndex: 1,
        transition: {duration: duration.slow, ease: ease.in, zIndex: {duration: 0}},
    },
};

/**
 * The square the PNG is cut from, scaled to fit its box. What you see here is
 * what gets exported: same background, same card, same proportions.
 */
function Artboard({className}: { className?: string }) {
    const boxRef = useRef<HTMLElement>(null);
    const [scale, setScale] = useState<number | null>(null);
    const content = useTestimonialContent();
    const {backdrop, cardKey} = content;

    useLayoutEffect(() => {
        const box = boxRef.current;
        if (!box) return;
        const measure = () => {
            const {width, height} = box.getBoundingClientRect();
            const fit = Math.min(width, height || width) / ARTBOARD_SIZE;
            setScale(Math.max(0.05, Math.min(1, fit)));
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(box);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={boxRef}
            aria-label="Card preview"
            className={cn("relative flex min-h-0 min-w-0 items-center justify-center", className)}
        >
            {scale !== null && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: duration.slow, ease: ease.out}}
                    // The artboard is a frame on the drafting grid: square corners, one ink line, no lift.
                    className="relative shrink-0 overflow-hidden ring-1 ring-rule"
                    style={{width: ARTBOARD_SIZE * scale, height: ARTBOARD_SIZE * scale}}
                >
                    <div
                        className="absolute top-0 left-0 flex origin-top-left items-center justify-center"
                        style={{
                            width: ARTBOARD_SIZE,
                            height: ARTBOARD_SIZE,
                            transform: `scale(${scale})`,
                            background: backdropGradient(backdrop),
                        }}
                    >
                        {/* Both cards share one grid cell during the swap, so neither shifts. */}
                        <div id="testimonialCardDiv" className="relative grid place-items-center">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={cardKey}
                                    variants={deal}
                                    initial="initial"
                                    animate="animate"
                                    exit="discard"
                                    className="col-start-1 row-start-1"
                                >
                                    {/* The leaving card keeps the content it had instead of emptying mid-toss. */}
                                    <TestimonialContentContext.Provider value={content}>
                                        {/* Layout animations measure on screen; undo the preview scale so moves land where they started. */}
                                        <MotionConfig transformPagePoint={({x, y}) => ({x: x / scale, y: y / scale})}>
                                            <TestimonialCard/>
                                        </MotionConfig>
                                    </TestimonialContentContext.Provider>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}

export default Artboard;
