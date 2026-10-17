import React, {useLayoutEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import TestimonialCard from "@/app/builder/components/TestimonialCard";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {backdropGradient} from "@/lib/backdrops";
import {duration, ease} from "@/lib/motion";
import {ARTBOARD_SIZE} from "@/lib/screenshot-service";
import {cn} from "@/lib/utils";

/**
 * The square the PNG is cut from, scaled to fit its box. What you see here is
 * what gets exported: same background, same card, same proportions.
 */
function Artboard({className}: { className?: string }) {
    const boxRef = useRef<HTMLElement>(null);
    const [scale, setScale] = useState<number | null>(null);
    const {displayType, backdrop} = useTestimonialContent();

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
                    initial={{opacity: 0, scale: 0.97}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: duration.slow, ease: ease.out}}
                    className="relative shrink-0 overflow-hidden rounded-md shadow-[0_1px_2px_rgb(0_0_0/0.06),0_12px_32px_-12px_rgb(0_0_0/0.25)] ring-1 ring-black/5"
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
                        <div id="testimonialCardDiv" className="relative">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.div
                                    key={displayType}
                                    initial={{opacity: 0, scale: 0.96}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.98}}
                                    transition={{duration: duration.slow, ease: ease.out}}
                                >
                                    <TestimonialCard/>
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
